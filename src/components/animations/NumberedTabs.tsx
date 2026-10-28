"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

export interface TabDef {
  id: string;
  label: string;
  /** How many progress segments (steps) this tab plays through. */
  steps: number;
  render: (step: number, goTo: (step: number) => void) => ReactNode;
}

/**
 * Numbered tabs with a segmented progress bar. While the block is on screen,
 * each step fills its segment and then advances, moving to the next tab when
 * the current one finishes. Hover, keyboard focus, or picking a tab pauses
 * the autoplay; reduced-motion users get manual tabs only.
 */
export function NumberedTabs({ tabs, label, stepMs = 4200 }: { tabs: TabDef[]; label: string; stepMs?: number }) {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState(0);
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hold, setHold] = useState(false);
  const [manual, setManual] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const uid = useId();

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playing = !reduce && visible && !hold && !manual;
  const current = tabs[tab];

  const advance = () => {
    if (step + 1 < current.steps) setStep(step + 1);
    else {
      setTab((tab + 1) % tabs.length);
      setStep(0);
    }
  };

  const select = (i: number) => {
    setTab(i);
    setStep(0);
    setManual(true);
  };

  return (
    <div
      ref={root}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHold(true)}
      onPointerLeave={() => setHold(false)}
      onFocusCapture={() => setHold(true)}
      onBlurCapture={() => setHold(false)}
    >
      <div role="tablist" aria-label={label} className="no-scrollbar flex overflow-x-auto border-b border-line">
        {tabs.map((t, i) => {
          const on = i === tab;
          return (
            <button
              key={t.id}
              role="tab"
              id={`${uid}-tab-${i}`}
              aria-selected={on}
              aria-controls={`${uid}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                  e.preventDefault();
                  const n = (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
                  select(n);
                  document.getElementById(`${uid}-tab-${n}`)?.focus();
                }
              }}
              className={`relative flex min-h-14 shrink-0 items-baseline gap-2 px-4 font-display text-[1.15rem] uppercase tracking-[-0.02em] transition-colors duration-300 sm:px-6 sm:text-2xl ${
                on ? "text-char" : "text-ink-soft hover:text-ink"
              }`}
            >
              {on && (
                <motion.span
                  layoutId={`${uid}-pill`}
                  className="absolute inset-0 bg-pink"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              )}
              <span className="relative">{t.label}</span>
              <span className="label-mono relative !text-[0.66rem] opacity-70">{String(i + 1).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex gap-1.5" aria-hidden>
        {Array.from({ length: current.steps }, (_, i) => (
          <span
            key={`${tab}-${i}`}
            className={`seg ${i < step ? "done" : ""} ${i === step ? (playing ? "run" : manual || reduce ? "done" : "run paused") : ""}`}
            style={{ "--dur": `${stepMs}ms` } as React.CSSProperties}
            onAnimationEnd={i === step ? advance : undefined}
          >
            <i />
          </span>
        ))}
      </div>

      <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${tab}`} className="mt-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {current.render(step, (s) => {
              setStep(s);
              setManual(true);
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
