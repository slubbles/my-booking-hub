import { parseJsonBody, sendMethodNotAllowed } from "./_lib/http.js";
import { createAdminClient } from "./_lib/supabase.js";
import { assertAdminToken } from "./_lib/admin.js";

const DAYS = [
  { dayOfWeek: 0, label: "Sunday" },
  { dayOfWeek: 1, label: "Monday" },
  { dayOfWeek: 2, label: "Tuesday" },
  { dayOfWeek: 3, label: "Wednesday" },
  { dayOfWeek: 4, label: "Thursday" },
  { dayOfWeek: 5, label: "Friday" },
  { dayOfWeek: 6, label: "Saturday" },
];

const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/;

const normalizeTime = (value) => `${value}:00`;

const validateSlots = (slots) => {
  if (!Array.isArray(slots) || slots.length !== DAYS.length) {
    throw new Error("Expected one availability entry for each day of the week.");
  }

  return slots.map((slot) => {
    if (typeof slot?.dayOfWeek !== "number" || slot.dayOfWeek < 0 || slot.dayOfWeek > 6) {
      throw new Error("Each availability entry requires a valid dayOfWeek.");
    }

    const isActive = Boolean(slot.isActive);
    const startTime = typeof slot.startTime === "string" ? slot.startTime : "09:00";
    const endTime = typeof slot.endTime === "string" ? slot.endTime : "17:00";

    if (isActive) {
      if (!TIME_PATTERN.test(startTime) || !TIME_PATTERN.test(endTime)) {
        throw new Error("Active days require start and end times in HH:MM format.");
      }

      if (startTime >= endTime) {
        throw new Error("Start time must be earlier than end time.");
      }
    }

    return {
      day_of_week: slot.dayOfWeek,
      start_time: normalizeTime(startTime),
      end_time: normalizeTime(endTime),
      is_active: isActive,
    };
  });
};

export default async function handler(request, response) {
  if (request.method === "OPTIONS") {
    response.setHeader("Allow", "GET, PUT, OPTIONS");
    response.status(204).end();
    return;
  }

  if (!["GET", "PUT"].includes(request.method || "")) {
    sendMethodNotAllowed(response, ["GET", "PUT", "OPTIONS"]);
    return;
  }

  try {
    assertAdminToken(request);

    const supabase = createAdminClient();

    if (request.method === "GET") {
      const { data, error } = await supabase
        .from("availability")
        .select("id, day_of_week, start_time, end_time, is_active")
        .order("day_of_week", { ascending: true })
        .order("start_time", { ascending: true });

      if (error) {
        throw error;
      }

      const slots = DAYS.map((day) => {
        const match = data?.find((entry) => entry.day_of_week === day.dayOfWeek && entry.is_active);

        return {
          dayOfWeek: day.dayOfWeek,
          label: day.label,
          isActive: Boolean(match),
          startTime: match?.start_time?.slice(0, 5) || "09:00",
          endTime: match?.end_time?.slice(0, 5) || "17:00",
        };
      });

      response.status(200).json({ slots, timezone: "Asia/Manila" });
      return;
    }

    const body = parseJsonBody(request);
    const slots = validateSlots(body.slots);

    const { error: deleteError } = await supabase
      .from("availability")
      .delete()
      .gte("day_of_week", 0)
      .lte("day_of_week", 6);

    if (deleteError) {
      throw deleteError;
    }

    const activeSlots = slots.filter((slot) => slot.is_active);
    if (activeSlots.length) {
      const { error: insertError } = await supabase.from("availability").insert(activeSlots);
      if (insertError) {
        throw insertError;
      }
    }

    response.status(200).json({ success: true });
  } catch (error) {
    const statusCode = typeof error?.statusCode === "number" ? error.statusCode : 500;
    response.status(statusCode).json({
      error: error instanceof Error ? error.message : "Failed to manage availability.",
    });
  }
}