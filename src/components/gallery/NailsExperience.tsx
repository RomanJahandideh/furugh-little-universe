"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useMemo, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Marquee, ScrollLit, Tilt3D } from "@/components/animations/Motion";
import { NumberedTabs } from "@/components/animations/NumberedTabs";
import { Reveal } from "@/components/animations/Reveal";
import { Hand, Heart, PolishBottle, Smile, Sparkle, Squiggle } from "@/components/illustrations/Doodles";
import { BigFooter } from "@/components/landing/Landing";
import { siteConfig } from "@/data/site-config";
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

  // The hero photo is chosen in site-config.ts (falls back to the first featured design).
  const hero = artworks.find((a) => a.id === siteConfig.nails.heroArtworkId) ?? artworks.find((a) => a.featured) ?? artworks[0];
  const filtered = mood !== null || colors.length > 0;

  return (
    <main id="main" className="overflow-x-clip">
      <NailsHero hero={hero} total={artworks.length} />

      <Marquee
        className="bg-pink py-4 font-display text-[clamp(1.4rem,5vw,2.6rem)] uppercase text-char"
        items={["Minimal", "French tips", "Chrome", "Floral", "Cute doodles", "Glitter", "Bold color", "Seasonal"]}
      />

      <section aria-label="About the art" className="mx-auto max-w-6xl px-4 py-20 sm:px-8 sm:py-32">
        <p className="label-mono mb-6 text-ink-soft">(Not just nails)</p>
        <ScrollLit
          as="p"
          className="font-display text-statement"
          accent={["tiny", "hand"]}
          text={`${artworks.length} designs, each one a tiny work of art painted by hand, from milky minimal sets to pop-art florals and full chrome.`}
        />
      </section>

      <Collections
        artworks={artworks}
        onSeeAll={(m) => {
          setMood(m);
          setColors([]);
          setBurst((b) => b + 1);
          requestAnimationFrame(() => galleryTop.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
        }}
      />

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
            <p className="mt-4 font-display text-2xl uppercase">No designs match that combo yet.</p>
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

      <BigFooter line="Little details. Loud personalities." />
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
    <section className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-[calc(var(--nav-h)+env(safe-area-inset-top)+1.25rem)] sm:px-8 lg:min-h-[94svh] lg:grid-cols-[1.15fr_1fr]">
      <Reveal className="relative z-10">
        <p className="rise label-mono flex items-center gap-2 text-ink-soft">
          <span className="h-2 w-2 rounded-full bg-pink" /> Furugh Does Things &mdash; No. 02
        </p>
        <h1 className="font-display text-mega mt-4 uppercase">
          <span className="rise block" style={v({ "--i": 1 })}>
            Tiny
          </span>
          <span className="rise block text-pink" style={v({ "--i": 2 })}>
            Canvases.
          </span>
          <span className="rise relative mt-2 block text-huge" style={v({ "--i": 3 })}>
            Big{" "}
            <span className="relative inline-block">
              Personalities.
              <Squiggle className="absolute -bottom-3 left-0 h-4 w-full text-pink" style={v({ strokeWidth: 3, "--d": "0.7s" })} />
            </span>
          </span>
        </h1>
        <p className="rise mt-8 max-w-md text-[1.12rem] text-ink-soft" style={v({ "--i": 4 })}>
          Not just nails. {total} tiny works of art, painted by hand. Find your next nail obsession.
        </p>
        <div className="rise mt-7 flex flex-wrap gap-3" style={v({ "--i": 5 })}>
          <a href="#collections" className="btn-ink">
            Start exploring
          </a>
          <a href="#inquire" className="btn-line">
            Book a set
          </a>
        </div>
      </Reveal>

      <Reveal className="relative mx-auto w-[84%] max-w-[460px] lg:w-full">
        <span aria-hidden className="glow absolute -inset-[12%] rounded-full opacity-70 blur-3xl" />
        <Tilt3D from={16} max={9}>
          <figure className="pop relative rounded-[26px] border border-line bg-panel p-2">
            <div className="overflow-hidden rounded-[19px]">
              <ArtImage art={hero} sizes="(min-width: 1024px) 40vw, 84vw" priority />
            </div>
            <figcaption className="flex items-baseline gap-2 px-2 pb-1 pt-3">
              <span className="label-mono text-ink-soft">No.{String(hero.number).padStart(2, "0")}</span>
              <span className="font-display text-lg uppercase">{hero.title}</span>
            </figcaption>
          </figure>
        </Tilt3D>
        <div aria-hidden className="absolute -left-8 -top-10 w-[28%] -rotate-[24deg] sm:-left-14">
          <Hand className="w-full text-ink" nails={HERO_NAILS[i]} draw={false} />
        </div>
        <PolishBottle aria-hidden className="pop anim-wobble absolute -right-6 -top-8 w-[18%] text-ink" polish="var(--coral)" style={v({ "--i": 3 })} />
        <Heart aria-hidden className="pop anim-float absolute -right-4 bottom-[18%] w-[12%] text-ink" fillColor="var(--pink)" style={v({ "--i": 4 })} />
      </Reveal>
    </section>
  );
}

const COLLECTIONS: { mood: MoodId; label: string; blurb: string; glow: string[] }[] = [
  { mood: "minimal", label: "Minimal", blurb: "Clean lines, milky tones, one small detail. Quiet, but never boring.", glow: ["var(--mint)", "var(--sand)", "var(--lilac)"] },
  { mood: "classic", label: "French", blurb: "The classic tip, re-drawn: micro lines, glitter halos and pops of color.", glow: ["var(--butter)", "var(--pink)", "var(--sand)"] },
  { mood: "shiny", label: "Shiny", blurb: "Chrome, cat-eye, gold leaf and glitter, for nails that catch every light.", glow: ["var(--lilac)", "#C9A646", "var(--mint)"] },
  { mood: "flower", label: "Floral", blurb: "Hand-painted petals, from tiny daisies to big pop-art blooms.", glow: ["var(--pink)", "var(--butter)", "var(--mint)"] },
  { mood: "cute", label: "Cute", blurb: "Bunnies, teddies, hearts and winks. Small doodles, big smiles.", glow: ["var(--coral)", "var(--pink)", "var(--butter)"] },
  { mood: "bold", label: "Bold", blurb: "Hot pink, neon, tiger stripes. The volume, all the way up.", glow: ["var(--coral)", "var(--pink)", "var(--lilac)"] },
];

/** Numbered collection tabs that play through real designs, like a slideshow. */
function Collections({ artworks, onSeeAll }: { artworks: GalleryArtwork[]; onSeeAll: (m: MoodId) => void }) {
  const sets = COLLECTIONS.map((c) => {
    const match = moods.find((m) => m.id === c.mood)!.match as readonly string[];
    const all = artworks.filter((a) => a.categories.some((x) => match.includes(x)));
    return { ...c, all, picks: [...all.filter((a) => a.featured), ...all.filter((a) => !a.featured)].slice(0, 5) };
  }).filter((c) => c.picks.length > 0);

  return (
    <section id="collections" aria-labelledby="collections-title" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal>
          <p className="rise label-mono text-ink-soft">
            <span className="text-pink">01</span> &mdash; Collections
          </p>
          <h2 id="collections-title" className="rise mt-4 font-display text-huge uppercase">
            Pick a <span className="marker">collection</span>
          </h2>
        </Reveal>
        <div className="mt-10 overflow-hidden rounded-[28px] border border-line bg-panel p-3 sm:p-5">
          <NumberedTabs
            label="Nail art collections"
            stepMs={3200}
            tabs={sets.map((c) => ({
              id: c.mood,
              label: c.label,
              steps: c.picks.length,
              render: (step, goTo) => {
                const art = c.picks[Math.min(step, c.picks.length - 1)];
                return (
                  <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr] lg:gap-8">
                    <div className="on-light flex flex-col justify-between gap-6 rounded-[22px] bg-sand p-6 sm:p-8">
                      <div>
                        <p className="label-mono text-ink-soft">{c.all.length} designs</p>
                        <h3 className="mt-3 font-display text-big uppercase">{c.label}</h3>
                        <p className="mt-4 text-[1.05rem]">{c.blurb}</p>
                      </div>
                      <div>
                        <ul className="flex gap-2" aria-label={`${c.label} highlights`}>
                          {c.picks.map((p, pi) => (
                            <li key={p.id} className="w-1/5">
                              <button
                                type="button"
                                onClick={() => goTo(pi)}
                                aria-pressed={pi === step}
                                aria-label={`Show ${p.title}`}
                                className={`block w-full overflow-hidden rounded-xl transition-[transform,opacity] duration-300 ${pi === step ? "-translate-y-1 opacity-100 ring-2 ring-char" : "opacity-60 hover:opacity-100"}`}
                              >
                                <ArtImage art={p} sizes="72px" decorative className="aspect-square object-cover" />
                              </button>
                            </li>
                          ))}
                        </ul>
                        <button type="button" onClick={() => onSeeAll(c.mood)} className="btn-ink mt-5 w-full sm:w-auto">
                          See all {c.all.length} {c.label.toLowerCase()} designs <span aria-hidden>&rarr;</span>
                        </button>
                      </div>
                    </div>
                    <div className="relative">
                      <span aria-hidden className="glow absolute inset-[6%] rounded-[30px] opacity-70 blur-2xl" style={v({ "--g1": c.glow[0], "--g2": c.glow[1], "--g3": c.glow[2] })} />
                      <Tilt3D from={10} max={6}>
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-[#1d1b19] sm:aspect-[5/4] lg:aspect-[4/5]">
                          <AnimatePresence initial={false}>
                            <motion.div
                              key={art.id}
                              className="absolute inset-0"
                              initial={{ opacity: 0, scale: 1.08 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            >
                              <ArtImage art={art} sizes="(min-width: 1024px) 40vw, 92vw" className="h-full object-cover" />
                            </motion.div>
                          </AnimatePresence>
                          <p className="absolute inset-x-3 bottom-3 flex items-baseline gap-2 rounded-xl bg-[color-mix(in_srgb,#0e0d0c_70%,transparent)] px-3 py-2 text-[#f3f0ea] backdrop-blur-md">
                            <span className="label-mono opacity-70">No.{String(art.number).padStart(2, "0")}</span>
                            <span className="font-display uppercase">{art.title}</span>
                          </p>
                        </div>
                      </Tilt3D>
                    </div>
                  </div>
                );
              },
            }))}
          />
        </div>
      </div>
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
