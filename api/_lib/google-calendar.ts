import { getOptionalEnv } from "./env.js";

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

interface GoogleTokenResponse {
  access_token?: string;
  error?: string;
  error_description?: string;
}

interface GoogleFreeBusyResponse {
  calendars?: Record<string, { busy?: Array<{ start?: string; end?: string }> }>;
}

interface GoogleCalendarEventResponse {
  id?: string;
  htmlLink?: string;
  hangoutLink?: string;
  conferenceData?: {
    createRequest?: {
      status?: {
        statusCode?: string;
      };
    };
    entryPoints?: Array<{ entryPointType?: string; uri?: string }>;
  };
  error?: {
    message?: string;
  };
}

const extractMeetLink = (eventData: GoogleCalendarEventResponse) => {
  return (
    eventData.conferenceData?.entryPoints?.find((entryPoint) => entryPoint.entryPointType === "video")?.uri ||
    eventData.hangoutLink ||
    null
  );
};

const fetchCalendarEvent = async (calendarId: string, eventId: string, accessToken: string) => {
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(eventId)}?conferenceDataVersion=1`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as GoogleCalendarEventResponse;
};

const getGoogleOAuthAccessToken = async () => {
  const clientId = getOptionalEnv("GOOGLE_OAUTH_CLIENT_ID");
  const clientSecret = getOptionalEnv("GOOGLE_OAUTH_CLIENT_SECRET");
  const refreshToken = getOptionalEnv("GOOGLE_OAUTH_REFRESH_TOKEN");

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  const tokenData = (await tokenResponse.json()) as GoogleTokenResponse;

  if (!tokenResponse.ok || !tokenData.access_token) {
    throw new Error(tokenData.error_description || tokenData.error || "Failed to obtain Google OAuth access token.");
  }

  return tokenData.access_token;
};

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

  const tokenData = (await tokenResponse.json()) as GoogleTokenResponse;

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
  const oauthAccessToken = await getGoogleOAuthAccessToken();
  const serviceAccountKey = getOptionalEnv("GOOGLE_SERVICE_ACCOUNT_KEY");
  const calendarId = getOptionalEnv("GOOGLE_CALENDAR_ID");

  if (!calendarId || (!oauthAccessToken && !serviceAccountKey)) {
    return {
      configured: false,
      conflict: false,
      meetLink: null,
      googleEventId: null,
    };
  }

  const accessToken = oauthAccessToken || (await getGoogleAccessToken(JSON.parse(serviceAccountKey)));
  const usesOAuth = Boolean(oauthAccessToken);

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

  const freeBusyData = (await freeBusyResponse.json()) as GoogleFreeBusyResponse;
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
        ...(usesOAuth
          ? {
              attendees: [{ email }],
            }
          : {}),
        conferenceData: {
          createRequest: {
            requestId: crypto.randomUUID(),
            ...(usesOAuth
              ? {
                  conferenceSolutionKey: { type: "hangoutsMeet" },
                }
              : {}),
          },
        },
      }),
    },
  );

  const eventData = (await eventResponse.json()) as GoogleCalendarEventResponse;

  if (!eventResponse.ok) {
    throw new Error(eventData.error?.message || "Failed to create Google Calendar event.");
  }

  let meetLink = extractMeetLink(eventData);

  if (!meetLink && eventData.id) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const refreshedEvent = await fetchCalendarEvent(calendarId, eventData.id, accessToken);
    if (refreshedEvent) {
      meetLink = extractMeetLink(refreshedEvent);
    }
  }

  return {
    configured: true,
    conflict: false,
    meetLink,
    googleEventId: eventData.id || null,
  };
};