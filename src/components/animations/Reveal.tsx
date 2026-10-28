"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef, type ElementType, type Ref } from "react";

/**
 * One shared IntersectionObserver for every <Reveal>. When an element enters
 * the viewport it gets the `in` class once; CSS does the rest (.rise, .pop,
 * .draw). No scroll listeners, no per-element observers.
 */
let shared: IntersectionObserver | null = null;
function observer() {
  if (!shared) {
    shared = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            shared?.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
  }
  return shared;
}

type RevealProps<T extends ElementType> = { as?: T } & ComponentPropsWithoutRef<T>;

export function Reveal<T extends ElementType = "div">({ as, className = "", ...rest }: RevealProps<T>) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = observer();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);
  const Tag: ElementType = as ?? "div";
  return <Tag ref={ref as Ref<HTMLElement>} className={`reveal ${className}`} {...rest} />;
}
