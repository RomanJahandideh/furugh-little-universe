"use client";

import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Uncovers its content from the bottom up as it scrolls into view, as if the
 * picture is being hoisted into place, while the picture itself settles down
 * slightly the other way. Tied to scroll position, so scrolling back lowers it.
 */
export function PullUp({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.5"] });
  const cut = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const clip = useMotionTemplate`inset(${cut}% 0 0 0)`;
  const y = useTransform(scrollYProgress, [0, 1], ["14%", "0%"]);

  if (reduce) return <span className={`block ${className}`}>{children}</span>;
  return (
    <motion.span ref={ref} style={{ clipPath: clip }} className={`block overflow-hidden ${className}`}>
      <motion.span style={{ y }} className="block">
        {children}
      </motion.span>
    </motion.span>
  );
}
