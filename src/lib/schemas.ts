import { z } from "zod";

export const contactSubmissionSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
  website: z.string().max(255).optional().default(""),
});

export const bookingDurations = [15, 30, 45, 60] as const;

export const bookingRequestSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  notes: z.string().trim().max(1000, "Notes must be less than 1000 characters").optional().default(""),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must use YYYY-MM-DD"),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Time must use HH:MM"),
  duration: z.union([
    z.literal(bookingDurations[0]),
    z.literal(bookingDurations[1]),
    z.literal(bookingDurations[2]),
    z.literal(bookingDurations[3]),
  ]),
});

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;
export type BookingRequestInput = z.infer<typeof bookingRequestSchema>;