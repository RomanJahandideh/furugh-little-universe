"use client";

import { useSpring, useTransform, type MotionValue } from "motion/react";

/**
 * Makes a smooth 0..1 progress value move like it is driven by a winch and
 * ratchet: it advances in `steps` notches, and each notch lands on a slightly
 * under-damped spring so it overshoots a touch and settles, like gear teeth
 * catching. No gears are drawn; you feel them in the motion.
 */
export function useRatchet(progress: MotionValue<number>, steps = 8, feel: "click" | "heavy" = "click") {
  const notched = useTransform(progress, (p) => Math.round(Math.min(1, Math.max(0, p)) * steps) / steps);
  return useSpring(
    notched,
    feel === "heavy" ? { stiffness: 260, damping: 15, mass: 1.1 } : { stiffness: 520, damping: 19, mass: 0.7 },
  );
}
