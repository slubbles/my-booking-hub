const getSenderAddress = (value) => {
  const match = value.match(/<([^>]+)>/);
  return match?.[1]?.trim() || value.trim();
};

export const buildEmailFrom = (value, displayName = "Idderf Salem") => {
  return `${displayName} <${getSenderAddress(value)}>`;
};

const renderEmailLayout = ({
  preview,
  eyebrow,
  title,
  intro,
  sections,
  ctaLabel,
  ctaUrl,
  footer,
}) => {
  const sectionMarkup = sections
    .map(
      (section) => `
        <div style="padding:16px 0;border-top:1px solid #e5e7eb;">
          <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#ef4444;font-weight:700;margin-bottom:8px;">${section.label}</div>
          <div style="font-size:15px;line-height:1.7;color:#111827;">${section.value}</div>
        </div>
      `,
    )
    .join("");

  const ctaMarkup = ctaLabel && ctaUrl
    ? `
      <div style="padding-top:24px;">
        <a href="${ctaUrl}" style="display:inline-block;background:#111827;color:#ffffff;text-decoration:none;padding:12px 18px;border-radius:999px;font-weight:700;font-size:14px;">${ctaLabel}</a>
      </div>
    `
    : "";

  return `
    <!doctype html>
    <html>
      <body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;color:#111827;">
        <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preview}</div>
        <div style="max-width:640px;margin:0 auto;padding:32px 16px;">
          <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:24px;overflow:hidden;box-shadow:0 18px 45px rgba(15,23,42,0.08);">
            <div style="padding:28px 28px 20px;background:linear-gradient(135deg,#0f172a 0%,#111827 100%);color:#ffffff;">
              <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#fca5a5;font-weight:700;margin-bottom:10px;">${eyebrow}</div>
              <div style="font-size:30px;line-height:1.2;font-weight:800;margin-bottom:10px;">${title}</div>
              <div style="font-size:15px;line-height:1.8;color:#e5e7eb;">${intro}</div>
            </div>
            <div style="padding:28px;">
              ${sectionMarkup}
              ${ctaMarkup}
            </div>
          </div>
          <div style="padding:16px 8px 0;font-size:12px;line-height:1.7;color:#6b7280;text-align:center;">
            ${footer || "Idderf Salem booking hub"}
          </div>
        </div>
      </body>
    </html>
  `;
};

export const renderBookingNotificationEmail = ({
  name,
  email,
  prospectTime,
  manilaTime,
  duration,
  timeZoneLabel,
  notes,
  meetLink,
}) => {
  return renderEmailLayout({
    preview: `New booking from ${name}`,
    eyebrow: "New Booking",
    title: `${name} booked a call`,
    intro: `A new project discussion was booked through the site. The slot is shown in both the prospect's timezone and your Manila timezone.`,
    sections: [
      { label: "Prospect", value: `<strong>${name}</strong><br>${email}` },
      { label: "Their Local Time", value: `${prospectTime}<br><span style="color:#6b7280;">Timezone: ${timeZoneLabel}</span>` },
      { label: "Your Manila Time", value: manilaTime },
      { label: "Duration", value: `${duration} minutes` },
      { label: "Notes", value: notes },
    ],
    ctaLabel: meetLink ? "Open Google Meet" : undefined,
    ctaUrl: meetLink || undefined,
    footer: "Reply directly to the prospect email if you need more context before the call.",
  });
};

export const renderBookingConfirmationEmail = ({
  name,
  prospectTime,
  manilaTime,
  duration,
  timeZoneLabel,
  notes,
  meetLink,
}) => {
  return renderEmailLayout({
    preview: "Your booking is confirmed",
    eyebrow: "Booking Confirmed",
    title: `You're booked, ${name}`,
    intro: `Your project discussion is locked in. Keep this email handy so you have both your local time and the host's Manila time.`,
    sections: [
      { label: "Your Local Time", value: `${prospectTime}<br><span style="color:#6b7280;">Timezone: ${timeZoneLabel}</span>` },
      { label: "Host Time", value: `${manilaTime}<br><span style="color:#6b7280;">Asia/Manila (UTC+8)</span>` },
      { label: "Duration", value: `${duration} minutes` },
      { label: "Notes", value: notes },
    ],
    ctaLabel: meetLink ? "Join Google Meet" : undefined,
    ctaUrl: meetLink || undefined,
    footer: meetLink
      ? "If anything changes, reply to this email and the updated Meet link will stay attached to the calendar event."
      : "Your booking is confirmed, but a Meet link was not attached automatically.",
  });
};

export const renderContactNotificationEmail = ({ name, email, message }) => {
  return renderEmailLayout({
    preview: `New inquiry from ${name}`,
    eyebrow: "New Inquiry",
    title: `${name} sent a message`,
    intro: `A new contact submission just came in from the website.`,
    sections: [
      { label: "Sender", value: `<strong>${name}</strong><br>${email}` },
      { label: "Message", value: message },
    ],
    footer: "Reply directly to continue the conversation from your email client.",
  });
};