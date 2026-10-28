"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Hand, PolishBottle, Sparkle } from "@/components/illustrations/Doodles";

/** Small illustrated breathers between runs of photos. Purely decorative. */
export function Interlude({ variant }: { variant: number }) {
  const round = Math.floor(variant / 3);
  if (variant % 3 === 0) return <PolishSpill caption={SPILLS[round % SPILLS.length]} />;
  if (variant % 3 === 1) return <LoudQuote lines={QUOTES[round % QUOTES.length]} />;
  return <HandRepaint caption={HANDS[round % HANDS.length]} />;
}

const SPILLS = ["Oops. A little spill… and on to the next mood.", "Fresh coat. New chapter. Keep going."];
const QUOTES = [
  ["Little details.", "Loud personalities."],
  ["Small canvas.", "Big mood."],
];
const HANDS = ["Same hand. New mood. Keep scrolling.", "Ten tiny canvases. Endless ideas."];

function PolishSpill({ caption }: { caption: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 40%"] });
  const tip = useTransform(scrollYProgress, [0, 0.3], [0, 38]);
  return (
    <div ref={ref} aria-hidden className="relative -mx-4 h-[46svh] min-h-[300px] sm:-mx-8">
      <motion.div style={{ rotate: tip }} className="absolute left-[8%] top-0 w-20 origin-bottom-right sm:w-28">
        <PolishBottle className="w-full text-ink" polish="var(--pink)" draw={false} />
      </motion.div>
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full overflow-visible">
        <motion.path
          d="M60 70c30 10 40 40 90 40s80-30 120 0 20 70 60 90 50 50 40 100"
          fill="none"
          stroke="var(--pink)"
          strokeWidth="10"
          strokeLinecap="round"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
      <p className="absolute bottom-[8%] left-[8%] max-w-[60%] font-hand text-[1.7rem] font-bold leading-tight sm:text-4xl">
        {caption}
      </p>
    </div>
  );
}

function LoudQuote({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const left = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const right = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div ref={ref} aria-hidden className="relative -mx-4 overflow-hidden py-10 sm:-mx-8">
      <motion.p style={{ x: left }} className="whitespace-nowrap font-display text-huge font-semibold">
        {lines[0]}
      </motion.p>
      <motion.p style={{ x: right }} className="whitespace-nowrap text-right font-display text-huge font-semibold italic">
        <span className="marker" style={{ "--marker": "var(--pink)" } as React.CSSProperties}>
          {lines[1]}
        </span>
      </motion.p>
      <Sparkle className="anim-twinkle absolute left-[40%] top-2 w-10 text-ink" fillColor="var(--butter)" draw={false} />
      <Sparkle className="anim-twinkle absolute bottom-2 right-[30%] w-8 text-ink" fillColor="var(--lilac)" style={{ animationDelay: "0.8s" }} draw={false} />
    </div>
  );
}

const PALETTES = [
  ["var(--pink)", "var(--pink)", "var(--pink)", "var(--pink)", "var(--pink)"],
  ["var(--butter)", "var(--mint)", "var(--butter)", "var(--mint)", "var(--butter)"],
  ["#B3172B", "#B3172B", "var(--white)", "#B3172B", "#B3172B"],
  ["var(--lilac)", "var(--coral)", "var(--mint)", "var(--butter)", "var(--pink)"],
  ["var(--ink)", "#C9A646", "var(--ink)", "#C9A646", "var(--ink)"],
];

function HandRepaint({ caption }: { caption: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const [i, setI] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(PALETTES.length - 1, Math.max(0, Math.floor(p * PALETTES.length)));
    if (next !== i) setI(next);
  });
  return (
    <div ref={ref} aria-hidden className="flex flex-col items-center py-6 text-center">
      <Hand className="w-32 text-ink sm:w-40" nails={PALETTES[i]} draw={false} />
      <p className="mt-4 font-hand text-[1.7rem] font-bold leading-tight sm:text-4xl">{caption}</p>
    </div>
  );
}
