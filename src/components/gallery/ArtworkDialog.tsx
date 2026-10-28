"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { categoryLabel, colorFamilies, colorLabel } from "@/data/taxonomy";
import type { GalleryArtwork } from "@/lib/artworks";
import { ArtImage } from "./ArtImage";

const slide = {
  enter: (d: number) => ({ opacity: 0, x: d * 60, rotate: d * 2 }),
  center: { opacity: 1, x: 0, rotate: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -60, rotate: d * -2 }),
};

/**
 * Detail view built on the native <dialog>: focus is trapped and restored,
 * Esc closes, and the page behind keeps its scroll position. Swipe left/right
 * (or arrow keys, or the buttons) to move through the current selection.
 */
export function ArtworkDialog({
  list,
  index,
  onClose,
  onNavigate,
  onInquire,
}: {
  list: GalleryArtwork[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
  onInquire: (art: GalleryArtwork) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [dir, setDir] = useState(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const open = index !== null;
  const art = open ? list[index] : null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && d.open) {
      d.close();
    }
    if (!open) document.documentElement.style.overflow = "";
  }, [open]);

  // Warm the neighbours so next/previous feel instant.
  useEffect(() => {
    if (index === null) return;
    for (const n of [index - 1, index + 1]) {
      const a = list[(n + list.length) % list.length];
      if (a) {
        const img = new Image();
        img.sizes = "100vw";
        img.srcset = a.srcSet;
      }
    }
  }, [index, list]);

  const go = (step: number) => {
    if (index === null || list.length < 2) return;
    setDir(step);
    onNavigate((index + step + list.length) % list.length);
  };

  const no = art ? String(art.number).padStart(2, "0") : "";

  return (
    <dialog
      ref={ref}
      className="art-dialog"
      aria-labelledby="art-title"
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {art && (
        <div className="mx-auto flex min-h-full max-w-5xl flex-col px-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6">
          <div className="sticky top-0 z-10 flex items-center justify-between gap-3 py-2">
            <p className="sticker px-3 py-1 font-hand text-lg font-bold">
              No. {no} <span className="text-ink-soft">/ {String(list.length).padStart(2, "0")}</span>
            </p>
            <button type="button" onClick={onClose} className="sticker grid h-12 w-12 place-items-center text-2xl font-bold" aria-label="Close and return to the gallery">
              &times;
            </button>
          </div>

          <div className="grid flex-1 gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div
              className="relative select-none"
              style={{ touchAction: "pan-y pinch-zoom" }}
              onTouchStart={(e) => {
                const t = e.touches[0];
                touch.current = { x: t.clientX, y: t.clientY };
              }}
              onTouchEnd={(e) => {
                const s = touch.current;
                touch.current = null;
                if (!s) return;
                const t = e.changedTouches[0];
                const dx = t.clientX - s.x;
                const dy = t.clientY - s.y;
                if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) go(dx < 0 ? 1 : -1);
              }}
            >
              <AnimatePresence mode="popLayout" initial={false} custom={dir}>
                <motion.div
                  key={art.id}
                  custom={dir}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 320, damping: 32 }}
                  className="mx-auto w-fit max-w-full overflow-hidden rounded-[22px] border-2 border-ink bg-white p-1.5 shadow-[6px_6px_0_var(--ink)]"
                >
                  <ArtImage
                    art={art}
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    priority
                    fill={false}
                    className="h-auto max-h-[68dvh] w-auto max-w-full rounded-[16px]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="rounded-[28px] border-2 border-ink bg-white p-5 sm:p-7">
              <h2 id="art-title" className="font-display text-[clamp(1.8rem,6vw,2.6rem)] font-semibold leading-none">
                {art.title}
              </h2>
              {art.note && <p className="mt-2 font-hand text-2xl font-bold text-ink-soft">{art.note}</p>}
              <p className="mt-3 text-[0.98rem] text-ink-soft">{art.alt}</p>

              <dl className="mt-5 space-y-3 text-[0.95rem]">
                {art.categories.length > 0 && (
                  <div>
                    <dt className="font-bold">Style</dt>
                    <dd className="mt-1 flex flex-wrap gap-1.5">
                      {art.categories.map((c) => (
                        <span key={c} className="rounded-full border-2 border-ink px-2.5 py-0.5 text-sm">
                          {categoryLabel(c)}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
                {art.colors.length > 0 && (
                  <div>
                    <dt className="font-bold">Colors</dt>
                    <dd className="mt-1 flex flex-wrap gap-1.5">
                      {art.colors.map((c) => (
                        <span key={c} className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink px-2.5 py-0.5 text-sm">
                          <span aria-hidden className="h-3.5 w-3.5 rounded-full border border-ink" style={{ background: colorFamilies.find((f) => f.id === c)?.swatch }} />
                          {colorLabel(c)}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
                {(art.finish || art.shape) && (
                  <div className="flex gap-8">
                    {art.finish && (
                      <div>
                        <dt className="font-bold">Finish</dt>
                        <dd>{art.finish}</dd>
                      </div>
                    )}
                    {art.shape && (
                      <div>
                        <dt className="font-bold">Shape</dt>
                        <dd>{art.shape}</dd>
                      </div>
                    )}
                  </div>
                )}
              </dl>

              <button type="button" className="btn-ink mt-6 w-full" onClick={() => onInquire(art)}>
                I want this one
              </button>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button type="button" className="btn-line" onClick={() => go(-1)} disabled={list.length < 2}>
                  <span aria-hidden>&larr;</span> Previous
                </button>
                <button type="button" className="btn-line" onClick={() => go(1)} disabled={list.length < 2}>
                  Next <span aria-hidden>&rarr;</span>
                </button>
              </div>
              <p className="mt-3 text-center text-xs text-ink-soft">Tip: swipe the photo, or use the arrow keys.</p>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
