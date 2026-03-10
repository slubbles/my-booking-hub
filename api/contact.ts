import { contactSubmissionSchema } from "../src/lib/schemas.js";
import { getOptionalEnv } from "./_lib/env.js";
import { flattenZodErrors, getClientIp, parseJsonBody, sendMethodNotAllowed } from "./_lib/http.js";
import { escapeHtml } from "./_lib/sanitize.js";
import { createAdminClient } from "./_lib/supabase.js";

const MAX_CONTACT_SUBMISSIONS_PER_HOUR = 5;

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
    const parsed = contactSubmissionSchema.safeParse(payload);

    if (!parsed.success) {
      response.status(400).json({
        error: "Invalid contact submission.",
        details: flattenZodErrors(parsed.error.flatten().fieldErrors),
      });
      return;
    }

    const { website, name, email, message } = parsed.data;
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    if (website) {
      response.status(200).json({ success: true });
      return;
    }

    const supabase = createAdminClient();
    const ipAddress = getClientIp(request);
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const { count, error: countError } = await supabase
      .from("contact_submissions")
      .select("id", { count: "exact", head: true })
      .eq("ip_address", ipAddress)
      .gte("created_at", oneHourAgo);

    if (countError) {
      throw countError;
    }

    if ((count || 0) >= MAX_CONTACT_SUBMISSIONS_PER_HOUR) {
      response.status(429).json({ error: "Too many submissions. Please try again later." });
      return;
    }

    const { error: insertError } = await supabase.from("contact_submissions").insert({
      name,
      email,
      message,
      ip_address: ipAddress,
    });

    if (insertError) {
      throw insertError;
    }

    const resendApiKey = getOptionalEnv("RESEND_API_KEY");
    const notificationEmail = getOptionalEnv("NOTIFICATION_EMAIL") || "idderfsalem98@gmail.com";
    const emailFrom = getOptionalEnv("EMAIL_FROM") || "Portfolio <noreply@example.com>";

    if (resendApiKey) {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: emailFrom,
          to: notificationEmail,
          subject: `New portfolio contact from ${name}`,
          html: `<h2>New contact submission</h2><p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Message:</strong></p><p>${safeMessage}</p>`,
          reply_to: email,
        }),
      });

      if (!emailResponse.ok) {
        console.error("Resend notification failed", await emailResponse.text());
      }
    }

    response.status(200).json({ success: true });
  } catch (error) {
    console.error("Contact API error", error);
    response.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "Contact submission failed. Check your server configuration.",
    });
  }
}