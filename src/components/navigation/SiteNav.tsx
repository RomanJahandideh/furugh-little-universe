"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useState } from "react";
import { Sparkle } from "@/components/illustrations/Doodles";

const worlds = [
  { href: "/retail/", key: "retail", label: "People" },
  { href: "/nails/", key: "nails", label: "Nails" },
] as const;

const CTA = {
  retail: { href: "#contact", label: "Get in touch", short: "Contact" },
  nails: { href: "#inquire", label: "Book a set", short: "Book" },
} as const;

/** Floating glass pill: wordmark, world switch, and a context-aware call to action. */
export function SiteNav() {
  const pathname = usePathname() ?? "/";
  const current = worlds.find((w) => pathname.startsWith(`/${w.key}`))?.key ?? null;
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });
  const [hidden, setHidden] = useState(false);
  // Tuck the bar away while scrolling down, bring it back on any scroll up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const next = y > 140 && y > prev + 4;
    if (y < prev - 4 || y < 140) {
      if (hidden) setHidden(false);
    } else if (next && !hidden) setHidden(true);
  });

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-3 sm:px-6"
      style={{ paddingTop: "max(0.6rem, env(safe-area-inset-top))" }}
      animate={{ y: hidden ? "-120%" : "0%" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav
        aria-label="Main"
        className="relative mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 overflow-hidden rounded-2xl border border-line bg-[color-mix(in_srgb,var(--white)_72%,transparent)] pl-4 pr-1.5 backdrop-blur-xl sm:h-16 sm:pl-6 sm:pr-2"
      >
        <Link href="/" className="group flex min-h-11 items-center gap-1.5 font-display text-[1.35rem] uppercase leading-none" aria-label="Furugh, back to the start">
          <Sparkle className="h-4 w-4 text-ink transition-transform duration-500 group-hover:rotate-90" fillColor="var(--pink)" draw={false} />
          Furugh
        </Link>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center rounded-xl p-0.5" role="list" aria-label="Choose a world">
            {worlds.map((w) => {
              const active = current === w.key;
              return (
                <Link
                  key={w.key}
                  role="listitem"
                  href={w.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex min-h-11 items-center justify-center rounded-lg px-3 text-[0.92rem] font-semibold transition-colors sm:px-4 ${active ? "" : "text-ink-soft hover:text-ink"}`}
                >
                  {active && (
                    <motion.span layoutId="world-pill" className="absolute inset-0 rounded-lg bg-[color-mix(in_srgb,var(--ink)_10%,transparent)]" transition={{ type: "spring", stiffness: 420, damping: 32 }} />
                  )}
                  <span className="relative">{w.label}</span>
                </Link>
              );
            })}
          </div>
          {current && (
            <a href={CTA[current].href} className="btn-ink !min-h-11 whitespace-nowrap !rounded-xl !px-3.5 !py-2 text-[0.9rem] max-[359px]:hidden sm:!px-5">
              <span className="sm:hidden">{CTA[current].short}</span>
              <span className="max-sm:hidden">{CTA[current].label}</span>
            </a>
          )}
        </div>

        {current && (
          <motion.span aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-pink" style={{ scaleX: progress }} />
        )}
      </nav>
    </motion.header>
  );
}
