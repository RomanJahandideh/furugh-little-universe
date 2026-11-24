"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Footer, PageHeader } from "@/components/common/Chrome";
import { moods, type ColorId, type MoodId } from "@/data/taxonomy";
import type { GalleryArtwork } from "@/lib/artworks";
import { ArtworkDialog } from "./ArtworkDialog";
import { Discovery } from "./Discovery";
import { GalleryGrid } from "./GalleryGrid";
import { NailContact } from "./NailContact";

export function NailsExperience({ artworks }: { artworks: GalleryArtwork[] }) {
  const [mood, setMood] = useState<MoodId | null>(null);
  const [colors, setColors] = useState<ColorId[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [chosen, setChosen] = useState<GalleryArtwork | null>(null);
  const galleryTop = useRef<HTMLElement>(null);

  const moodMatch = useCallback((a: GalleryArtwork, m: MoodId | null) => {
    if (!m) return true;
    const match = moods.find((x) => x.id === m)!.match as readonly string[];
    return a.categories.some((c) => match.includes(c));
  }, []);
  const colorMatch = (a: GalleryArtwork, cs: ColorId[]) => cs.length === 0 || cs.some((c) => a.colors.includes(c));

  const list = useMemo(() => artworks.filter((a) => moodMatch(a, mood) && colorMatch(a, colors)), [artworks, mood, colors, moodMatch]);

  // Counts reflect the other filter, so visitors never pick a dead end.
  const counts = useMemo(() => {
    const out: Record<string, number> = {};
    for (const m of moods) out[m.id] = artworks.filter((a) => moodMatch(a, m.id) && colorMatch(a, colors)).length;
    return out;
  }, [artworks, colors, moodMatch]);
  const colorCounts = useMemo(() => {
    const out: Record<string, number> = {};
    for (const a of artworks) if (moodMatch(a, mood)) for (const c of a.colors) out[c] = (out[c] ?? 0) + 1;
    return out;
  }, [artworks, mood, moodMatch]);

  const settle = () => {
    const el = galleryTop.current;
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ block: "start" });
  };

  const openArt = (id: string) => setOpenIndex(list.findIndex((a) => a.id === id));
  const closeArt = () => {
    const a = openIndex !== null ? list[openIndex] : null;
    setOpenIndex(null);
    // Land back exactly on the design you were viewing (it may differ after swiping).
    if (a) requestAnimationFrame(() => document.getElementById(`design-${a.id}`)?.focus({ preventScroll: false }));
  };
  const inquire = (a: GalleryArtwork) => {
    setChosen(a);
    setOpenIndex(null);
    // Wait for the dialog to close (it restores focus) before travelling down.
    window.setTimeout(() => document.getElementById("inquire")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  return (
    <main id="main" className="overflow-x-clip">
      <PageHeader
        kicker="Path two"
        title="Nail Artistry"
        intro={`Nail technician and artist. ${artworks.length} original, hand-painted designs: filter by style or colour, and tap any photo for details.`}
      />

      <section id="gallery" ref={galleryTop} aria-label="Nail art gallery" className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-20 pt-12 sm:px-8 sm:pt-16">
        <div className="mb-6">
          <Discovery
            mood={mood}
            colors={colors}
            counts={counts}
            colorCounts={colorCounts}
            total={artworks.length}
            shown={list.length}
            onMood={(m) => {
              setMood(m);
              settle();
            }}
            onColor={(c) => {
              setColors((cs) => (cs.includes(c) ? cs.filter((x) => x !== c) : [...cs, c]));
              settle();
            }}
            onReset={() => {
              setMood(null);
              setColors([]);
              settle();
            }}
          />
        </div>

        {list.length > 0 ? (
          <GalleryGrid list={list} onOpen={openArt} />
        ) : (
          <div className="mx-auto max-w-md py-16 text-center">
            <p className="font-display text-2xl">No designs match that combination.</p>
            <button
              type="button"
              className="btn btn-dark mt-6"
              onClick={() => {
                setMood(null);
                setColors([]);
              }}
            >
              Show all designs
            </button>
          </div>
        )}
      </section>

      <NailContact chosen={chosen} onClear={() => setChosen(null)} />

      <ArtworkDialog list={list} index={openIndex} onClose={closeArt} onNavigate={setOpenIndex} onInquire={inquire} />

      <Footer />
    </main>
  );
}
