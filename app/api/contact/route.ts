import { NextResponse } from "next/server";
import { site } from "@/data/site";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  message?: string;
  company?: string; // honeypot — must stay empty
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  // Spam honeypot: real users never fill this hidden field.
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (!name || name.length > 120) {
    return NextResponse.json({ ok: false, error: "invalid_name" }, { status: 422 });
  }
  if (!emailRe.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 422 });
  }
  if (!message || message.length < 10 || message.length > 4000) {
    return NextResponse.json({ ok: false, error: "invalid_message" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  // A verified sender on your Resend account; falls back to Resend's shared
  // onboarding sender for first-run testing.
  const from = process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>";

  // Not wired up yet: tell the client to offer the mailto fallback.
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "email_not_configured" },
      { status: 503 }
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: [site.email],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`
      })
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Resend send failed:", res.status, detail);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
