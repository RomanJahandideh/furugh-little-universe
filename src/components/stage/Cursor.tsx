"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * A spinning circular label that follows the mouse over anything marked
 * data-cursor="LABEL". Computer mice only; hidden on touch and for
 * reduced motion. Purely decorative: the elements keep their own labels.
 */
export function CursorBadge() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const [label, setLabel] = useState<string | null>(null);
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = (e.target as Element | null)?.closest?.("[data-cursor]") as HTMLElement | null;
      setLabel(t ? t.dataset.cursor ?? null : null);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("pointermove", move);
    };
  }, [x, y]);

  if (reduce || !fine) return null;
  const text = `${label ?? ""} · ${label ?? ""} · `;
  return (
    <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-[90]">
      <div
        className={`-translate-x-1/2 -translate-y-1/2 transition-[opacity,transform] duration-300 ${label ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
      >
        <div className="relative grid h-[104px] w-[104px] place-items-center rounded-full bg-gold text-char">
          <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 h-full w-full">
            <defs>
              <path id="cursor-ring" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" />
            </defs>
            <text className="fill-current text-[9.5px] font-semibold uppercase tracking-[0.18em]">
              <textPath href="#cursor-ring">{text}</textPath>
            </text>
          </svg>
          <span className="text-xl">&uarr;</span>
        </div>
      </div>
    </motion.div>
  );
}

/** Cycles through verbs, each one rolling up into place. */
export function VerbCycle({ words, className = "" }: { words: string[]; className?: string }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % words.length), 1500);
    return () => window.clearInterval(t);
  }, [reduce, words.length]);
  return (
    <span className={`inline-block overflow-hidden align-bottom ${className}`} aria-label={words[0]}>
      <span key={i} aria-hidden className="verb-roll block">
        {words[i]}
      </span>
    </span>
  );
}
