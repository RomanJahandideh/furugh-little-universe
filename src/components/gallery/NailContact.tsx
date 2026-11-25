"use client";

import { ContactSection } from "@/components/common/Chrome";
import { siteConfig } from "@/data/site-config";
import type { GalleryArtwork } from "@/lib/artworks";
import { ArtImage } from "./ArtImage";

/** Nail inquiries: the shared email form, pre-filled with the chosen design. */
export function NailContact({ chosen, onClear }: { chosen: GalleryArtwork | null; onClear: () => void }) {
  const { instagramUrl, instagramHandle, bookingUrl } = siteConfig.nails;
  const ref = chosen ? `Design No. ${String(chosen.number).padStart(2, "0")}: "${chosen.title}"` : null;

  return (
    <ContactSection
      id="inquire"
      title="Like a design? Ask about it."
      intro="Open any photo and tap “Ask about this design”, or just write below. Your message goes straight to Forough."
      subject={ref ? `Nail art inquiry: ${ref}` : "Nail art inquiry from furugh.com"}
      initialMessage={ref ? `Hi Forough! I'd love nails like ${ref}.` : ""}
      aside={
        <>
          {chosen && (
            <div className="mt-7 flex max-w-md items-center gap-4 border border-line bg-panel p-3">
              <div className="w-16 shrink-0 overflow-hidden">
                <ArtImage art={chosen} sizes="64px" decorative />
              </div>
              <div className="min-w-0 flex-1">
                <p className="label text-ink-soft">You&rsquo;re asking about</p>
                <p className="truncate font-medium">{ref}</p>
                <button type="button" onClick={onClear} className="min-h-11 text-sm text-ink-soft underline underline-offset-4">
                  Clear
                </button>
              </div>
            </div>
          )}
          {(instagramUrl || bookingUrl) && (
            <div className="mt-7 flex flex-wrap gap-3">
              {instagramUrl && (
                <a className="btn btn-dark" href={instagramUrl} target="_blank" rel="noopener noreferrer">
                  Instagram{instagramHandle ? ` ${instagramHandle}` : ""}
                </a>
              )}
              {bookingUrl && (
                <a className="btn btn-outline" href={bookingUrl} target="_blank" rel="noopener noreferrer">
                  Request an appointment
                </a>
              )}
            </div>
          )}
        </>
      }
    />
  );
}
