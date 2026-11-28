"use client";

import { certificate } from "@/data/nails";

const fmt = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });

/** The certificate as a refined document card. No ID numbers or QR codes are shown. */
export function CertificateCard({ onRequest }: { onRequest?: () => void }) {
  const valid = new Date() < new Date(`${certificate.validUntil}T23:59:59`);
  const rows: [string, string][] = [
    ["Issuing authority", certificate.issuer],
    ["Qualification holder", certificate.holder],
    ["Training duration", `${certificate.hours} hours`],
    ["Assessment result", certificate.result],
    ["Issued", fmt(certificate.issued)],
    ["Valid until", fmt(certificate.validUntil)],
  ];
  return (
    <article className="relative bg-white p-2 text-espresso shadow-[0_30px_60px_-40px_rgba(48,37,34,0.5)]">
      <div className="border border-champagne p-6 sm:p-10">
        <div className="flex items-start justify-between gap-4">
          <p className="label text-burgundy">{certificate.type}</p>
          <span className={`label inline-flex items-center gap-2 border px-3 py-1.5 ${valid ? "border-[#3f6b4e] text-[#2f5a3e]" : "border-espresso/40 text-espresso/70"}`}>
            <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${valid ? "bg-[#3f6b4e]" : "bg-espresso/40"}`} />
            {valid ? "Valid" : "Expired"}
          </span>
        </div>
        <h3 className="font-editorial mt-6 text-[clamp(2rem,4.4vw,3.2rem)]">{certificate.title}</h3>
        <p className="mt-2 italic text-espresso/70 font-editorial text-xl">Professional vocational certification</p>

        <dl className="mt-8 grid gap-x-8 border-t border-champagne/70 sm:grid-cols-2">
          {rows.slice(0, 2).map(([k, v]) => (
            <div key={k} className="border-b border-champagne/50 py-3.5">
              <dt className="label text-espresso/60">{k}</dt>
              <dd className="mt-1 font-medium">{v}</dd>
            </div>
          ))}
        </dl>

        <details className="group mt-2">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 py-2 text-sm font-semibold [&::-webkit-details-marker]:hidden">
            <span>Qualification details</span>
            <span aria-hidden className="text-lg transition-transform group-open:rotate-45">+</span>
          </summary>
          <dl className="grid gap-x-8 sm:grid-cols-2">
            {rows.slice(2).map(([k, v]) => (
              <div key={k} className="border-b border-champagne/50 py-3.5">
                <dt className="label text-espresso/60">{k}</dt>
                <dd className="mt-1 font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-espresso/70">{certificate.translation}</p>
          <p className="mt-1 text-sm text-espresso/70">{certificate.scope}</p>
        </details>

        {onRequest && (
          <button type="button" onClick={onRequest} className="btn mt-6 border border-espresso text-espresso hover:bg-espresso hover:text-ivory">
            Request professional credentials <span aria-hidden>&rarr;</span>
          </button>
        )}
      </div>
    </article>
  );
}
