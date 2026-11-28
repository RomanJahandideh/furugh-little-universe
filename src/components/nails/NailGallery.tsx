"use client";

import { useMemo, useState } from "react";
import { ArtworkDialog } from "@/components/gallery/ArtworkDialog";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { colorFamilies, type CategoryId } from "@/data/taxonomy";
import type { GalleryArtwork } from "@/lib/artworks";

/** Gallery categories. A category with no matching photos is hidden automatically. */
const STYLES: { id: string; label: string; match?: CategoryId[]; ids?: string[] }[] = [
  { id: "all", label: "All Work" },
  { id: "hand-painted", label: "Hand Painted Art", match: ["floral", "abstract", "cute"] },
  { id: "french", label: "French Nails", match: ["french"] },
  { id: "ombre", label: "Ombré Nails", ids: ["img-9522"] },
  { id: "minimal", label: "Minimalist Designs", match: ["minimal"] },
  { id: "creative", label: "Creative Designs", match: ["bold", "glam", "chrome", "seasonal"] },
];
const SHAPES = ["Almond", "Oval", "Round", "Square"];

const styleMatch = (a: GalleryArtwork, id: string) => {
  const s = STYLES.find((x) => x.id === id)!;
  if (s.ids) return s.ids.includes(a.id);
  if (!s.match) return true;
  return a.categories.some((c) => s.match!.includes(c));
};

export function NailGallery({ artworks, onEnquire }: { artworks: GalleryArtwork[]; onEnquire: (a: GalleryArtwork) => void }) {
  const [style, setStyle] = useState("all");
  const [shape, setShape] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const list = useMemo(
    () => artworks.filter((a) => styleMatch(a, style) && (!shape || a.shape === shape) && (!color || a.colors.includes(color as never))),
    [artworks, style, shape, color],
  );
  const count = (f: (a: GalleryArtwork) => boolean) => artworks.filter(f).length;
  const styles = STYLES.filter((s) => count((a) => styleMatch(a, s.id)) > 0);
  const shapes = SHAPES.filter((s) => count((a) => a.shape === s) > 0);
  const colors = colorFamilies.filter((c) => count((a) => a.colors.includes(c.id)) > 0);
  const filtered = style !== "all" || shape || color;

  return (
    <div className="mt-12">
      <div className="space-y-5">
        <FilterRow label="Style">
          {styles.map((s) => (
            <button key={s.id} type="button" aria-pressed={style === s.id} onClick={() => setStyle(s.id)} className="nail-chip">
              {s.label}
            </button>
          ))}
        </FilterRow>
        <FilterRow label="Shape">
          {shapes.map((s) => (
            <button key={s} type="button" aria-pressed={shape === s} onClick={() => setShape(shape === s ? null : s)} className="nail-chip">
              {s}
            </button>
          ))}
        </FilterRow>
        <FilterRow label="Colour">
          {colors.map((c) => (
            <button key={c.id} type="button" aria-pressed={color === c.id} onClick={() => setColor(color === c.id ? null : c.id)} className="nail-chip">
              <span aria-hidden className="h-3.5 w-3.5 rounded-full border border-espresso/20" style={{ background: c.swatch }} />
              {c.label}
            </button>
          ))}
        </FilterRow>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-espresso/20 pt-4">
        <p aria-live="polite" className="text-sm text-espresso/70">
          Showing {list.length} of {artworks.length} sets
        </p>
        {filtered && (
          <button type="button" className="min-h-11 text-sm font-semibold underline underline-offset-4" onClick={() => { setStyle("all"); setShape(null); setColor(null); }}>
            Clear filters
          </button>
        )}
      </div>

      <div className="mt-6">
        {list.length > 0 ? (
          <GalleryGrid list={list} onOpen={(id) => setOpenIndex(list.findIndex((a) => a.id === id))} />
        ) : (
          <p className="py-16 text-center font-editorial text-3xl">No sets match that combination.</p>
        )}
      </div>

      <ArtworkDialog
        list={list}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
        onInquire={(a) => {
          setOpenIndex(null);
          onEnquire(a);
        }}
      />
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div role="group" aria-label={`Filter by ${label.toLowerCase()}`} className="flex items-start gap-4">
      <span className="label w-16 shrink-0 pt-4 text-espresso/60">{label}</span>
      <div className="no-scrollbar -mr-5 flex gap-2 overflow-x-auto pr-5 sm:mr-0 sm:flex-wrap sm:overflow-visible sm:pr-0">{children}</div>
    </div>
  );
}
