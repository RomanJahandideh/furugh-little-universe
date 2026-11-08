"use client";

import { AnimatePresence, motion } from "motion/react";
import type { GalleryArtwork } from "@/lib/artworks";
import { ArtImage } from "./ArtImage";

/** A clean masonry grid. Every photo keeps its own proportions. */
export function GalleryGrid({ list, onOpen }: { list: GalleryArtwork[]; onOpen: (id: string) => void }) {
  return (
    <ul className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
      <AnimatePresence initial={false}>
        {list.map((a, i) => (
          <motion.li
            key={a.id}
            layout="position"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, delay: Math.min(i, 8) * 0.03 }}
            className="mb-3 break-inside-avoid sm:mb-4"
          >
            <button
              type="button"
              id={`design-${a.id}`}
              onClick={() => onOpen(a.id)}
              aria-label={`Design No. ${a.number}: ${a.title}. Open details`}
              className="group block w-full text-left"
            >
              <span className="block overflow-hidden rounded-[14px] bg-sand">
                <ArtImage
                  art={a}
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 32vw, 48vw"
                  priority={i < 2}
                  className="transition-transform duration-700 [transition-timing-function:var(--ease-out)] group-hover:scale-[1.04]"
                />
              </span>
              <span className="mt-2 flex items-baseline justify-between gap-2 px-0.5">
                <span className="text-[0.95rem] font-medium leading-tight">{a.title}</span>
                <span className="label shrink-0 text-ink-soft">No.{String(a.number).padStart(2, "0")}</span>
              </span>
            </button>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
