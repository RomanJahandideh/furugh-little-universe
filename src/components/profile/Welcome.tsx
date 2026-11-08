"use client";

import { useEffect, useRef } from "react";

/**
 * Full-screen WELCOME shown on a visitor's first homepage visit in a session.
 * It holds until the hero photo has loaded (at most ~3s) so the page never
 * appears empty behind it. Tap, click or any key skips it.
 */
export function Welcome() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const el = ref.current;
    if (!el || !root.classList.contains("show-welcome")) return;
    let done = false;
    const timers: number[] = [];

    const finish = () => {
      if (done) return;
      done = true;
      timers.forEach(clearTimeout);
      el.classList.add("out");
      try {
        sessionStorage.setItem("furugh-welcomed", "1");
      } catch {}
      timers.push(window.setTimeout(() => root.classList.remove("show-welcome"), 900));
      document.removeEventListener("pointerdown", finish);
      document.removeEventListener("keydown", finish);
    };

    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("on")));
    document.addEventListener("pointerdown", finish);
    document.addEventListener("keydown", finish);

    const hero = document.getElementById("hero-photo") as HTMLImageElement | null;
    const start = performance.now();
    const whenReady = () => timers.push(window.setTimeout(finish, Math.max(0, 1800 - (performance.now() - start))));
    if (!hero || hero.complete) whenReady();
    else {
      hero.addEventListener("load", whenReady, { once: true });
      hero.addEventListener("error", whenReady, { once: true });
    }
    timers.push(window.setTimeout(finish, 4200));

    return () => {
      timers.forEach(clearTimeout);
      document.removeEventListener("pointerdown", finish);
      document.removeEventListener("keydown", finish);
    };
  }, []);

  return (
    <div id="welcome" ref={ref} role="presentation">
      <div className="px-6 text-center">
        <p className="w-word">WELCOME</p>
        <p className="w-sub label mt-5 text-ink-soft">Furugh &middot; Retail Sales Associate</p>
      </div>
    </div>
  );
}
