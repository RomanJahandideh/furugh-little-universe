/**
 * Ornament library inspired by the margins of Persian, Mughal and Chinese
 * miniature painting: a shamseh (sunburst medallion), islimi arabesque
 * vines, lotus, ruyi cloud scrolls, rosette corners and the pointed arch.
 *
 * Shapes are generated from geometry, so they stay crisp at any size.
 * Lines with class "dl" draw themselves on when their <Reveal> container
 * enters the view; "fl" fills fade in after (see globals.css).
 */
import type { CSSProperties, SVGProps } from "react";

const DL = { pathLength: 1, strokeDasharray: "1 1", className: "dl" } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;

/** Point at `r` from (cx, cy), `deg` measured clockwise from 12 o'clock. */
function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180;
  return [r2(cx + r * Math.cos(a)), r2(cy + r * Math.sin(a))];
}
const pt = (p: [number, number]) => `${p[0]} ${p[1]}`;
const range = (n: number) => Array.from({ length: n }, (_, i) => i);

/** A spiral that starts exactly at `start` and curls around `center`. */
function spiralFrom(start: [number, number], center: [number, number], turns: number, shrink: number, cw: boolean) {
  const r0 = Math.hypot(start[0] - center[0], start[1] - center[1]);
  const a0 = (Math.atan2(start[0] - center[0], -(start[1] - center[1])) * 180) / Math.PI;
  const steps = Math.ceil(turns * 28);
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const r = r0 * Math.pow(shrink, t);
    pts.push(pt(polar(center[0], center[1], r, a0 + (cw ? 1 : -1) * t * turns * 360)));
  }
  return `M${pts.join("L")}`;
}

/** Teardrop leaf from `base` pointing at `deg`. */
function leaf(base: [number, number], deg: number, len: number, spread = 34) {
  const tip = polar(base[0], base[1], len, deg);
  const c1 = polar(base[0], base[1], len * 0.62, deg - spread);
  const c2 = polar(base[0], base[1], len * 0.62, deg + spread);
  return `M${pt(base)}Q${pt(c1)} ${pt(tip)}Q${pt(c2)} ${pt(base)}`;
}

type Tone = "gold" | "ivory" | "ink" | "lapis";
const STROKE: Record<Tone, string> = {
  gold: "url(#orn-gold)",
  ivory: "#f4ecdc",
  ink: "#2a231c",
  lapis: "#1f3b6e",
};

type OrnProps = Omit<SVGProps<SVGSVGElement>, "children"> & { tone?: Tone; weight?: number };

function Svg({ viewBox, tone = "gold", weight = 1.2, className = "", style, ...rest }: OrnProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox={viewBox}
      aria-hidden
      focusable="false"
      className={`orn ${className}`}
      style={{ stroke: STROKE[tone], strokeWidth: weight, ...style } as CSSProperties}
      {...rest}
    />
  );
}

/* ---------------- Shamseh: sunburst medallion ---------------- */
export function Shamseh(props: OrnProps) {
  const c = 100;
  const rays = range(16).map((i) => {
    const a = (i * 360) / 16;
    const d = 9.5;
    return `M${pt(polar(c, c, 57, a - d))}Q${pt(polar(c, c, 79, a - d * 0.5))} ${pt(polar(c, c, 90, a))}Q${pt(polar(c, c, 79, a + d * 0.5))} ${pt(polar(c, c, 57, a + d))}`;
  });
  const thin = range(16).map((i) => {
    const a = (i * 360) / 16 + 11.25;
    return `M${pt(polar(c, c, 58, a))}L${pt(polar(c, c, 72, a))}`;
  });
  const petals = range(8).map((i) => {
    const a = (i * 360) / 8;
    return `M${pt(polar(c, c, 21, a - 16))}Q${pt(polar(c, c, 44, a - 13))} ${pt(polar(c, c, 51, a))}Q${pt(polar(c, c, 44, a + 13))} ${pt(polar(c, c, 21, a + 16))}`;
  });
  const star = range(16)
    .map((i) => pt(polar(c, c, i % 2 ? 11 : 21, (i * 360) / 16)))
    .join("L");
  return (
    <Svg viewBox="0 0 200 200" {...props}>
      <g fill="none">
        <circle {...DL} cx={c} cy={c} r={97} />
        <circle {...DL} cx={c} cy={c} r={93} style={{ "--d": "0.15s" } as CSSProperties} />
        {rays.map((d, i) => (
          <path key={i} {...DL} d={d} style={{ "--d": `${0.3 + i * 0.03}s` } as CSSProperties} />
        ))}
        {thin.map((d, i) => (
          <path key={i} {...DL} d={d} style={{ "--d": "0.7s" } as CSSProperties} />
        ))}
        <circle {...DL} cx={c} cy={c} r={56} style={{ "--d": "0.5s" } as CSSProperties} />
        {petals.map((d, i) => (
          <path key={i} {...DL} d={d} style={{ "--d": `${0.8 + i * 0.05}s` } as CSSProperties} />
        ))}
        <path {...DL} d={`M${star}Z`} style={{ "--d": "1.1s" } as CSSProperties} />
        <circle {...DL} cx={c} cy={c} r={5} style={{ "--d": "1.3s" } as CSSProperties} />
      </g>
      <g className="fl" fill="url(#orn-gold)" stroke="none" opacity="0.9">
        {range(32).map((i) => {
          const [x, y] = polar(c, c, 95, (i * 360) / 32);
          return <circle key={i} cx={x} cy={y} r={0.9} />;
        })}
      </g>
    </Svg>
  );
}

/* ---------------- Islimi: arabesque vine ---------------- */
export function Vine({ length = 420, ...props }: OrnProps & { length?: number }) {
  const W = length;
  const H = 160;
  const mid = 84;
  const amp = 34;
  const cycles = W / 280;
  const y = (x: number) => mid + amp * Math.sin((x / W) * Math.PI * 2 * cycles);
  const stem: string[] = [];
  for (let x = 0; x <= W; x += 6) stem.push(pt([x, r2(y(x))]));
  // Peaks and troughs get a curling tendril; midpoints get a leaf.
  const features: { x: number; up: boolean }[] = [];
  for (let k = 0; k < cycles * 2; k++) {
    const x = ((k + 0.5) / (2 * cycles)) * W;
    if (x > 8 && x < W - 8) features.push({ x, up: k % 2 === 0 });
  }
  return (
    <Svg viewBox={`0 0 ${W} ${H}`} {...props}>
      <g fill="none">
        <path {...DL} d={`M${stem.join("L")}`} />
        {features.map((f, i) => {
          const s: [number, number] = [r2(f.x), r2(y(f.x))];
          const center: [number, number] = [r2(f.x + 20), r2(s[1] + (f.up ? -26 : 26))];
          const tendril = spiralFrom(s, center, 1.55, 0.18, !f.up);
          const lx = f.x + W / (4 * cycles);
          const lb: [number, number] = [r2(lx), r2(y(lx))];
          return (
            <g key={i} style={{ "--d": `${0.4 + i * 0.18}s` } as CSSProperties}>
              <path {...DL} d={tendril} />
              {lx < W - 10 && <path {...DL} d={leaf(lb, f.up ? 150 : 30, 26)} />}
              <path {...DL} d={leaf(s, f.up ? 205 : -25, 18, 30)} />
            </g>
          );
        })}
      </g>
      <g className="fl" fill="url(#orn-gold)" stroke="none">
        {features.map((f, i) => (
          <circle key={i} cx={r2(f.x + 20)} cy={r2(y(f.x) + (f.up ? -26 : 26))} r={1.8} />
        ))}
      </g>
    </Svg>
  );
}

/* ---------------- Lotus ---------------- */
export function Lotus(props: OrnProps) {
  const base: [number, number] = [100, 150];
  const spec = [
    [-68, 52],
    [-44, 72],
    [-21, 90],
    [0, 106],
    [21, 90],
    [44, 72],
    [68, 52],
  ];
  return (
    <Svg viewBox="0 0 200 200" {...props}>
      <g fill="none">
        {spec.map(([deg, len], i) => (
          <path key={i} {...DL} d={leaf(base, deg, len, 15 + Math.abs(deg) * 0.05)} style={{ "--d": `${0.2 + Math.abs(3 - i) * 0.15}s` } as CSSProperties} />
        ))}
        {[-21, 0, 21].map((deg) => (
          <path key={deg} {...DL} d={`M${pt(polar(base[0], base[1], 14, deg))}L${pt(polar(base[0], base[1], deg ? 70 : 86, deg))}`} style={{ "--d": "0.9s" } as CSSProperties} />
        ))}
        <path {...DL} d="M56 150Q100 178 144 150" style={{ "--d": "0.1s" } as CSSProperties} />
        <path {...DL} d="M66 158Q100 182 134 158" style={{ "--d": "0.15s" } as CSSProperties} />
        <path {...DL} d="M100 172L100 198" />
        <path {...DL} d={leaf([100, 190], -62, 46, 22)} style={{ "--d": "0.6s" } as CSSProperties} />
        <path {...DL} d={leaf([100, 190], 62, 46, 22)} style={{ "--d": "0.6s" } as CSSProperties} />
      </g>
      <circle className="fl" cx="100" cy="44" r="2.4" fill="url(#orn-gold)" stroke="none" />
    </Svg>
  );
}

/* ---------------- Ruyi cloud scroll ---------------- */
export function Cloud(props: OrnProps) {
  return (
    <Svg viewBox="0 0 240 100" {...props}>
      <g fill="none">
        <path {...DL} d="M10 72C10 40 50 28 70 44C86 58 70 74 56 64C46 56 56 46 64 52" />
        <path {...DL} d="M70 44C88 20 130 18 140 42C148 62 126 70 118 58C112 48 124 42 130 50" style={{ "--d": "0.25s" } as CSSProperties} />
        <path {...DL} d="M140 42C160 24 200 30 206 56C210 76 186 82 180 68C176 58 188 54 192 60" style={{ "--d": "0.5s" } as CSSProperties} />
        <path {...DL} d="M10 72C60 86 160 88 230 72" style={{ "--d": "0.7s" } as CSSProperties} />
      </g>
    </Svg>
  );
}

/* ---------------- Rosette corner (top-left; rotate for others) ---------------- */
export function Corner(props: OrnProps) {
  const c: [number, number] = [26, 26];
  const petals = range(8).map((i) => leaf(c, i * 45, 14, 26));
  const along = (swap: boolean) => {
    const P = (x: number, yy: number): [number, number] => (swap ? [yy, x] : [x, yy]);
    const start = P(40, 26);
    return `M${pt(P(40, 26))}C${pt(P(62, 26))} ${pt(P(74, 12))} ${pt(P(94, 16))}` + spiralFrom(P(94, 16), P(96, 26), 1.3, 0.2, !swap).replace("M", "L") + `M${pt(start)}`;
  };
  return (
    <Svg viewBox="0 0 120 120" {...props}>
      <g fill="none">
        <circle {...DL} cx={c[0]} cy={c[1]} r={15} />
        {petals.map((d, i) => (
          <path key={i} {...DL} d={d} style={{ "--d": `${0.2 + i * 0.04}s` } as CSSProperties} />
        ))}
        <path {...DL} d={along(false)} style={{ "--d": "0.5s" } as CSSProperties} />
        <path {...DL} d={along(true)} style={{ "--d": "0.5s" } as CSSProperties} />
        <path {...DL} d={leaf([62, 26], 160, 16, 30)} style={{ "--d": "0.8s" } as CSSProperties} />
        <path {...DL} d={leaf([26, 62], 110, 16, 30)} style={{ "--d": "0.8s" } as CSSProperties} />
      </g>
      <circle className="fl" cx={c[0]} cy={c[1]} r={3} fill="url(#orn-gold)" stroke="none" />
    </Svg>
  );
}

/* ---------------- Small divider: lotus bud between two rules ---------------- */
export function Divider({ className = "", tone = "gold" }: { className?: string; tone?: Tone }) {
  return (
    <svg viewBox="0 0 240 24" aria-hidden className={`orn ${className}`} style={{ stroke: tone === "gold" ? "#c99a3c" : STROKE[tone], strokeWidth: 1.1 }}>
      <g fill="none">
        <path {...DL} d="M4 12H96" />
        <path {...DL} d="M144 12H236" />
        <path {...DL} d={leaf([120, 22], 0, 20, 26)} style={{ "--d": "0.3s" } as CSSProperties} />
        <path {...DL} d={leaf([120, 22], -55, 14, 26)} style={{ "--d": "0.4s" } as CSSProperties} />
        <path {...DL} d={leaf([120, 22], 55, 14, 26)} style={{ "--d": "0.4s" } as CSSProperties} />
      </g>
      <circle className="fl" cx="100" cy="12" r="2" fill="url(#orn-gold)" stroke="none" />
      <circle className="fl" cx="140" cy="12" r="2" fill="url(#orn-gold)" stroke="none" />
    </svg>
  );
}

/* ---------------- Pointed arch ---------------- */
/** Normalised (0–1) pointed-arch outline, shared by the clip-path and the gilded frame. */
export const ARCH_D = "M0 1L0 0.4C0 0.2 0.3 0.08 0.5 0C0.7 0.08 1 0.2 1 0.4L1 1Z";

/** Gold double outline drawn on top of an arch-clipped picture. */
export function ArchOutline({ className = "" }: { className?: string }) {
  const outer = "M0.5 99.5L0.5 40C0.5 20 30 8 50 0.5C70 8 99.5 20 99.5 40L99.5 99.5Z";
  const inner = "M4 99.5L4 41C4 23.5 31 12.5 50 5C69 12.5 96 23.5 96 41L96 99.5";
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full overflow-visible ${className}`}>
      <g className="fl" fill="none" stroke="url(#orn-gold)" vectorEffect="non-scaling-stroke">
        <path d={outer} strokeWidth="2.2" vectorEffect="non-scaling-stroke" />
        <path d={inner} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  );
}

/** Shared <defs>: the gilded gradient and the arch clip path. Render once. */
export function OrnamentDefs() {
  return (
    <svg width="0" height="0" aria-hidden focusable="false" style={{ position: "absolute" }}>
      <defs>
        <linearGradient id="orn-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f0d58e" />
          <stop offset="0.45" stopColor="#c99a3c" />
          <stop offset="0.7" stopColor="#e9c977" />
          <stop offset="1" stopColor="#a87b2a" />
        </linearGradient>
        <clipPath id="arch-clip" clipPathUnits="objectBoundingBox">
          <path d={ARCH_D} />
        </clipPath>
      </defs>
    </svg>
  );
}
