"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useMemo, useRef, useState, type CSSProperties } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { ArrowDown, Hand, Heart, PolishBottle, Smile, Sparkle, Squiggle } from "@/components/illustrations/Doodles";
import { moods, type ColorId, type MoodId } from "@/data/taxonomy";
import type { GalleryArtwork } from "@/lib/artworks";
import { ArtImage } from "./ArtImage";
import { ArtworkDialog } from "./ArtworkDialog";
import { Discovery } from "./Discovery";
import { NailContact } from "./NailContact";
import { Sketchbook } from "./Sketchbook";

const v = (o: Record<string, string | number>) => o as CSSProperties;

const HERO_NAILS = [
  ["var(--pink)", "var(--pink)", "var(--pink)", "var(--pink)", "var(--pink)"],
  ["var(--lilac)", "var(--mint)", "var(--butter)", "var(--coral)", "var(--pink)"],
  ["#B3172B", "#B3172B", "var(--white)", "#B3172B", "#B3172B"],
  ["var(--butter)", "var(--butter)", "var(--white)", "var(--butter)", "var(--butter)"],
  ["var(--ink)", "#C9A646", "var(--ink)", "#C9A646", "var(--ink)"],
  ["var(--mint)", "var(--lilac)", "var(--mint)", "var(--lilac)", "var(--mint)"],
];

export function NailsExperience({ artworks }: { artworks: GalleryArtwork[] }) {
  const [mood, setMood] = useState<MoodId | null>(null);
  const [colors, setColors] = useState<ColorId[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [chosen, setChosen] = useState<GalleryArtwork | null>(null);
  const [burst, setBurst] = useState(0);
  const galleryTop = useRef<HTMLDivElement>(null);

  const moodMatch = useCallback(
    (a: GalleryArtwork, m: MoodId | null) => {
      if (!m) return true;
      const match = moods.find((x) => x.id === m)!.match as readonly string[];
      return a.categories.some((c) => match.includes(c));
    },
    [],
  );
  const colorMatch = (a: GalleryArtwork, cs: ColorId[]) => cs.length === 0 || cs.some((c) => a.colors.includes(c));

  const list = useMemo(
    () => artworks.filter((a) => moodMatch(a, mood) && colorMatch(a, colors)),
    [artworks, mood, colors, moodMatch],
  );

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
    setBurst((b) => b + 1);
    const el = galleryTop.current;
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ block: "start" });
  };
  const pickMood = (m: MoodId | null) => {
    setMood(m);
    settle();
  };
  const toggleColor = (c: ColorId) => {
    setColors((cs) => (cs.includes(c) ? cs.filter((x) => x !== c) : [...cs, c]));
    settle();
  };
  const reset = () => {
    setMood(null);
    setColors([]);
    settle();
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

  // Showcase the second featured design so the gallery doesn't open with a repeat.
  const hero = artworks.filter((a) => a.featured)[1] ?? artworks[0];
  const filtered = mood !== null || colors.length > 0;

  return (
    <main id="main" className="overflow-x-clip">
      <NailsHero hero={hero} total={artworks.length} />

      <div ref={galleryTop} className="scroll-mt-[var(--nav-h)]">
        <Discovery
          mood={mood}
          colors={colors}
          counts={counts}
          colorCounts={colorCounts}
          total={artworks.length}
          shown={list.length}
          burst={burst}
          onMood={pickMood}
          onColor={toggleColor}
          onReset={reset}
        />
      </div>

      <section aria-label="Nail art sketchbook" className="pb-24 pt-6">
        {list.length > 0 ? (
          <Sketchbook list={list} interludes={!filtered || list.length >= 14} onOpen={openArt} />
        ) : (
          <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center">
            <Smile className="h-20 w-20 text-ink" draw={false} />
            <p className="mt-4 font-display text-2xl font-semibold">No designs match that combo yet.</p>
            <p className="mt-2 text-ink-soft">Try another mood or color, or see everything.</p>
            <button type="button" className="btn-ink mt-6" onClick={reset}>
              Show all designs
            </button>
          </div>
        )}
      </section>

      <NailContact chosen={chosen} onClear={() => setChosen(null)} />

      <FloatingFilter />

      <ArtworkDialog
        list={list}
        index={openIndex}
        onClose={closeArt}
        onNavigate={setOpenIndex}
        onInquire={inquire}
      />

      <footer className="border-t-2 border-ink px-4 py-10 text-center pb-[max(2.5rem,env(safe-area-inset-bottom))]">
        <p className="font-hand text-2xl">Little details. Loud personalities.</p>
        <p className="mt-2 text-sm text-ink-soft">All designs and photos &copy; {new Date().getFullYear()} Furugh</p>
      </footer>
    </main>
  );
}

function NailsHero({ hero, total }: { hero: GalleryArtwork; total: number }) {
  const { scrollY } = useScroll();
  const [i, setI] = useState(0);
  // The doodle hand repaints its nails as you scroll.
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = Math.floor(y / 260) % HERO_NAILS.length;
    if (next !== i) setI(next);
  });

  return (
    <section className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 pb-6 pt-[calc(var(--nav-h)+env(safe-area-inset-top)+1.25rem)] sm:px-8 lg:min-h-[92svh] lg:grid-cols-[1.1fr_1fr]">
      <Reveal className="relative z-10">
        <p className="rise sticker inline-flex -rotate-2 items-center gap-2 bg-pink px-4 py-1.5 font-hand text-[1.3rem] font-bold">
          <Sparkle className="h-5 w-5 text-ink" fillColor="var(--white)" draw={false} />
          Furugh Does Things: No. 2
        </p>
        <h1 className="font-display text-mega mt-5 font-semibold">
          <span className="rise block" style={v({ "--i": 1 })}>
            Tiny
          </span>
          <span className="rise block italic" style={v({ "--i": 2 })}>
            Canvases.
          </span>
          <span className="rise relative mt-2 block text-huge" style={v({ "--i": 3 })}>
            Big{" "}
            <span className="relative inline-block">
              Personalities.
              <Squiggle className="absolute -bottom-3 left-0 h-4 w-full text-pink" style={v({ strokeWidth: 3.5, "--d": "0.7s" })} />
            </span>
          </span>
        </h1>
        <p className="rise mt-7 max-w-md text-[1.12rem] text-ink-soft" style={v({ "--i": 4 })}>
          Not just nails. {total} tiny works of art, painted by hand. Find your next nail obsession.
        </p>
        <a href="#discover" className="rise mt-6 inline-flex min-h-11 items-center gap-2 font-hand text-xl" style={v({ "--i": 5 })}>
          Start exploring
          <ArrowDown className="anim-float h-10 w-5 text-ink" draw={false} />
        </a>
      </Reveal>

      <Reveal className="relative mx-auto w-[86%] max-w-[460px] lg:w-full">
        <figure className="pop relative rotate-3 rounded-[26px] border-2 border-ink bg-white p-2 shadow-[8px_8px_0_var(--ink)]">
          <div className="overflow-hidden rounded-[18px]">
            <ArtImage art={hero} sizes="(min-width: 1024px) 40vw, 86vw" priority />
          </div>
          <figcaption className="px-1 pt-2 font-hand text-xl font-bold">
            No. {String(hero.number).padStart(2, "0")} &middot; {hero.title}
          </figcaption>
          <span aria-hidden className="absolute -top-3 left-[12%] h-7 w-24 -rotate-6 border border-ink/20 bg-butter/90" />
        </figure>
        <div aria-hidden className="absolute -left-8 -top-10 w-[28%] -rotate-[24deg] sm:-left-14">
          <Hand className="w-full text-ink" nails={HERO_NAILS[i]} draw={false} />
        </div>
        <PolishBottle aria-hidden className="pop anim-wobble absolute -right-6 -top-8 w-[18%] text-ink" polish="var(--coral)" style={v({ "--i": 3 })} />
        <Heart aria-hidden className="pop anim-float absolute -right-4 bottom-[18%] w-[12%] text-ink" fillColor="var(--pink)" style={v({ "--i": 4 })} />
      </Reveal>
    </section>
  );
}

/** Once the filters scroll away, a small button brings them back. */
function FloatingFilter() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const el = document.getElementById("discover");
    const past = el ? y > el.offsetTop + el.offsetHeight : false;
    if (past !== show) setShow(past);
  });
  return (
    <a
      href="#discover"
      className={`btn-ink fixed z-40 !min-h-12 !px-5 text-sm transition-[opacity,transform] duration-300 ${show ? "" : "pointer-events-none translate-y-6 opacity-0"}`}
      style={{ right: "max(1rem, env(safe-area-inset-right))", bottom: "max(1rem, env(safe-area-inset-bottom))" }}
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
    >
      <Sparkle className="h-4 w-4 text-paper" fillColor="var(--pink)" draw={false} />
      Mood &amp; color
    </a>
  );
}
