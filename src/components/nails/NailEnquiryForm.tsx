"use client";

import { useState, type FormEvent } from "react";
import { enquiryTypes, services, type EnquiryType } from "@/data/nails";
import { contactEndpoint, siteConfig } from "@/data/site-config";

export interface EnquiryPreset {
  type: EnquiryType;
  service?: string;
  design?: string;
}

type Status = { kind: "idle" | "sending" | "sent" } | { kind: "error"; message: string };

const SHAPES = ["Almond", "Oval", "Round", "Square", "Other / not sure"];
const LENGTHS = ["Short", "Medium", "Long", "Not sure"];
const CONDITIONS = ["Natural nails, no product", "Existing gel enhancements", "Other existing enhancements", "Not sure"];

/**
 * Nail enquiry form. Sends to Forough's inbox through FormSubmit (the same
 * service as the rest of the site). It never pretends to book anything:
 * success is shown only when FormSubmit confirms, and every error offers her
 * email address instead.
 */
export function NailEnquiryForm({ preset, idPrefix = "ne" }: { preset: EnquiryPreset; idPrefix?: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [type, setType] = useState<EnquiryType>(preset.type);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [presetSeen, setPresetSeen] = useState(preset);
  const email = siteConfig.contact.email;
  const isAppointment = type === "Appointment enquiry";

  // A new preset (a button elsewhere on the page) switches the enquiry type.
  if (presetSeen !== preset) {
    setPresetSeen(preset);
    setType(preset.type);
  }

  const id = (n: string) => `${idPrefix}-${n}`;

  const validate = (data: Record<string, string>) => {
    const e: Record<string, string> = {};
    if (!data.name?.trim()) e.name = "Please enter your name.";
    if (!data.email?.trim()) e.email = "Please enter your email so Forough can reply.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "That email address doesn't look complete.";
    if (data.phone && !/^[\d\s()+.-]{7,}$/.test(data.phone)) e.phone = "Please use digits, spaces, + or dashes only.";
    if (!data.message?.trim() && !data.inspiration?.trim()) e.message = "Please add a short message.";
    return e;
  };

  const submit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (raw._honey) return;
    const e = validate(raw);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      document.getElementById(id(first))?.focus();
      return;
    }
    const labelled: Record<string, string> = {
      Name: raw.name,
      Email: raw.email,
      Phone: raw.phone || "(not given)",
      "Enquiry type": type,
    };
    if (isAppointment) {
      Object.assign(labelled, {
        "Preferred service": raw.service || "(not chosen)",
        "Current nail condition": raw.condition || "(not given)",
        "Preferred shape": raw.shape || "(not given)",
        "Preferred length": raw.length || "(not given)",
        "Preferred date (not a confirmed booking)": raw.date || "(not given)",
      });
    }
    if (preset.design) labelled["Design from the portfolio"] = preset.design;
    if (raw.inspiration) labelled["Design inspiration"] = raw.inspiration;
    labelled.Message = raw.message || "";

    setStatus({ kind: "sending" });
    try {
      const res = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...labelled, _replyto: raw.email, _subject: `Nails: ${type}${preset.design ? ` (${preset.design})` : ""}`, _template: "table", _captcha: "false" }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
      if (res.ok && String(json.success) === "true") {
        setStatus({ kind: "sent" });
        form.reset();
      } else setStatus({ kind: "error", message: json.message ?? "The message couldn't be sent." });
    } catch {
      setStatus({ kind: "error", message: "The message couldn't be sent. Please check your connection." });
    }
  };

  if (status.kind === "sent") {
    return (
      <div role="status" className="border border-espresso/20 bg-white p-7">
        <p className="font-editorial text-[2.2rem]">Thank you. Your message has been sent.</p>
        <p className="mt-3 text-espresso/75">
          Forough will reply to the email address you entered. {isAppointment && "This is an enquiry, not a confirmed appointment."}
        </p>
        <button type="button" className="mt-5 text-sm font-semibold underline underline-offset-4" onClick={() => setStatus({ kind: "idle" })}>
          Send another message
        </button>
      </div>
    );
  }

  const lbl = "mb-1.5 block text-sm font-medium";
  const err = (n: string) =>
    errors[n] ? (
      <p id={id(`${n}-err`)} className="mt-1.5 text-sm text-[#a3283f]">
        {errors[n]}
      </p>
    ) : null;
  const aria = (n: string) => ({ "aria-invalid": errors[n] ? true : undefined, "aria-describedby": errors[n] ? id(`${n}-err`) : undefined });

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor={id("type")} className={lbl}>What is this about?</label>
        <select id={id("type")} name="type" value={type} onChange={(e) => setType(e.target.value as EnquiryType)} className="nail-field">
          {enquiryTypes.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor={id("name")} className={lbl}>Full name</label>
        <input id={id("name")} name="name" autoComplete="name" className="nail-field" {...aria("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor={id("email")} className={lbl}>Email address</label>
        <input id={id("email")} name="email" type="email" inputMode="email" autoComplete="email" className="nail-field" {...aria("email")} />
        {err("email")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={id("phone")} className={lbl}>Phone <span className="font-normal text-espresso/60">(optional)</span></label>
        <input id={id("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel" className="nail-field" {...aria("phone")} />
        {err("phone")}
      </div>

      {isAppointment && (
        <>
          <div className="sm:col-span-2">
            <label htmlFor={id("service")} className={lbl}>Preferred service</label>
            <select id={id("service")} name="service" defaultValue={preset.service ?? ""} key={preset.service ?? "none"} className="nail-field">
              <option value="">Not sure yet</option>
              {services.map((s) => <option key={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor={id("condition")} className={lbl}>Current nail condition</label>
            <select id={id("condition")} name="condition" defaultValue="" className="nail-field">
              <option value="">Choose…</option>
              {CONDITIONS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor={id("date")} className={lbl}>Preferred date <span className="font-normal text-espresso/60">(optional)</span></label>
            <input id={id("date")} name="date" type="date" className="nail-field" />
          </div>
          <div>
            <label htmlFor={id("shape")} className={lbl}>Preferred shape</label>
            <select id={id("shape")} name="shape" defaultValue="" className="nail-field">
              <option value="">Choose…</option>
              {SHAPES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor={id("length")} className={lbl}>Preferred length</label>
            <select id={id("length")} name="length" defaultValue="" className="nail-field">
              <option value="">Choose…</option>
              {LENGTHS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={id("inspiration")} className={lbl}>Design inspiration</label>
            <textarea
              id={id("inspiration")}
              name="inspiration"
              rows={3}
              key={preset.design ?? "none"}
              defaultValue={preset.design ? `I'd love something like ${preset.design}.` : ""}
              placeholder="Colours, style, an occasion, or a link to a reference photo"
              className="nail-field resize-y"
            />
          </div>
        </>
      )}

      <div className="sm:col-span-2">
        <label htmlFor={id("message")} className={lbl}>{isAppointment ? "Anything else?" : "Message"}</label>
        <textarea id={id("message")} name="message" rows={4} className="nail-field resize-y" {...aria("message")} />
        {err("message")}
      </div>
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <p className="text-sm leading-relaxed text-espresso/65 sm:col-span-2">
        Your details are sent to Forough&rsquo;s email through FormSubmit and used only to reply to you. {isAppointment && "Sending this form does not book an appointment."}
      </p>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" disabled={status.kind === "sending"} className="btn bg-espresso text-ivory hover:bg-burgundy disabled:opacity-60">
          {status.kind === "sending" ? (
            <>
              <span aria-hidden className="h-4 w-4 animate-spin rounded-full border-2 border-ivory/40 border-t-ivory" /> Sending…
            </>
          ) : (
            "Send enquiry"
          )}
        </button>
        <p aria-live="polite" className="text-sm text-espresso/80">
          {status.kind === "error" && (
            <>
              {status.message} Please email{" "}
              <a className="font-semibold underline underline-offset-4" href={`mailto:${email}`}>{email}</a> instead.
            </>
          )}
        </p>
      </div>
    </form>
  );
}
