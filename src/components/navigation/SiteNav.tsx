"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useState } from "react";
import { Sparkle } from "@/components/illustrations/Doodles";

const worlds = [
  { href: "/retail/", key: "retail", label: "People", accent: "var(--butter)" },
  { href: "/nails/", key: "nails", label: "Nails", accent: "var(--pink)" },
] as const;

export function SiteNav() {
  const pathname = usePathname() ?? "/";
  const current = worlds.find((w) => pathname.startsWith(`/${w.key}`))?.key ?? null;
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 24;
    if (next !== scrolled) setScrolled(next);
  });

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow] duration-300 ${
        scrolled ? "bg-paper/85 shadow-[0_1px_0_var(--ink)] backdrop-blur-md" : ""
      }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-[var(--nav-h)] max-w-7xl items-center justify-between gap-3 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]"
      >
        <Link
          href="/"
          className="group flex min-h-11 items-center gap-1 rounded-full pr-2 font-hand text-[1.9rem] font-bold leading-none"
          aria-label="Furugh, back to the start"
        >
          <span className="transition-transform duration-300 group-hover:-rotate-6">Furugh</span>
          <Sparkle className="h-4 w-4 text-ink anim-twinkle" fillColor="var(--pink)" draw={false} />
        </Link>

        <div className="sticker flex items-center p-1" role="list" aria-label="Choose a world">
          {worlds.map((w) => {
            const active = current === w.key;
            return (
              <Link
                key={w.key}
                role="listitem"
                href={w.href}
                aria-current={active ? "page" : undefined}
                className="relative flex min-h-11 min-w-[4.75rem] items-center justify-center rounded-full px-4 text-[0.95rem] font-semibold"
              >
                {active && (
                  <motion.span
                    layoutId="world-pill"
                    className="absolute inset-0 rounded-full border-2 border-ink"
                    style={{ background: w.accent }}
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                <span className="relative">{w.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      {current && (
        <motion.div
          aria-hidden
          className="h-[3px] origin-left"
          style={{ scaleX: progress, background: current === "nails" ? "var(--pink)" : "var(--ink)" }}
        />
      )}
    </header>
  );
}
