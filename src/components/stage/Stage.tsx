"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ComponentProps, type ReactNode } from "react";

/**
 * The colour stage. Each <Stage> section names a background colour and
 * whether its text is light or dark. Whichever stage crosses the middle of
 * the screen sets the page colours, and the body fades between them, so
 * scrolling through the site changes its whole colour, chapter by chapter.
 */
export const STAGES = {
  teal: { bg: "#1d4447", fg: "light" },
  slate: { bg: "#4a6273", fg: "light" },
  oxblood: { bg: "#6e2a20", fg: "light" },
  olive: { bg: "#3c4636", fg: "light" },
  char: { bg: "#171513", fg: "light" },
  plum: { bg: "#4a2c3d", fg: "light" },
  paper: { bg: "#f2ede4", fg: "dark" },
} as const;
export type StageName = keyof typeof STAGES;

export function Stage({ tone, children, className = "", ...rest }: { tone: StageName; children: ReactNode } & ComponentProps<"section">) {
  const s = STAGES[tone];
  return (
    <section data-stage={s.bg} data-fg={s.fg} className={`${s.fg === "light" ? "text-paper" : "text-ink"} ${className}`} {...rest}>
      {children}
    </section>
  );
}

/** Watches stages and sets --stage / --stage-fg on <html>. Mount once. */
export function StageController() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    const apply = (el: Element) => {
      root.style.setProperty("--stage", (el as HTMLElement).dataset.stage ?? "");
      root.dataset.fg = (el as HTMLElement).dataset.fg ?? "dark";
    };
    const sections = [...document.querySelectorAll("[data-stage]")];
    if (sections[0]) apply(sections[0]);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && apply(e.target)),
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
