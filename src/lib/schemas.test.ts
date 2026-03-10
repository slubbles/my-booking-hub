import { describe, expect, it } from "vitest";
import { bookingRequestSchema, contactSubmissionSchema } from "@/lib/schemas";

describe("contactSubmissionSchema", () => {
  it("accepts a valid contact payload", () => {
    const result = contactSubmissionSchema.safeParse({
      name: "Idderf Salem",
      email: "idderf@example.com",
      message: "I need help building a product.",
      website: "",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid emails", () => {
    const result = contactSubmissionSchema.safeParse({
      name: "Idderf Salem",
      email: "not-an-email",
      message: "Hello",
      website: "",
    });

    expect(result.success).toBe(false);
  });
});

describe("bookingRequestSchema", () => {
  it("accepts a valid booking payload", () => {
    const result = bookingRequestSchema.safeParse({
      name: "Idderf Salem",
      email: "idderf@example.com",
      notes: "Project planning call",
      date: "2026-03-20",
      time: "09:30",
      duration: 30,
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid durations", () => {
    const result = bookingRequestSchema.safeParse({
      name: "Idderf Salem",
      email: "idderf@example.com",
      notes: "Project planning call",
      date: "2026-03-20",
      time: "09:30",
      duration: 20,
    });

    expect(result.success).toBe(false);
  });

  it("rejects malformed dates", () => {
    const result = bookingRequestSchema.safeParse({
      name: "Idderf Salem",
      email: "idderf@example.com",
      notes: "Project planning call",
      date: "03/20/2026",
      time: "09:30",
      duration: 30,
    });

    expect(result.success).toBe(false);
  });
});