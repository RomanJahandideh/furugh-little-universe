"use client";

import { colorFamilies, moods, type ColorId, type MoodId } from "@/data/taxonomy";

/** Two simple filter rows: style (one at a time) and color (any number). */
export function Discovery({
  mood,
  colors,
  counts,
  colorCounts,
  total,
  shown,
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
  onMood: (m: MoodId | null) => void;
  onColor: (c: ColorId) => void;
  onReset: () => void;
}) {
  const filtered = mood !== null || colors.length > 0;
  return (
    <div className="space-y-4">
      <div role="group" aria-label="Filter by style" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        <Chip active={mood === null} onClick={() => onMood(null)} label="All styles" count={total} />
        {moods.map((m) => (
          <Chip
            key={m.id}
            active={mood === m.id}
            onClick={() => onMood(mood === m.id ? null : m.id)}
            label={STYLE_LABEL[m.id] ?? m.label}
            count={counts[m.id] ?? 0}
          />
        ))}
      </div>

      <div role="group" aria-label="Filter by color (choose any)" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
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
              className={`flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-3 text-sm transition-colors disabled:opacity-35 ${
                on ? "border-ink bg-ink text-paper" : "border-line bg-panel hover:border-ink"
              }`}
            >
              <span aria-hidden className="h-4 w-4 rounded-full border border-black/15" style={{ background: c.swatch }} />
              {c.label}
            </button>
          );
        })}
      </div>

      <div className="flex min-h-11 flex-wrap items-center gap-3 text-sm">
        <p aria-live="polite" className="text-ink-soft">
          {filtered ? `Showing ${shown} of ${total} designs` : `${total} designs`}
        </p>
        {filtered && (
          <button type="button" onClick={onReset} className="font-semibold underline underline-offset-4">
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}

const STYLE_LABEL: Record<string, string> = {
  minimal: "Minimal",
  classic: "French",
  shiny: "Chrome & glitter",
  flower: "Floral",
  cute: "Cute",
  bold: "Bold",
  seasonal: "Seasonal",
};

function Chip({ active, onClick, label, count }: { active: boolean; onClick: () => void; label: string; count: number }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={`${label}, ${count} ${count === 1 ? "design" : "designs"}`}
      onClick={onClick}
      disabled={count === 0}
      className={`flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-[0.95rem] font-medium transition-colors disabled:opacity-35 ${
        active ? "border-ink bg-ink text-paper" : "border-line bg-panel hover:border-ink"
      }`}
    >
      {label}
      <span className={`text-xs ${active ? "text-paper/70" : "text-ink-soft"}`}>{count}</span>
    </button>
  );
}
