"use client";

import { useState } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { PolishBottle, Sparkle } from "@/components/illustrations/Doodles";
import { siteConfig } from "@/data/site-config";
import type { GalleryArtwork } from "@/lib/artworks";
import { ArtImage } from "./ArtImage";

/**
 * Inquiry section. No form: there's no confirmed delivery method yet, and a
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
    <section id="inquire" aria-labelledby="inquire-title" className="relative scroll-mt-[calc(var(--nav-h)+1rem)] on-light overflow-hidden bg-pink px-4 py-24 sm:px-8">
      <Reveal className="relative mx-auto max-w-3xl text-center">
        <PolishBottle aria-hidden className="pop anim-wobble absolute -left-1 -top-20 w-12 text-ink sm:-left-6 sm:-top-10 sm:w-20" polish="var(--butter)" />
        <Sparkle aria-hidden className="pop anim-twinkle absolute -top-16 right-2 w-10 text-ink sm:-top-6" fillColor="var(--white)" />
        <h2 id="inquire-title" className="rise font-display text-huge font-semibold">
          Found your next nail mood?
        </h2>
        <p className="rise mx-auto mt-5 max-w-lg text-[1.12rem]" style={{ "--i": 1 } as React.CSSProperties}>
          Send Furugh the design you love and say hi. Tip: tap <strong>&ldquo;I want this one&rdquo;</strong> on any photo to bring it here.
        </p>

        {chosen && (
          <div className="rise mx-auto mt-8 flex max-w-md items-center gap-4 rounded-[24px] border border-line bg-panel p-3 text-left">
            <div className="w-20 shrink-0 overflow-hidden rounded-[14px] border border-line">
              <ArtImage art={chosen} sizes="80px" decorative />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-hand text-lg font-bold leading-none">You&rsquo;re asking about</p>
              <p className="truncate font-display text-lg font-semibold">{ref}</p>
              <div className="mt-1 flex gap-3 text-sm">
                <button type="button" onClick={copy} className="min-h-11 font-semibold underline decoration-2 underline-offset-4">
                  {copied ? "Copied!" : "Copy a message"}
                </button>
                <button type="button" onClick={onClear} className="min-h-11 text-ink-soft underline underline-offset-4">
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="rise mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ "--i": 2 } as React.CSSProperties}>
          {instagramUrl && (
            <a className="btn-ink" href={instagramUrl} target="_blank" rel="noopener noreferrer">
              Message on Instagram{instagramHandle ? ` ${instagramHandle}` : ""}
            </a>
          )}
          {email && (
            <a
              className={instagramUrl ? "btn-line" : "btn-ink"}
              href={`mailto:${email}?subject=${encodeURIComponent(ref ? `Nail inquiry: ${ref}` : "Nail inquiry")}`}
            >
              Email an inquiry
            </a>
          )}
          {bookingUrl && (
            <a className="btn-line" href={bookingUrl} target="_blank" rel="noopener noreferrer">
              Request an appointment
            </a>
          )}
          {!hasAny && (
            <p className="sticker px-5 py-3 font-semibold">
              Instagram &amp; contact links are coming soon.
            </p>
          )}
        </div>
        {preferredContact && (
          <p className="rise mt-6 text-sm" style={{ "--i": 3 } as React.CSSProperties}>
            Preferred contact: {preferredContact}
          </p>
        )}
      </Reveal>
    </section>
  );
}
