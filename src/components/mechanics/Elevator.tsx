"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { ArtImage } from "@/components/gallery/ArtImage";
import type { PaintingPhoto } from "@/lib/paintings";
import { Gear } from "./Gear";

/**
 * "The Elevator": a pinned section where scrolling drives a lift through her
 * best pieces, one floor at a time. The car pauses at each floor (scroll keeps
 * moving, the car holds), and the gears only turn while it travels. Without
 * motion preferences it becomes a plain list.
 */
export function Elevator({ floors }: { floors: PaintingPhoto[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const n = floors.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Piecewise mapping: hold at each floor for a stretch, travel between them.
  const inputs: number[] = [];
  const outputs: number[] = [];
  const hold = 0.34 / n;
  floors.forEach((_, i) => {
    const c = n === 1 ? 0.5 : i / (n - 1);
    inputs.push(Math.max(0, c - hold), Math.min(1, c + hold));
    outputs.push(i, i);
  });
  const raw = useTransform(scrollYProgress, inputs, outputs);
  const pos = useSpring(raw, { stiffness: 90, damping: 20, mass: 0.8 });
  const trackY = useTransform(pos, (p) => `${-p * 100}%`);
  const gearA = useTransform(pos, (p) => p * 220);
  const gearB = useTransform(pos, (p) => -p * 440);
  const [floor, setFloor] = useState(0);
  useMotionValueEvent(pos, "change", (p) => {
    const f = Math.min(n - 1, Math.max(0, Math.round(p)));
    if (f !== floor) setFloor(f);
  });

  if (reduce) {
    return (
      <section aria-labelledby="elevator-title" className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <p className="label text-ink-soft">Floor by floor</p>
          <h2 id="elevator-title" className="font-display h-section mt-4">Take the lift through the work</h2>
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
    <section ref={ref} aria-labelledby="elevator-title" className="relative border-t border-line" style={{ height: `${n * 85 + 40}svh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-4 px-5 pt-[calc(var(--nav-h)+0.75rem)] sm:px-8 md:grid-cols-[1fr_1.1fr] md:gap-16 md:pt-[var(--nav-h)]">
          {/* Control panel */}
          <div className="order-2 md:order-1">
            <p className="label text-ink-soft">Floor by floor</p>
            <h2 id="elevator-title" className="font-display mt-2 text-[1.6rem] leading-[1.05] md:mt-3 md:text-[clamp(2rem,5vw,3.4rem)]">
              Take the lift through the work
            </h2>

            <div className="mt-3 flex items-center gap-5 md:mt-10">
              {/* Floor display */}
              <div className="flex h-[4.5rem] w-[5.5rem] shrink-0 items-center justify-center overflow-hidden border border-ink bg-ink text-paper">
                <span key={floor} className="floor-tick font-display text-[2.6rem] leading-none tabular-nums">
                  {String(floor + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="relative h-[4.5rem] w-[6.5rem] text-ink" aria-hidden>
                <motion.div style={{ rotate: gearA }} className="absolute left-0 top-1 h-[64px] w-[64px]">
                  <Gear teeth={16} spokes={5} className="h-full w-full" />
                </motion.div>
                <motion.div style={{ rotate: gearB }} className="absolute left-[50px] top-[-6px] h-[36px] w-[36px]">
                  <Gear teeth={8} spokes={3} className="h-full w-full" />
                </motion.div>
              </div>
              <ol className="ml-auto flex flex-col-reverse gap-1.5 md:ml-0" aria-label="Floors">
                {floors.map((f, i) => (
                  <li key={f.id} className={`h-1.5 w-6 transition-colors duration-300 ${i === floor ? "bg-ink" : "bg-ink/15"}`} aria-current={i === floor ? "step" : undefined}>
                    <span className="sr-only">{f.title}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-3 min-h-[4.5rem] md:mt-8 md:min-h-[6.5rem]" aria-live="polite">
              <p key={current.id} className="floor-tick">
                <span className="font-display block text-[1.45rem] leading-tight sm:text-3xl">{current.title}</span>
                {current.caption && <span className="mt-1 block text-ink-soft">{current.caption}</span>}
              </p>
            </div>
            <div className="mt-2 hidden md:block">
              <Link href="/decorative-painting/" className="btn btn-dark">
                See every floor <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* The car: a window the shaft slides through. */}
          <div className="order-1 md:order-2">
            <div className="relative mx-auto aspect-[4/5] max-h-[46svh] w-full overflow-hidden border border-ink bg-sand md:max-h-[74svh]">
              <motion.ul style={{ y: trackY }} className="absolute inset-x-0 top-0 h-full">
                {floors.map((f, i) => (
                  <li key={f.id} className="absolute inset-x-0 h-full" style={{ top: `${i * 100}%` }}>
                    <ArtImage art={f} sizes="(min-width: 768px) 45vw, 92vw" priority={i < 2} decorative className="h-full object-cover" />
                    {/* Floor slab between pieces */}
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-3 border-y border-ink bg-paper" />
                  </li>
                ))}
              </motion.ul>
              {/* Car frame details */}
              <span aria-hidden className="pointer-events-none absolute inset-3 border border-white/70 mix-blend-difference" />
              <span aria-hidden className="label pointer-events-none absolute left-5 top-5 text-white mix-blend-difference">
                Floor {String(floor + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
