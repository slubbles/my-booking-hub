import { getOptionalEnv } from "./env";

interface CalendarBookingInput {
  name: string;
  email: string;
  notes?: string;
  startDateTime: Date;
  endDateTime: Date;
  notificationEmail: string;
}

interface CalendarBookingResult {
  configured: boolean;
  conflict: boolean;
  meetLink: string | null;
  googleEventId: string | null;
}

const toBase64Url = (value: string | Uint8Array) => {
  const buffer = typeof value === "string" ? Buffer.from(value, "utf8") : Buffer.from(value);

  return buffer
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

const getGoogleAccessToken = async (serviceAccount: Record<string, string>) => {
  const issuedAt = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/calendar",
    aud: "https://oauth2.googleapis.com/token",
    iat: issuedAt,
    exp: issuedAt + 3600,
  };

  const signInput = `${toBase64Url(JSON.stringify(header))}.${toBase64Url(JSON.stringify(payload))}`;
  const privateKey = serviceAccount.private_key
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\n/g, "");

  const key = await crypto.subtle.importKey(
    "pkcs8",
    Buffer.from(privateKey, "base64"),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(signInput));
  const assertion = `${signInput}.${toBase64Url(new Uint8Array(signature))}`;

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok || !tokenData.access_token) {
    throw new Error("Failed to obtain Google access token.");
  }

  return tokenData.access_token as string;
};

export const createCalendarBooking = async ({
  name,
  email,
  notes,
  startDateTime,
  endDateTime,
  notificationEmail,
}: CalendarBookingInput): Promise<CalendarBookingResult> => {
  const serviceAccountKey = getOptionalEnv("GOOGLE_SERVICE_ACCOUNT_KEY");
  const calendarId = getOptionalEnv("GOOGLE_CALENDAR_ID");

  if (!serviceAccountKey || !calendarId) {
    return {
      configured: false,
      conflict: false,
      meetLink: null,
      googleEventId: null,
    };
  }

  const accessToken = await getGoogleAccessToken(JSON.parse(serviceAccountKey));

  const freeBusyResponse = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      timeMin: startDateTime.toISOString(),
      timeMax: endDateTime.toISOString(),
      items: [{ id: calendarId }],
    }),
  });

  const freeBusyData = await freeBusyResponse.json();
  const busySlots = freeBusyData.calendars?.[calendarId]?.busy || [];

  if (busySlots.length > 0) {
    return {
      configured: true,
      conflict: true,
      meetLink: null,
      googleEventId: null,
    };
  }

  const eventResponse = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?conferenceDataVersion=1`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary: `Project Discussion - ${name}`,
        description: `Booked via portfolio website\n\nName: ${name}\nEmail: ${email}\n\nNotes: ${notes || "None"}`,
        start: { dateTime: startDateTime.toISOString(), timeZone: "Asia/Manila" },
        end: { dateTime: endDateTime.toISOString(), timeZone: "Asia/Manila" },
        attendees: [{ email }, { email: notificationEmail }],
        conferenceData: {
          createRequest: {
            requestId: crypto.randomUUID(),
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
      }),
    },
  );

  const eventData = await eventResponse.json();

  if (!eventResponse.ok) {
    throw new Error(eventData.error?.message || "Failed to create Google Calendar event.");
  }

  const meetLink =
    eventData.conferenceData?.entryPoints?.find((entryPoint: { entryPointType?: string; uri?: string }) => entryPoint.entryPointType === "video")?.uri ||
    eventData.hangoutLink ||
    null;

  return {
    configured: true,
    conflict: false,
    meetLink,
    googleEventId: eventData.id || null,
  };
};