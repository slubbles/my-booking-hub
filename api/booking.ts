import { bookingRequestSchema } from "../src/lib/schemas.js";
import { bookingsOverlap, minutesToTimeString } from "../src/lib/booking.js";
import { createCalendarBooking } from "./_lib/google-calendar.js";
import { getOptionalEnv } from "./_lib/env.js";
import { flattenZodErrors, getClientIp, parseJsonBody, sendMethodNotAllowed } from "./_lib/http.js";
import { escapeHtml } from "./_lib/sanitize.js";
import { createAdminClient } from "./_lib/supabase.js";

const MAX_BOOKINGS_PER_DAY_PER_IP = 10;

export default async function handler(request: any, response: any) {
  if (request.method === "OPTIONS") {
    response.setHeader("Allow", "POST, OPTIONS");
    response.status(204).end();
    return;
  }

  if (request.method !== "POST") {
    sendMethodNotAllowed(response, ["POST", "OPTIONS"]);
    return;
  }

  try {
    const payload = parseJsonBody(request);
    const parsed = bookingRequestSchema.safeParse(payload);

    if (!parsed.success) {
      response.status(400).json({
        error: "Invalid booking request.",
        details: flattenZodErrors(parsed.error.flatten().fieldErrors),
      });
      return;
    }

    const { name, email, notes, date, time, duration } = parsed.data;
    const startDateTime = new Date(`${date}T${time}:00+08:00`);

    if (Number.isNaN(startDateTime.getTime())) {
      response.status(400).json({ error: "Invalid booking date or time." });
      return;
    }

    if (startDateTime <= new Date()) {
      response.status(400).json({ error: "Bookings must be scheduled in the future." });
      return;
    }

    const requestedEndMinutes = duration + Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));
    const endDateTime = new Date(startDateTime.getTime() + duration * 60 * 1000);
    const manilaDayOfWeek = new Date(`${date}T00:00:00+08:00`).getUTCDay();
    const supabase = createAdminClient();
    const ipAddress = getClientIp(request);
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { count: bookingCount, error: bookingCountError } = await supabase
      .from("bookings")
      .select("id", { count: "exact", head: true })
      .eq("ip_address", ipAddress)
      .gte("created_at", oneDayAgo);

    if (bookingCountError) {
      throw bookingCountError;
    }

    if ((bookingCount || 0) >= MAX_BOOKINGS_PER_DAY_PER_IP) {
      response.status(429).json({ error: "Too many booking attempts. Please try again later." });
      return;
    }

    const { data: availabilitySlots, error: availabilityError } = await supabase
      .from("availability")
      .select("start_time, end_time")
      .eq("day_of_week", manilaDayOfWeek)
      .eq("is_active", true)
      .lte("start_time", `${time}:00`)
      .gte("end_time", minutesToTimeString(requestedEndMinutes));

    if (availabilityError) {
      throw availabilityError;
    }

    if (!availabilitySlots?.length) {
      response.status(409).json({ error: "That time is outside the available booking window." });
      return;
    }

    const { data: existingBookings, error: bookingsError } = await supabase
      .from("bookings")
      .select("time, duration_minutes")
      .eq("date", date)
      .eq("status", "confirmed");

    if (bookingsError) {
      throw bookingsError;
    }

    const hasConflict = existingBookings?.some((booking) => {
      return bookingsOverlap(time, duration, booking.time, booking.duration_minutes);
    });

    if (hasConflict) {
      response.status(409).json({ error: "This time slot is already booked." });
      return;
    }

    const notificationEmail = getOptionalEnv("NOTIFICATION_EMAIL") || "idderfsalem98@gmail.com";
    const resendApiKey = getOptionalEnv("RESEND_API_KEY");
    const emailFrom = getOptionalEnv("EMAIL_FROM") || "Portfolio <noreply@example.com>";

    let meetLink: string | null = null;
    let googleEventId: string | null = null;

    try {
      const calendarResult = await createCalendarBooking({
        name,
        email,
        notes,
        startDateTime,
        endDateTime,
        notificationEmail,
      });

      if (calendarResult.conflict) {
        response.status(409).json({ error: "This slot is no longer available." });
        return;
      }

      meetLink = calendarResult.meetLink;
      googleEventId = calendarResult.googleEventId;
    } catch (calendarError) {
      console.error("Google Calendar booking failed", calendarError);
    }

    const { error: insertError } = await supabase.from("bookings").insert({
      name,
      email,
      notes: notes || null,
      ip_address: ipAddress,
      date,
      time: `${time}:00`,
      duration_minutes: duration,
      meet_link: meetLink,
      google_event_id: googleEventId,
      status: "confirmed",
    });

    if (insertError) {
      throw insertError;
    }

    if (resendApiKey) {
      const safeName = escapeHtml(name);
      const safeEmail = escapeHtml(email);
      const safeNotes = escapeHtml(notes || "None").replace(/\n/g, "<br>");
      const safeDateTime = escapeHtml(startDateTime.toLocaleString("en-PH", {
        dateStyle: "full",
        timeStyle: "short",
        timeZone: "Asia/Manila",
      }));

      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: emailFrom,
          to: notificationEmail,
          subject: `New booking from ${name}`,
          html: `<h2>New booking confirmed</h2><p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>When:</strong> ${safeDateTime} (Asia/Manila)</p><p><strong>Duration:</strong> ${duration} minutes</p><p><strong>Notes:</strong></p><p>${safeNotes}</p>${meetLink ? `<p><strong>Google Meet:</strong> <a href="${meetLink}">${meetLink}</a></p>` : ""}`,
          reply_to: email,
        }),
      });

      if (!emailResponse.ok) {
        console.error("Booking notification failed", await emailResponse.text());
      }
    }

    response.status(200).json({
      success: true,
      meetLink,
      scheduledAt: startDateTime.toISOString(),
    });
  } catch (error) {
    console.error("Booking API error", error);
    response.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "Booking failed. Check your server configuration.",
    });
  }
}