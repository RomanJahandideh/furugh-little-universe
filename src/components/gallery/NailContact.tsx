"use client";

import { ContactForm } from "@/components/profile/ContactForm";
import { siteConfig } from "@/data/site-config";
import type { GalleryArtwork } from "@/lib/artworks";
import { ArtImage } from "./ArtImage";

/** Nail inquiries: the same email form, pre-filled with the chosen design. */
export function NailContact({ chosen, onClear }: { chosen: GalleryArtwork | null; onClear: () => void }) {
  const { instagramUrl, instagramHandle, bookingUrl } = siteConfig.nails;
  const ref = chosen ? `Design No. ${String(chosen.number).padStart(2, "0")}: "${chosen.title}"` : null;

  return (
    <section id="inquire" aria-labelledby="inquire-title" className="scroll-mt-24 px-4 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-[24px] bg-ink px-6 py-12 text-paper sm:px-12 sm:py-16 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <h2 id="inquire-title" className="font-display h-section">Like a design? Ask about it.</h2>
          <p className="mt-4 max-w-md text-paper/75">
            Open any photo and tap <strong className="text-paper">&ldquo;Ask about this design&rdquo;</strong>, or just write below. Your message goes straight to Forough.
          </p>

          {chosen && (
            <div className="mt-8 flex max-w-md items-center gap-4 rounded-[16px] bg-white/10 p-3">
              <div className="w-16 shrink-0 overflow-hidden rounded-[10px]">
                <ArtImage art={chosen} sizes="64px" decorative />
              </div>
              <div className="min-w-0 flex-1">
                <p className="label text-paper/60">You&rsquo;re asking about</p>
                <p className="truncate font-medium">{ref}</p>
                <button type="button" onClick={onClear} className="min-h-11 text-sm text-paper/70 underline underline-offset-4">
                  Clear
                </button>
              </div>
            </div>
          )}

          {(instagramUrl || bookingUrl) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {instagramUrl && (
                <a className="btn btn-light" href={instagramUrl} target="_blank" rel="noopener noreferrer">
                  Instagram{instagramHandle ? ` ${instagramHandle}` : ""}
                </a>
              )}
              {bookingUrl && (
                <a className="btn btn-ghost-light" href={bookingUrl} target="_blank" rel="noopener noreferrer">
                  Request an appointment
                </a>
              )}
            </div>
          )}
        </div>
        <ContactForm
          dark
          subject={ref ? `Nail art inquiry: ${ref}` : "Nail art inquiry from your website"}
          initialMessage={ref ? `Hi Forough! I'd love nails like ${ref}.` : ""}
        />
      </div>
    </section>
  );
}
