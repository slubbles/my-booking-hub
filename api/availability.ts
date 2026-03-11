import { bookingDurations } from "../src/lib/schemas.js";
import { BOOKING_TIME_SLOTS, bookingsOverlap, minutesToTimeString, timeToMinutes } from "../src/lib/booking.js";
import { sendMethodNotAllowed } from "./_lib/http.js";
import { createAdminClient } from "./_lib/supabase.js";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const getQueryValue = (request: any, key: string) => {
  const directValue = request.query?.[key];
  if (typeof directValue === "string") {
    return directValue;
  }

  const url = typeof request.url === "string" ? request.url : "";
  if (url) {
    const parsed = new URL(url, "http://localhost");
    return parsed.searchParams.get(key) || undefined;
  }

  return undefined;
};

export default async function handler(request: any, response: any) {
  if (request.method !== "GET") {
    sendMethodNotAllowed(response, ["GET"]);
    return;
  }

  try {
    const date = getQueryValue(request, "date");
    const durationValue = getQueryValue(request, "duration");
    const duration = Number(durationValue);

    if (!date || !DATE_PATTERN.test(date)) {
      response.status(400).json({ error: "Date must use YYYY-MM-DD." });
      return;
    }

    if (!bookingDurations.includes(duration as (typeof bookingDurations)[number])) {
      response.status(400).json({ error: "Invalid duration." });
      return;
    }

    const manilaDayOfWeek = new Date(`${date}T00:00:00+08:00`).getUTCDay();
    const supabase = createAdminClient();

    const { data: availabilitySlots, error: availabilityError } = await supabase
      .from("availability")
      .select("start_time, end_time")
      .eq("day_of_week", manilaDayOfWeek)
      .eq("is_active", true);

    if (availabilityError) {
      throw availabilityError;
    }

    const { data: existingBookings, error: bookingsError } = await supabase
      .from("bookings")
      .select("time, duration_minutes")
      .eq("date", date)
      .eq("status", "confirmed");

    if (bookingsError) {
      throw bookingsError;
    }

    const slots = BOOKING_TIME_SLOTS.map((time) => {
      const requestedEndMinutes = timeToMinutes(time) + duration;
      const withinWindow = availabilitySlots?.some((slot) => {
        return slot.start_time <= `${time}:00` && slot.end_time >= minutesToTimeString(requestedEndMinutes);
      }) || false;

      if (!withinWindow) {
        return { time, available: false, reason: "outside_window" };
      }

      const hasConflict = existingBookings?.some((booking) => {
        return bookingsOverlap(time, duration, booking.time, booking.duration_minutes);
      }) || false;

      if (hasConflict) {
        return { time, available: false, reason: "booked" };
      }

      return { time, available: true, reason: "available" };
    });

    response.status(200).json({ date, duration, slots });
  } catch (error) {
    console.error("Availability API error", error);
    response.status(500).json({
      error: error instanceof Error ? error.message : "Failed to load availability.",
    });
  }
}