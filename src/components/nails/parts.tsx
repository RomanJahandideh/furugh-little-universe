"use client";

import { motion, useScroll } from "motion/react";
import type { ReactNode } from "react";
import { LiftText } from "@/components/mechanics/PullUp";

/** Stage colours for the nail section (the page colour fades between them). */
export const NAIL_TONES = {
  ivory: { bg: "#f8f5f0", fg: "dark", text: "text-espresso" },
  nude: { bg: "#e8d8ce", fg: "dark", text: "text-espresso" },
  espresso: { bg: "#302522", fg: "light", text: "text-ivory" },
  burgundy: { bg: "#692e3d", fg: "light", text: "text-ivory" },
} as const;
export type NailTone = keyof typeof NAIL_TONES;

export function NailSection({ tone, id, label, children, className = "" }: { tone: NailTone; id?: string; label?: string; children: ReactNode; className?: string }) {
  const t = NAIL_TONES[tone];
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} aria-label={label} data-stage={t.bg} data-fg={t.fg} style={{ background: t.bg }} className={`scroll-mt-[var(--nav-h)] ${t.text} ${className}`}>
      {children}
    </section>
  );
}

/** Numbered editorial section heading: small label, big serif title, optional intro. */
export function SectionHead({ id, n, label, title, intro, light = false, className = "" }: {
  id?: string;
  n: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className={`label flex items-center gap-3 ${light ? "text-champagne" : "text-burgundy"}`}>
        <span>{n}</span>
        <span aria-hidden className={`h-px w-10 ${light ? "bg-champagne/60" : "bg-burgundy/50"}`} />
        <span>{label}</span>
      </p>
      <h2 id={id ? `${id}-title` : undefined} className="font-editorial mt-5 text-[clamp(2.6rem,6.4vw,5.4rem)]">
        <LiftText>{title}</LiftText>
      </h2>
      {intro && <p className={`mt-6 max-w-xl text-[1.06rem] leading-relaxed ${light ? "text-ivory/80" : "text-espresso/75"}`}>{intro}</p>}
    </div>
  );
}

/** Thin reading-progress line at the very top of the page. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div aria-hidden style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-burgundy" />;
}

export function Check({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className={`h-3.5 w-3.5 shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 8.5l3 3 7-7" />
    </svg>
  );
}
