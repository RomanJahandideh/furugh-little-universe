"use client";

import { useEffect, useRef } from "react";
import { ArtImage } from "@/components/gallery/ArtImage";
import type { PaintingPhoto } from "@/lib/paintings";

/** Full-size view of one painting photo, built on the native <dialog>. */
export function PaintingLightbox({
  list,
  index,
  onClose,
  onNavigate,
  onAsk,
}: {
  list: PaintingPhoto[];
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
  onAsk: (p: PaintingPhoto) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const open = index !== null;
  const p = open ? list[index] : null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && d.open) d.close();
    if (!open) document.documentElement.style.overflow = "";
  }, [open]);

  const go = (step: number) => index !== null && onNavigate((index + step + list.length) % list.length);

  return (
    <dialog
      ref={ref}
      className="art-dialog"
      aria-labelledby="painting-title"
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {p && (
        <div className="mx-auto flex min-h-full max-w-6xl flex-col px-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6">
          <div className="flex items-center justify-between py-2">
            <p className="label text-gold">
              {index! + 1} / {list.length}
            </p>
            <button type="button" onClick={onClose} className="grid h-12 w-12 place-items-center rounded-full border border-line bg-panel text-2xl" aria-label="Close">
              &times;
            </button>
          </div>
          <div className="grid flex-1 items-center gap-6 lg:grid-cols-[1.5fr_1fr]">
            <div
              style={{ touchAction: "pan-y pinch-zoom" }}
              onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
              onTouchEnd={(e) => {
                const s = touch.current;
                touch.current = null;
                if (!s) return;
                const dx = e.changedTouches[0].clientX - s.x;
                const dy = e.changedTouches[0].clientY - s.y;
                if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) go(dx < 0 ? 1 : -1);
              }}
            >
              <div className="paper-panel mx-auto w-fit max-w-full p-2">
                <ArtImage key={p.id} art={p} sizes="(min-width: 1024px) 60vw, 100vw" priority fill={false} className="h-auto max-h-[72dvh] w-auto max-w-full" />
              </div>
            </div>
            <div className="paper-panel p-6 sm:p-8">
              <h2 id="painting-title" className="font-display h-card">{p.title}</h2>
              {p.caption && <p className="mt-3 text-[1.05rem]">{p.caption}</p>}
              <p className="mt-3 text-sm text-ink-soft">{p.alt}</p>
              <button type="button" className="btn btn-dark mt-6 w-full" onClick={() => onAsk(p)}>
                Ask about a piece like this
              </button>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <button type="button" className="btn btn-outline" onClick={() => go(-1)}>
                  <span aria-hidden>&larr;</span> Previous
                </button>
                <button type="button" className="btn btn-outline" onClick={() => go(1)}>
                  Next <span aria-hidden>&rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
