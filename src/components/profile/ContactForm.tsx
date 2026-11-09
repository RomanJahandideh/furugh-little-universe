"use client";

import { useState, type FormEvent } from "react";
import { contactEndpoint, siteConfig } from "@/data/site-config";

type Status = { kind: "idle" | "sending" | "sent" } | { kind: "error"; message: string };

/**
 * Sends the message to Forough's email through FormSubmit. If sending fails
 * for any reason, the visitor is told plainly and offered her email address,
 * so no message is ever silently lost.
 */
export function ContactForm({
  subject = "New message from your website",
  initialMessage = "",
  dark = false,
}: {
  subject?: string;
  initialMessage?: string;
  dark?: boolean;
}) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const email = siteConfig.retail.email;

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data._honey) return; // bots fill the hidden field
    setStatus({ kind: "sending" });
    try {
      const res = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, _subject: subject, _template: "table", _captcha: "false" }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
      if (res.ok && String(json.success) === "true") {
        setStatus({ kind: "sent" });
        form.reset();
      } else {
        setStatus({ kind: "error", message: json.message ?? "The message couldn't be sent." });
      }
    } catch {
      setStatus({ kind: "error", message: "The message couldn't be sent. Please check your connection." });
    }
  };

  const field = dark
    ? "w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-white placeholder:text-white/55 focus:border-white focus:outline-none"
    : "w-full rounded-xl border border-line bg-panel px-4 py-3 placeholder:text-ink-soft/70 focus:border-ink focus:outline-none";
  const lbl = `mb-1.5 block text-sm font-medium ${dark ? "text-white/85" : ""}`;

  if (status.kind === "sent") {
    return (
      <div role="status" className={`rounded-2xl p-6 ${dark ? "bg-white/12" : "card"}`}>
        <p className="font-display text-2xl">Thank you! Your message is on its way.</p>
        <p className={`mt-2 ${dark ? "text-white/80" : "text-ink-soft"}`}>Forough will reply to the email address you entered.</p>
        <button type="button" className="mt-4 text-sm font-semibold underline underline-offset-4" onClick={() => setStatus({ kind: "idle" })}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2" noValidate={false}>
      <div>
        <label htmlFor="cf-name" className={lbl}>Your name</label>
        <input id="cf-name" name="name" required autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="cf-email" className={lbl}>Your email</label>
        <input id="cf-email" name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cf-company" className={lbl}>
          Store or company <span className="opacity-70">(optional)</span>
        </label>
        <input id="cf-company" name="company" autoComplete="organization" className={field} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cf-message" className={lbl}>Message</label>
        <textarea id="cf-message" name="message" required rows={5} defaultValue={initialMessage} key={initialMessage} className={`${field} resize-y`} />
      </div>
      {/* Honeypot: hidden from people, tempting to spam bots. */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" disabled={status.kind === "sending"} className={`btn ${dark ? "btn-light" : "btn-dark"} disabled:opacity-60`}>
          {status.kind === "sending" ? "Sending…" : "Send message"}
        </button>
        <p aria-live="polite" className={`text-sm ${dark ? "text-white/90" : "text-ink-soft"}`}>
          {status.kind === "error" && (
            <>
              {status.message} You can also email{" "}
              <a className="font-semibold underline underline-offset-4" href={`mailto:${email}`}>{email}</a>.
            </>
          )}
        </p>
      </div>
    </form>
  );
}
