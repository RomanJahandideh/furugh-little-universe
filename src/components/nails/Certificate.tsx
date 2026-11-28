"use client";

import data from "@/data/certificate-pages.json";
import { asset } from "@/lib/paths";

type Pages = { pdf: string | null; pages: { src: string; width: number; height: number }[] };
const cert = data as Pages;

/** True once the real certificate PDF has been added with scripts/process_certificate.py. */
export const hasCertificate = Boolean(cert.pdf && cert.pages.length);

/** The certificate exactly as issued: its own pages, plus the original PDF to open or download. */
export function CertificateDocument({ light = false }: { light?: boolean }) {
  if (!hasCertificate) return null;
  const pdf = asset(cert.pdf!);
  return (
    <figure>
      <a href={pdf} target="_blank" rel="noopener noreferrer" className="grid gap-3 sm:grid-cols-2" aria-label="Open the certificate PDF in a new tab">
        {cert.pages.map((p, i) => (
          <img
            key={p.src}
            src={asset(p.src)}
            width={p.width}
            height={p.height}
            loading={i === 0 ? "eager" : "lazy"}
            alt={`Nail Care and Correction Technology certificate, page ${i + 1} of ${cert.pages.length}`}
            className="block h-auto w-full bg-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]"
          />
        ))}
      </a>
      <figcaption className="mt-5 flex flex-wrap gap-3">
        <a href={pdf} target="_blank" rel="noopener noreferrer" className={`btn ${light ? "bg-ivory text-espresso hover:bg-champagne" : "bg-espresso text-ivory hover:bg-burgundy"}`}>
          Open the PDF
        </a>
        <a href={pdf} download className={`btn border ${light ? "border-ivory/60 hover:bg-ivory hover:text-espresso" : "border-espresso hover:bg-espresso hover:text-ivory"}`}>
          Download the certificate
        </a>
      </figcaption>
    </figure>
  );
}
