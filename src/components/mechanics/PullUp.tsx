"use client";

import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useRatchet } from "./ratchet";

/**
 * Hoists its content into view as it scrolls in: the picture is uncovered
 * from the bottom up in ratchet notches, each landing with a small mechanical
 * bounce, while the picture rises into its frame. Scrolling back lowers it.
 */
export function PullUp({ children, className = "", steps = 6 }: { children: ReactNode; className?: string; steps?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.45"] });
  const p = useRatchet(scrollYProgress, steps);
  const cut = useTransform(p, [0, 1], [100, 0]);
  const clip = useMotionTemplate`inset(${cut}% 0 0 0)`;
  const y = useTransform(p, [0, 1], ["18%", "0%"]);

  if (reduce) return <span className={`block ${className}`}>{children}</span>;
  return (
    <motion.span ref={ref} style={{ clipPath: clip }} className={`block overflow-hidden ${className}`}>
      <motion.span style={{ y }} className="block">
        {children}
      </motion.span>
    </motion.span>
  );
}

/** Lifts a heading up out of a slot, notch by notch, as it scrolls into view. */
export function LiftText({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.62"] });
  const p = useRatchet(scrollYProgress, 4);
  const y = useTransform(p, [0, 1], ["105%", "0%"]);
  if (reduce) return <span className={`block ${className}`}>{children}</span>;
  return (
    <span ref={ref} className={`block overflow-hidden pb-[0.12em] ${className}`}>
      <motion.span style={{ y }} className="block">
        {children}
      </motion.span>
    </span>
  );
}
