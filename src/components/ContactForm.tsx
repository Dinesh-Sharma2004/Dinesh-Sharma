import { useState } from "react";
import { config } from "../config";

type Status = "idle" | "sending" | "success" | "error" | "not_configured";

const ContactForm = () => {
  const [status, setStatus] = useState<Status>("idle");
  const email = config.contact.email;
  const mailto = `mailto:${email}?subject=${encodeURIComponent("Project enquiry")}`;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      company: String(data.get("company") ?? ""),
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else if (res.status === 503 || res.status === 404) {
        // mail not connected yet (or running without the serverless function)
        setStatus("not_configured");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="contact-card">
      <h4>Send a message</h4>
      <p className="contact-card-sub">
        Straight to my inbox. Prefer email?{" "}
        <a href={mailto} data-cursor="disable">
          {email}
        </a>
      </p>
      <form onSubmit={onSubmit} noValidate>
        <div className="cf-hp" aria-hidden="true">
          <label>
            Company
            <input type="text" name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="cf-row">
          <div className="cf-field">
            <label htmlFor="cf-name">Name</label>
            <input id="cf-name" name="name" type="text" required autoComplete="name" />
          </div>
          <div className="cf-field">
            <label htmlFor="cf-email">Email</label>
            <input id="cf-email" name="email" type="email" required autoComplete="email" />
          </div>
        </div>

        <div className="cf-field">
          <label htmlFor="cf-message">Message</label>
          <textarea id="cf-message" name="message" rows={5} minLength={10} required />
        </div>

        <button type="submit" className="cf-submit" disabled={status === "sending"} data-cursor="disable">
          {status === "sending" ? "Sending…" : "Send message →"}
        </button>

        <div className="cf-status" aria-live="polite">
          {status === "success" && <span className="ok">Thanks — your message is on its way.</span>}
          {status === "error" && (
            <span>
              Something went wrong. Email me at <a href={mailto}>{email}</a>.
            </span>
          )}
          {status === "not_configured" && (
            <span>
              Email delivery isn&apos;t connected yet — reach me at <a href={mailto}>{email}</a>.
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
