"use client";

import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { site } from "@/data/site";

type Status = "idle" | "sending" | "success" | "error" | "not_configured";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      company: String(data.get("company") ?? "")
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else if (res.status === 503) {
        setStatus("not_configured");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const mailtoFallback = `mailto:${site.email}?subject=${encodeURIComponent(
    "Project enquiry"
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7 }}
      className="glass-crystal glass-sheen rounded-[26px] p-7 sm:p-9"
    >
      <h3 className="font-display text-2xl font-semibold text-ink">Send a message</h3>
      <p className="mt-3 text-sm leading-7 text-ink-dim">
        This goes straight to my inbox. Prefer email? Write to{" "}
        <a href={mailtoFallback} className="text-cyan underline-offset-4 hover:underline" data-cursor="link">
          {site.email}
        </a>
        .
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
        {/* Honeypot: visually hidden, ignored by humans. */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label>
            Company
            <input type="text" name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="name" label="Name" type="text" autoComplete="name" />
          <Field id="email" label="Email" type="email" autoComplete="email" />
        </div>

        <label className="group relative block">
          <textarea
            name="message"
            required
            rows={5}
            minLength={10}
            placeholder=" "
            className="peer w-full rounded-[18px] border border-white/10 bg-white/[0.03] px-4 pt-7 pb-3 text-ink outline-none transition focus:border-cyan/45 focus:bg-white/[0.06]"
          />
          <span className="pointer-events-none absolute left-4 top-4 text-sm text-ink-dim transition-all peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-cyan peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-xs">
            Message
          </span>
        </label>

        <button
          type="submit"
          disabled={status === "sending"}
          data-cursor="link"
          className="edge-spec inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan to-violet px-6 py-3.5 text-sm font-medium text-obsidian shadow-glow transition hover:shadow-violet disabled:opacity-70"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> Send Message
            </>
          )}
        </button>

        <div aria-live="polite" className="min-h-[1.5rem] text-sm">
          {status === "success" && (
            <p className="text-lime">Thanks — your message is on its way. I&apos;ll reply soon.</p>
          )}
          {status === "error" && (
            <p className="text-ink-dim">
              Something went wrong. Please email me directly at{" "}
              <a href={mailtoFallback} className="text-cyan underline-offset-4 hover:underline">
                {site.email}
              </a>
              .
            </p>
          )}
          {status === "not_configured" && (
            <p className="text-ink-dim">
              Email delivery isn&apos;t connected yet — reach me directly at{" "}
              <a href={mailtoFallback} className="text-cyan underline-offset-4 hover:underline">
                {site.email}
              </a>
              .
            </p>
          )}
        </div>
      </form>
    </motion.div>
  );
}

function Field({
  id,
  label,
  type,
  autoComplete
}: {
  id: string;
  label: string;
  type: string;
  autoComplete?: string;
}) {
  return (
    <label className="group relative block">
      <input
        id={id}
        name={id}
        type={type}
        required
        autoComplete={autoComplete}
        placeholder=" "
        className="peer h-14 w-full rounded-[16px] border border-white/10 bg-white/[0.03] px-4 pt-5 text-ink outline-none transition focus:border-cyan/45 focus:bg-white/[0.06]"
      />
      <span className="pointer-events-none absolute left-4 top-4 text-sm text-ink-dim transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
        {label}
      </span>
    </label>
  );
}
