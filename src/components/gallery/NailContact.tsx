"use client";

import { useState } from "react";
import { siteConfig } from "@/data/site-config";
import type { GalleryArtwork } from "@/lib/artworks";
import { ArtImage } from "./ArtImage";

/**
 * Nail inquiries. No form: there's no confirmed delivery method yet, and a
 * form that silently drops messages would be worse than none. Links appear
 * as soon as they're added to site-config.ts.
 */
export function NailContact({ chosen, onClear }: { chosen: GalleryArtwork | null; onClear: () => void }) {
  const { instagramUrl, instagramHandle, email, bookingUrl, preferredContact } = siteConfig.nails;
  const [copied, setCopied] = useState(false);
  const ref = chosen ? `Design No. ${String(chosen.number).padStart(2, "0")}: "${chosen.title}"` : null;
  const hasAny = Boolean(instagramUrl || email || bookingUrl);

  const copy = async () => {
    if (!ref) return;
    try {
      await navigator.clipboard.writeText(`Hi Furugh! I'd love nails like ${ref}.`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="inquire" aria-labelledby="inquire-title" className="scroll-mt-24 px-4 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto max-w-7xl rounded-[24px] bg-ink px-6 py-14 text-paper sm:px-12 sm:py-16">
        <h2 id="inquire-title" className="font-display h-section max-w-2xl">Like a design? Ask about it.</h2>
        <p className="mt-4 max-w-xl text-paper/75">
          Open any photo and tap <strong className="text-paper">&ldquo;Ask about this design&rdquo;</strong> to bring it here, then send it to Furugh.
        </p>

        {chosen && (
          <div className="mt-8 flex max-w-md items-center gap-4 rounded-[16px] bg-white/10 p-3">
            <div className="w-16 shrink-0 overflow-hidden rounded-[10px]">
              <ArtImage art={chosen} sizes="64px" decorative />
            </div>
            <div className="min-w-0 flex-1">
              <p className="label text-paper/60">You&rsquo;re asking about</p>
              <p className="truncate font-medium">{ref}</p>
              <div className="flex gap-4 text-sm">
                <button type="button" onClick={copy} className="min-h-11 font-semibold underline underline-offset-4">
                  {copied ? "Copied!" : "Copy a message"}
                </button>
                <button type="button" onClick={onClear} className="min-h-11 text-paper/60 underline underline-offset-4">
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {instagramUrl && (
            <a className="btn btn-light" href={instagramUrl} target="_blank" rel="noopener noreferrer">
              Message on Instagram{instagramHandle ? ` ${instagramHandle}` : ""}
            </a>
          )}
          {email && (
            <a className="btn btn-ghost-light" href={`mailto:${email}?subject=${encodeURIComponent(ref ? `Nail inquiry: ${ref}` : "Nail inquiry")}`}>
              Email an inquiry
            </a>
          )}
          {bookingUrl && (
            <a className="btn btn-ghost-light" href={bookingUrl} target="_blank" rel="noopener noreferrer">
              Request an appointment
            </a>
          )}
          {!hasAny && <p className="rounded-full border border-white/25 px-5 py-3 text-sm">Instagram and contact links are coming soon.</p>}
        </div>
        {preferredContact && <p className="mt-6 text-sm text-paper/70">Preferred contact: {preferredContact}</p>}
      </div>
    </section>
  );
}
