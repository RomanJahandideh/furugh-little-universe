"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { ArtImage } from "@/components/gallery/ArtImage";
import { STAGES } from "@/components/stage/Stage";
import type { PaintingPhoto } from "@/lib/paintings";

const FLOOR_COLOURS = [STAGES.oxblood.bg, STAGES.slate.bg, STAGES.plum.bg, STAGES.olive.bg, STAGES.char.bg];

const NOTCHES_PER_FLOOR = 5;

/**
 * "The Elevator": a pinned section where scrolling winches a lift through her
 * best pieces. The car travels in heavy notches, holds at each floor, and
 * lands with a small mechanical bump. Reduced-motion visitors get a list.
 */
export function Elevator({ floors }: { floors: PaintingPhoto[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const n = floors.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Hold at each floor for a stretch of scrolling, travel between them.
  const inputs: number[] = [];
  const outputs: number[] = [];
  const hold = 0.3 / n;
  floors.forEach((_, i) => {
    const c = n === 1 ? 0.5 : i / (n - 1);
    inputs.push(Math.max(0, c - hold), Math.min(1, c + hold));
    outputs.push(i, i);
  });
  const raw = useTransform(scrollYProgress, inputs, outputs);
  // Winch: move in notches, each caught by an under-damped spring.
  const notched = useTransform(raw, (f) => Math.round(f * NOTCHES_PER_FLOOR) / NOTCHES_PER_FLOOR);
  const pos = useSpring(notched, { stiffness: 230, damping: 14, mass: 1.15 });
  const trackY = useTransform(pos, (p) => `${-p * 100}%`);
  // The whole car shudders very slightly as it travels.
  const shake = useTransform(pos, (p) => Math.sin(p * Math.PI * 2 * NOTCHES_PER_FLOOR) * 1.5);
  // Each floor has its own wall colour; it shifts as the car travels.
  const colours = floors.map((_, i) => FLOOR_COLOURS[i % FLOOR_COLOURS.length]);
  const bg = useTransform(pos, floors.map((_, i) => i), colours);

  // While the lift is on screen, the menu bar takes the current floor colour.
  useMotionValueEvent(bg, "change", (c) => {
    const s = scrollYProgress.get();
    if (s > 0 && s < 1) document.documentElement.style.setProperty("--stage", c);
  });

  const [floor, setFloor] = useState(0);
  useMotionValueEvent(pos, "change", (p) => {
    const f = Math.min(n - 1, Math.max(0, Math.round(p)));
    if (f !== floor) setFloor(f);
  });

  if (reduce) {
    return (
      <section aria-labelledby="elevator-title" data-stage={STAGES.oxblood.bg} data-fg="light" className="bg-[#6e2a20] text-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <p className="label text-gold">Floor by floor</p>
          <h2 id="elevator-title" className="font-black mt-4 text-[clamp(2.4rem,7vw,4.5rem)] text-gold">Take the lift through the work</h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2">
            {floors.map((f) => (
              <li key={f.id}>
                <ArtImage art={f} sizes="(min-width: 640px) 45vw, 92vw" className="aspect-[4/5] object-cover" />
                <p className="font-display mt-3 text-2xl">{f.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  const current = floors[floor];
  return (
    <section ref={ref} aria-labelledby="elevator-title" data-stage={colours[0]} data-fg="light" className="relative text-paper" style={{ height: `${n * 85 + 40}svh` }}>
      <motion.div style={{ backgroundColor: bg }} className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-4 px-5 pt-[calc(var(--nav-h)+0.75rem)] sm:px-8 md:grid-cols-[auto_1fr_1.1fr] md:gap-12 md:pt-[var(--nav-h)]">
          {/* Giant sideways title of the current floor (desktop) */}
          <div aria-hidden className="hidden h-[74svh] overflow-hidden md:order-1 md:flex md:items-end">
            <span key={current.id} className="vertical floor-tick font-black block max-h-full text-[clamp(3.5rem,9vh,7rem)] text-gold">
              {current.title}
            </span>
          </div>

          {/* Control panel */}
          <div className="order-2 md:order-2">
            <p className="label text-gold">Floor by floor</p>
            <h2 id="elevator-title" className="font-display mt-2 text-[1.6rem] leading-[1.05] md:mt-3 md:text-[clamp(2rem,3.6vw,3rem)]">
              Take the lift through the work
            </h2>

            <div className="mt-4 flex items-end gap-6 md:mt-10">
              <div className="overflow-hidden leading-none">
                <span key={floor} className="floor-tick font-black block text-[3.6rem] leading-none text-gold tabular-nums md:text-[6.5rem]">
                  {String(floor + 1).padStart(2, "0")}
                </span>
              </div>
              <span className="label pb-2 text-paper/50 md:pb-4">/ {String(n).padStart(2, "0")}</span>
              <ol className="ml-auto flex flex-col-reverse gap-1.5 pb-2 md:pb-4" aria-label="Floors">
                {floors.map((f, i) => (
                  <li key={f.id} className={`h-[3px] transition-all duration-500 ${i === floor ? "w-8 bg-gold" : "w-5 bg-paper/25"}`} aria-current={i === floor ? "step" : undefined}>
                    <span className="sr-only">{f.title}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-3 min-h-[4.5rem] border-t border-paper/15 pt-4 md:mt-6 md:min-h-[6.5rem]" aria-live="polite">
              <p key={current.id} className="floor-tick">
                <span className="font-display block text-[1.45rem] leading-tight sm:text-3xl">{current.title}</span>
                {current.caption && <span className="mt-1 block text-paper/60">{current.caption}</span>}
              </p>
            </div>
            <div className="mt-2 hidden md:block">
              <Link href="/decorative-painting/" data-cursor="Enter" className="btn bg-gold text-char hover:brightness-105">
                See every floor <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* The car: a window the shaft is winched through. */}
          <motion.div style={{ x: shake }} className="order-1 md:order-3">
            <div className="relative mx-auto aspect-[4/5] max-h-[46svh] w-full overflow-hidden bg-black md:max-h-[74svh]">
              <motion.ul style={{ y: trackY }} className="absolute inset-x-0 top-0 h-full">
                {floors.map((f, i) => (
                  <li key={f.id} className="absolute inset-x-0 h-full" style={{ top: `${i * 100}%` }}>
                    <ArtImage art={f} sizes="(min-width: 768px) 45vw, 92vw" priority={i < 2} decorative className="h-full object-cover" />
                    {/* Floor slab between pieces */}
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-4 bg-black/80" />
                  </li>
                ))}
              </motion.ul>
              <span aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.45)]" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
