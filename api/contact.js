// Vercel serverless function: delivers the contact form to the site owner via
// Resend (https://resend.com). Until RESEND_API_KEY is set it responds 503 and
// the form falls back to a mailto: link.
const TO = "dineshsharma004785@gmail.com";
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  const body = req.body && typeof req.body === "object" ? req.body : {};
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  // Spam honeypot: real users never fill this hidden field.
  if (String(body.company ?? "").trim() !== "") {
    return res.status(200).json({ ok: true });
  }

  if (!name || name.length > 120) return res.status(422).json({ ok: false, error: "invalid_name" });
  if (!emailRe.test(email)) return res.status(422).json({ ok: false, error: "invalid_email" });
  if (message.length < 10 || message.length > 4000) {
    return res.status(422).json({ ok: false, error: "invalid_message" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return res.status(503).json({ ok: false, error: "email_not_configured" });

  const from = process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>";
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [TO],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });
    if (!r.ok) {
      console.error("Resend send failed:", r.status, await r.text().catch(() => ""));
      return res.status(502).json({ ok: false, error: "send_failed" });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Contact function error:", err);
    return res.status(502).json({ ok: false, error: "send_failed" });
  }
}
