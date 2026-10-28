"use client";

import type { ReactNode } from "react";
import { Bolt, Flower, Heart, Paint, Smile, Snowflake, Sparkle, Star } from "@/components/illustrations/Doodles";
import { colorFamilies, moods, type ColorId, type MoodId } from "@/data/taxonomy";

const MOOD_ICON: Record<string, (c: string) => ReactNode> = {
  smile: () => <Smile className="h-9 w-9 text-ink" draw={false} />,
  star: (c) => <Star className="h-9 w-9 text-ink" fill={c} draw={false} />,
  sparkle: (c) => <Sparkle className="h-9 w-9 text-ink" fillColor={c} draw={false} />,
  flower: () => <Flower className="h-9 w-9 text-ink" fillColor="var(--white)" draw={false} />,
  heart: (c) => <Heart className="h-9 w-9 text-ink" fillColor={c} draw={false} />,
  bolt: (c) => <Bolt className="h-9 w-9 text-ink" fillColor={c} draw={false} />,
  snow: () => <Snowflake className="h-9 w-9 text-ink" draw={false} />,
};

export function Discovery({
  mood,
  colors,
  counts,
  colorCounts,
  total,
  shown,
  burst,
  onMood,
  onColor,
  onReset,
}: {
  mood: MoodId | null;
  colors: ColorId[];
  counts: Record<string, number>;
  colorCounts: Record<string, number>;
  total: number;
  shown: number;
  burst: number;
  onMood: (m: MoodId | null) => void;
  onColor: (c: ColorId) => void;
  onReset: () => void;
}) {
  const filtered = mood !== null || colors.length > 0;
  return (
    <section id="discover" aria-labelledby="mood-title" className="relative py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <h2 id="mood-title" className="font-display text-big font-semibold">
          What&rsquo;s your <span className="marker" style={{ "--marker": "var(--pink)" } as React.CSSProperties}>nail mood</span>?
        </h2>
        <p className="mt-2 font-hand text-xl text-ink-soft">Swipe, tap one, and the sketchbook rearranges itself.</p>
      </div>

      {/* Mood cards: a native horizontal scroller with snap. */}
      <div
        role="group"
        aria-label="Filter by mood"
        className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-4 pt-2 sm:scroll-px-8 sm:px-8 lg:mx-auto lg:max-w-7xl lg:flex-wrap"
      >
        <MoodButton active={mood === null} onClick={() => onMood(null)} accent="var(--white)" label="Show All" count={total} burst={mood === null ? burst : 0}>
          <Sparkle className="h-9 w-9 text-ink" fillColor="var(--butter)" draw={false} />
        </MoodButton>
        {moods.map((m) => (
          <MoodButton
            key={m.id}
            active={mood === m.id}
            onClick={() => onMood(mood === m.id ? null : m.id)}
            accent={m.accent}
            label={m.label}
            count={counts[m.id] ?? 0}
            burst={mood === m.id ? burst : 0}
          >
            {MOOD_ICON[m.icon](m.accent)}
          </MoodButton>
        ))}
      </div>

      <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-8">
        <h3 className="font-hand text-2xl font-bold">&hellip;or dip into a color</h3>
      </div>
      <div
        role="group"
        aria-label="Filter by color (choose one or more)"
        className="no-scrollbar mt-2 flex snap-x gap-1 overflow-x-auto px-3 pb-3 pt-2 sm:px-7 lg:mx-auto lg:max-w-7xl lg:flex-wrap"
      >
        {colorFamilies.map((c) => {
          const on = colors.includes(c.id);
          const n = colorCounts[c.id] ?? 0;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={on}
              aria-label={`${c.label}, ${n} ${n === 1 ? "design" : "designs"}`}
              disabled={n === 0}
              onClick={() => onColor(c.id)}
              className="group flex w-[4.6rem] shrink-0 snap-start flex-col items-center gap-1 rounded-2xl p-1.5 text-center disabled:opacity-35"
            >
              <span
                className={`relative block h-14 w-16 transition-transform duration-500 [transition-timing-function:var(--ease-bounce)] group-hover:scale-110 group-hover:-rotate-6 ${
                  on ? "-translate-y-1 scale-110 rotate-6" : ""
                }`}
              >
                <Paint color={c.swatch} className={`h-full w-full ${on ? "anim-jiggle" : ""}`} />
                {on && (
                  <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full border-2 border-ink bg-white text-xs font-bold" aria-hidden>
                    &#10003;
                  </span>
                )}
              </span>
              <span className={`text-[0.78rem] leading-tight ${on ? "font-bold" : ""}`}>{c.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mx-auto mt-4 flex max-w-7xl flex-wrap items-center gap-3 px-4 sm:px-8">
        <p aria-live="polite" className="font-semibold">
          {filtered ? `Showing ${shown} of ${total} designs` : `All ${total} designs`}
        </p>
        {filtered && (
          <button type="button" onClick={onReset} className="btn-line !min-h-11 !px-4 !py-1.5 text-sm">
            Reset &amp; show all
          </button>
        )}
      </div>
    </section>
  );
}

function MoodButton({
  active,
  onClick,
  accent,
  label,
  count,
  burst,
  children,
}: {
  active: boolean;
  onClick: () => void;
  accent: string;
  label: string;
  count: number;
  burst: number;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={`${label}, ${count} ${count === 1 ? "design" : "designs"}`}
      onClick={onClick}
      disabled={count === 0}
      className={`relative flex w-[9.5rem] shrink-0 snap-start flex-col justify-between gap-3 rounded-[24px] border-2 border-ink p-3.5 text-left transition-[transform,box-shadow] duration-300 [transition-timing-function:var(--ease-bounce)] disabled:opacity-40 ${
        active ? "-translate-y-1 -rotate-2 shadow-[4px_4px_0_var(--ink)]" : "bg-white hover:-translate-y-0.5"
      }`}
      style={active ? { background: accent } : undefined}
    >
      <span className="flex items-start justify-between">
        {children}
        <span className="rounded-full border-2 border-ink bg-white px-2 text-xs font-bold leading-5">{count}</span>
      </span>
      <span className="font-display text-[1.08rem] font-semibold leading-tight">{label}</span>
      {burst > 0 && <Burst key={burst} />}
    </button>
  );
}

/** A little sparkle burst when a filter is picked. */
function Burst() {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="absolute left-1/2 top-1/2 h-4 w-4"
          style={{
            animation: `burst-${i} 0.7s var(--ease-out) forwards`,
          }}
        >
          <Sparkle className="h-full w-full text-ink" fillColor={["var(--butter)", "var(--pink)", "var(--mint)", "var(--lilac)", "var(--coral)"][i]} draw={false} />
        </span>
      ))}
    </span>
  );
}
