"use client";

import { LayoutGroup, motion } from "motion/react";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { Arrow, Heart, Sparkle, Star } from "@/components/illustrations/Doodles";
import type { GalleryArtwork } from "@/lib/artworks";
import { ArtImage } from "./ArtImage";
import { Interlude } from "./Interludes";

type Block =
  | { kind: "hero"; items: [GalleryArtwork] }
  | { kind: "pair"; items: [GalleryArtwork, GalleryArtwork] }
  | { kind: "single"; items: [GalleryArtwork]; side: "left" | "right" }
  | { kind: "interlude"; variant: number };

/**
 * Lays the artworks out like a sketchbook: featured designs get a full
 * page, the rest alternate between pairs and offset singles, with a small
 * illustrated intermission every few spreads.
 */
function buildBlocks(list: GalleryArtwork[], interludes: boolean): Block[] {
  const blocks: Block[] = [];
  const queue = [...list];
  let rhythm = 0;
  let placed = 0;
  let nextBreak = 9;
  let variant = 0;
  while (queue.length) {
    const a = queue.shift()!;
    // Featured designs get a full page, but never two in a row.
    if (a.featured && blocks.at(-1)?.kind !== "hero") {
      blocks.push({ kind: "hero", items: [a] });
      placed += 1;
    } else if (rhythm % 2 === 0 && queue.length && !queue[0].featured) {
      blocks.push({ kind: "pair", items: [a, queue.shift()!] });
      placed += 2;
      rhythm += 1;
    } else {
      blocks.push({ kind: "single", items: [a], side: rhythm % 4 === 1 ? "right" : "left" });
      placed += 1;
      rhythm += 1;
    }
    if (interludes && placed >= nextBreak && queue.length > 3) {
      blocks.push({ kind: "interlude", variant: variant++ });
      nextBreak = placed + 10;
    }
  }
  return blocks;
}

const tilt = (n: number) => (((n * 37) % 7) - 3) * 0.7;
const TAPE = ["var(--butter)", "var(--mint)", "var(--lilac)", "var(--pink)", "var(--coral)"];

export function Sketchbook({
  list,
  interludes,
  onOpen,
}: {
  list: GalleryArtwork[];
  interludes: boolean;
  onOpen: (id: string) => void;
}) {
  const blocks = buildBlocks(list, interludes);
  return (
    <LayoutGroup>
      <div className="mx-auto max-w-6xl space-y-14 px-4 sm:space-y-20 sm:px-8">
        {blocks.map((b, bi) => {
          if (b.kind === "interlude") return <Interlude key={`i-${b.variant}-${bi}`} variant={b.variant} />;
          if (b.kind === "hero")
            return (
              <div key={b.items[0].id} className="mx-auto w-full sm:w-[78%] lg:w-[62%]">
                <Tile art={b.items[0]} size="hero" sizes="(min-width: 1024px) 56vw, (min-width: 640px) 70vw, 92vw" onOpen={onOpen} />
              </div>
            );
          if (b.kind === "pair")
            return (
              <div key={b.items[0].id} className="grid grid-cols-2 gap-3 sm:gap-10">
                <Tile art={b.items[0]} size="pair" sizes="(min-width: 1024px) 36vw, 46vw" onOpen={onOpen} />
                <div className="mt-12 sm:mt-24">
                  <Tile art={b.items[1]} size="pair" sizes="(min-width: 1024px) 36vw, 46vw" onOpen={onOpen} />
                </div>
              </div>
            );
          return (
            <div key={b.items[0].id} className={`flex ${b.side === "right" ? "justify-end" : "justify-start"}`}>
              <div className="w-[82%] sm:w-[60%] lg:w-[46%]">
                <Tile art={b.items[0]} size="single" sizes="(min-width: 1024px) 42vw, (min-width: 640px) 56vw, 80vw" onOpen={onOpen} />
              </div>
            </div>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

function Tile({
  art,
  size,
  sizes,
  onOpen,
}: {
  art: GalleryArtwork;
  size: "hero" | "pair" | "single";
  sizes: string;
  onOpen: (id: string) => void;
}) {
  const n = art.number;
  const frame = size === "hero" ? "tape" : (["tape", "polaroid", "wobbly"] as const)[n % 3];
  const no = String(n).padStart(2, "0");

  return (
    <motion.div layoutId={art.id} layout="position" transition={{ type: "spring", stiffness: 260, damping: 32 }}>
      <Reveal className="relative">
        <button
          type="button"
          id={`design-${art.id}`}
          onClick={() => onOpen(art.id)}
          aria-label={`Design No. ${no}: ${art.title}. Open details`}
          className="rise rise3d group relative block w-full text-left transition-transform duration-500 [transition-timing-function:var(--ease-bounce)] hover:!rotate-0 hover:-translate-y-1"
          style={{ rotate: `${tilt(n)}deg`, "--r0": `${tilt(n) * 3}deg` } as CSSProperties}
        >
          <figure
            className={
              frame === "polaroid"
                ? "on-light bg-[#f6f3ec] p-2 pb-1 sm:p-3"
                : frame === "wobbly"
                  ? "wobbly-frame overflow-hidden bg-panel p-1.5"
                  : "relative rounded-[22px] border border-line bg-panel p-1.5"
            }
          >
            <div className={`overflow-hidden ${frame === "wobbly" ? "wobbly-frame !border-0" : frame === "tape" ? "rounded-[16px]" : ""}`}>
              <ArtImage
                art={art}
                sizes={sizes}
                className="transition-transform duration-700 [transition-timing-function:var(--ease-out)] group-hover:scale-[1.03]"
              />
            </div>
            <figcaption className={`flex items-baseline gap-2 px-1 ${size === "pair" ? "pt-2" : "pt-3"}`}>
              <span className="label-mono shrink-0 text-ink-soft">No.{no}</span>
              <span className={`font-display uppercase leading-[0.95] tracking-[-0.02em] ${size === "hero" ? "text-xl sm:text-2xl" : size === "pair" ? "text-[0.95rem] sm:text-lg" : "text-lg"}`}>
                {art.title}
              </span>
            </figcaption>
          </figure>

          {frame === "tape" && (
            <>
              <span aria-hidden className="absolute -top-3 left-[10%] h-6 w-20 -rotate-6 border border-ink/20 opacity-90" style={{ background: TAPE[n % 5] }} />
              <span aria-hidden className="absolute -top-2 right-[8%] h-6 w-16 rotate-[8deg] border border-ink/20 opacity-90" style={{ background: TAPE[(n + 2) % 5] }} />
            </>
          )}
          {size === "hero" && (
            <Star aria-hidden className="pop anim-twinkle absolute -right-3 -top-6 w-12 text-ink sm:w-16" fill="var(--butter)" style={{ "--i": 3 } as CSSProperties} />
          )}
          {size !== "hero" && n % 4 === 1 && (
            <Sparkle aria-hidden className="pop anim-twinkle absolute -right-2 -top-3 w-9 text-ink" fillColor="var(--pink)" style={{ "--i": 3 } as CSSProperties} />
          )}
          {size !== "hero" && n % 4 === 3 && (
            <Heart aria-hidden className="pop anim-float absolute -bottom-3 -left-2 w-9 text-ink" fillColor="var(--coral)" style={{ "--i": 3 } as CSSProperties} />
          )}
        </button>

        {art.note && (
          <p aria-hidden className={`pop mt-3 flex items-center gap-1 font-hand text-[1.35rem] font-bold leading-none ${size === "pair" ? "text-[1.1rem]" : ""}`} style={{ "--i": 4 } as CSSProperties}>
            <Arrow className="h-6 w-12 shrink-0 -scale-y-100 text-pink" style={{ strokeWidth: 3 }} />
            {art.note}
          </p>
        )}
      </Reveal>
    </motion.div>
  );
}
