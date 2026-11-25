"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Gear, gearRadius } from "./Gear";

const BIG = 20;
const SMALL = 10;
const K = 0.8; // px per gear unit
const box = (teeth: number) => (gearRadius(teeth) + 5) * 2 * K; // rendered SVG size
const PITCH = (gearRadius(BIG) + gearRadius(SMALL)) * K; // centre-to-centre distance
const BIG_C = { x: 36, y: 50 };
const SMALL_C = { x: BIG_C.x - PITCH * Math.SQRT1_2, y: BIG_C.y - PITCH * Math.SQRT1_2 };

/**
 * A lift shaft down the right edge of the page: two meshing gears at the top
 * turn as you scroll (with a little mechanical inertia), and a small car rides
 * the cable down to show how far you are. mix-blend-difference keeps it
 * readable over both light pages and dark photos. Decorative only.
 */
export function ScrollGears() {
  const reduce = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const turn = useSpring(scrollY, { stiffness: 120, damping: 22, mass: 0.6 });
  const big = useTransform(turn, (y) => y * 0.18);
  // Meshing gears turn in opposite directions at the inverse tooth ratio.
  const small = useTransform(big, (a) => (-a * BIG) / SMALL + 180 / SMALL);
  const car = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });
  const carTop = useTransform(car, (p) => `calc(${p} * (100% - 22px))`);

  if (reduce) return null;

  const b = box(BIG);
  const s = box(SMALL);
  return (
    <div aria-hidden className="pointer-events-none fixed bottom-6 right-3 top-[calc(var(--nav-h)+0.75rem)] z-40 hidden w-16 text-white mix-blend-difference lg:block xl:right-5">
      <motion.div style={{ rotate: big, left: BIG_C.x - b / 2, top: BIG_C.y - b / 2, width: b, height: b }} className="absolute">
        <Gear teeth={BIG} spokes={6} className="h-full w-full" />
      </motion.div>
      <motion.div style={{ rotate: small, left: SMALL_C.x - s / 2, top: SMALL_C.y - s / 2, width: s, height: s }} className="absolute">
        <Gear teeth={SMALL} spokes={4} className="h-full w-full" />
      </motion.div>
      {/* Cable from the big gear's axle down, with the car riding on it. */}
      <div className="absolute bottom-0" style={{ left: BIG_C.x, top: BIG_C.y + b / 2 + 4 }}>
        <span className="absolute inset-y-0 left-0 w-px bg-white/50" />
        <motion.span style={{ top: carTop }} className="absolute -left-[7px] block h-[22px] w-[15px] border border-white">
          <span className="absolute inset-x-[3px] top-1/2 h-px bg-white" />
        </motion.span>
      </div>
    </div>
  );
}
