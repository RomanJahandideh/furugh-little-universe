import type { SVGProps } from "react";

/**
 * A thin-line gear drawn from geometry. `teeth` sets the tooth count; two
 * gears mesh correctly when their radii are in the same ratio as their teeth
 * (radius = teeth * 1.5 here), and one turns `teethA / teethB` times as fast
 * as the other, in the opposite direction.
 */
export function gearRadius(teeth: number) {
  return teeth * 1.5;
}

export function Gear({ teeth, spokes = 5, ...props }: { teeth: number; spokes?: number } & SVGProps<SVGSVGElement>) {
  const r = gearRadius(teeth);
  const outer = r + 3;
  const root = r - 3;
  const pts: string[] = [];
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    // Trapezoid tooth: root → tip → tip → root
    const p = (rad: number, ang: number) => `${(Math.cos(ang) * rad).toFixed(2)} ${(Math.sin(ang) * rad).toFixed(2)}`;
    pts.push(p(root, a - step * 0.3), p(outer, a - step * 0.16), p(outer, a + step * 0.16), p(root, a + step * 0.3));
  }
  const hub = Math.max(4, r * 0.22);
  const rim = r - 7;
  const size = outer + 2;
  return (
    <svg viewBox={`${-size} ${-size} ${size * 2} ${size * 2}`} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinejoin="round" aria-hidden {...props}>
      <path d={`M${pts.join("L")}Z`} />
      {rim > hub + 4 && <circle r={rim} />}
      <circle r={hub} />
      <circle r={1.6} fill="currentColor" stroke="none" />
      {rim > hub + 4 &&
        Array.from({ length: spokes }, (_, i) => {
          const a = (i * Math.PI * 2) / spokes;
          return <line key={i} x1={Math.cos(a) * hub} y1={Math.sin(a) * hub} x2={Math.cos(a) * rim} y2={Math.sin(a) * rim} />;
        })}
    </svg>
  );
}
