import { describe, expect, it } from "vitest";
import { bookingsOverlap, minutesToTimeString, timeToMinutes } from "@/lib/booking";

describe("booking utilities", () => {
  it("converts time strings to minutes", () => {
    expect(timeToMinutes("09:30")).toBe(570);
    expect(timeToMinutes("17:00")).toBe(1020);
  });

  it("converts minutes to a SQL-friendly time string", () => {
    expect(minutesToTimeString(570)).toBe("09:30:00");
    expect(minutesToTimeString(1020)).toBe("17:00:00");
  });

  it("detects overlapping bookings", () => {
    expect(bookingsOverlap("09:00", 30, "09:15", 30)).toBe(true);
    expect(bookingsOverlap("10:00", 60, "10:30", 30)).toBe(true);
  });

  it("allows back-to-back bookings without overlap", () => {
    expect(bookingsOverlap("09:00", 30, "09:30", 30)).toBe(false);
    expect(bookingsOverlap("10:30", 30, "10:00", 30)).toBe(false);
  });
});