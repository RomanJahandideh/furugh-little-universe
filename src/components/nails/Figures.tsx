/** Simple line drawings used inside the services. No photos are implied. */

const SHAPE_PATHS: Record<string, string> = {
  Almond: "M20 92 L20 46 C20 22 30 8 40 4 C50 8 60 22 60 46 L60 92 Z",
  Oval: "M20 92 L20 40 C20 18 30 8 40 8 C50 8 60 18 60 40 L60 92 Z",
  Round: "M20 92 L20 30 C20 18 28 14 40 14 C52 14 60 18 60 30 L60 92 Z",
  Square: "M20 92 L20 16 C20 14 21 13 23 13 L57 13 C59 13 60 14 60 16 L60 92 Z",
};

/** Nail shapes that actually appear in her portfolio, with how many sets use each. */
export function ShapeRow({ counts }: { counts: Record<string, number> }) {
  const shapes = Object.keys(SHAPE_PATHS).filter((s) => counts[s]);
  return (
    <div>
      <p className="label text-burgundy">Shapes in my portfolio</p>
      <ul className="mt-4 flex flex-wrap gap-6">
        {shapes.map((s) => (
          <li key={s} className="flex flex-col items-center gap-2">
            <svg aria-hidden viewBox="0 0 80 96" className="h-20 w-16">
              <path d={SHAPE_PATHS[s]} fill="#e8d8ce" stroke="#302522" strokeWidth="1.4" />
              <path d="M20 92 C20 80 60 80 60 92" fill="none" stroke="#692e3d" strokeWidth="1" opacity="0.6" />
            </svg>
            <span className="text-sm font-medium">{s}</span>
            <span className="label text-espresso/60">{counts[s]} sets</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Side view of a nail enhancement: before rebalancing (apex has moved
 * forward with growth), the correction, and the refined structure.
 */
export function RebalanceFigure() {
  const finger = "M6 70 C40 74 90 74 120 66 C140 60 150 50 152 44";
  const plate = "M30 58 C60 52 100 50 140 44";
  const stages = [
    { title: "Before rebalancing", note: "Growth has pushed the apex forward; the free edge carries the weight.", product: "M30 58 C42 54 70 50 96 42 C112 38 128 38 150 42 L150 46 C120 46 70 52 30 60 Z", apex: [100, 41] as const },
    { title: "Apex correction", note: "Product is refined and the new growth prepared; the apex is rebuilt in place.", product: "M30 58 C50 50 70 46 88 45 C110 44 130 42 150 42 L150 46 C120 46 70 52 30 60 Z", apex: [78, 46] as const, arrow: true },
    { title: "Refined structure", note: "Balanced thickness, a clean apex and a smooth line to the free edge.", product: "M30 58 C48 50 66 46 80 45 C104 44 130 42 150 42 L150 46 C120 46 70 52 30 60 Z", apex: [76, 45] as const },
  ];
  return (
    <figure>
      <figcaption className="label text-burgundy">Fill or rebalance? A side view</figcaption>
      <ol className="mt-4 grid gap-4 sm:grid-cols-3">
        {stages.map((s, i) => (
          <li key={s.title} className="border border-espresso/15 bg-white/60 p-4">
            <svg viewBox="0 0 160 90" className="h-auto w-full" role="img" aria-label={`${s.title}: ${s.note}`}>
              <path d={finger} fill="none" stroke="#302522" strokeWidth="1.2" opacity="0.5" />
              <path d={plate} fill="none" stroke="#302522" strokeWidth="1.2" />
              <path d={s.product} fill="#c69c9c" fillOpacity="0.55" stroke="#692e3d" strokeWidth="1.1" />
              <circle cx={s.apex[0]} cy={s.apex[1]} r="3" fill="#692e3d" />
              {s.arrow && <path d="M104 30 L84 38 M84 38 L90 32 M84 38 L91 40" stroke="#692e3d" strokeWidth="1.3" fill="none" />}
            </svg>
            <p className="mt-3 flex items-baseline gap-2">
              <span className="label text-burgundy">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-medium">{s.title}</span>
            </p>
            <p className="mt-1 text-sm text-espresso/70">{s.note}</p>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-sm text-espresso/60">A simplified illustration, not a training guide.</p>
    </figure>
  );
}
