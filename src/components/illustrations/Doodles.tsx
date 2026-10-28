/**
 * Furugh's doodle vocabulary. Every drawing shares one pen: 2.4px ink stroke,
 * round caps, slightly wobbly geometry. Paths use pathLength=1 so any doodle
 * inside a <Reveal> draws itself on (see .draw in globals.css).
 */
import type { CSSProperties, ReactNode, SVGProps } from "react";

// pathLength=1 + dasharray "1 1" lets CSS draw any stroke on by animating its offset.
const L = { pathLength: 1, strokeDasharray: "1 1" } as const;

type DoodleProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  title?: string;
  draw?: boolean;
};

function Svg({ viewBox, title, draw = true, className = "", children, ...rest }: DoodleProps & { children: ReactNode }) {
  return (
    <svg
      viewBox={viewBox}
      className={`doodle ${draw ? "draw" : ""} ${className}`}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const Smile = (p: DoodleProps) => (
  <Svg viewBox="0 0 64 64" {...p}>
    <path {...L} d="M32 5c15 0 27 11 27 26.5S47.5 59 31 59 4.5 47 5 31.5 17 5.2 32 5Z" />
    <path {...L} className="anim-blink" d="M22 25v5M41 24v5" />
    <path {...L} d="M18 38c5 8 22 9 28-1" />
  </Svg>
);

export const Star = (p: DoodleProps) => (
  <Svg viewBox="0 0 64 64" {...p}>
    <path {...L} d="M32 5l7.5 17.5 19 1.8-14.4 12.4 4.6 18.8L32 45.3 15.6 55.8l4.3-18.9L5.5 24.3l19-1.6Z" />
  </Svg>
);

export const Sparkle = ({ fillColor, ...p }: DoodleProps & { fillColor?: string }) => (
  <Svg viewBox="0 0 48 48" {...p}>
    <path {...L} fill={fillColor ?? "none"} d="M24 3c1.6 11 4.8 17.8 21 21-16 2.6-19.4 9.6-21 21-1.8-11.6-5.6-18.4-21-21 15.4-3 19.4-9.8 21-21Z" />
  </Svg>
);

export const Arrow = (p: DoodleProps) => (
  <Svg viewBox="0 0 120 60" {...p}>
    <path {...L} d="M6 40c18-24 48-30 70-14 9 6 16 8 30 6" />
    <path {...L} style={{ "--d": "0.6s" } as CSSProperties} d="M94 20l13 12-15 9" />
  </Svg>
);

export const ArrowDown = (p: DoodleProps) => (
  <Svg viewBox="0 0 40 90" {...p}>
    <path {...L} d="M20 4c-8 16 10 24 2 40-4 9-3 20-1 38" />
    <path {...L} style={{ "--d": "0.6s" } as CSSProperties} d="M9 70l12 14 11-15" />
  </Svg>
);

export const ScribbleCircle = (p: DoodleProps) => (
  <Svg viewBox="0 0 200 90" preserveAspectRatio="none" {...p}>
    <path {...L} d="M150 12C112 2 40 6 14 30c-20 20 16 50 84 52 60 2 100-14 96-38-3-22-54-36-120-30" />
  </Svg>
);

export const Squiggle = (p: DoodleProps) => (
  <Svg viewBox="0 0 200 24" preserveAspectRatio="none" {...p}>
    <path {...L} d="M2 12c10-12 20-12 30 0s20 12 30 0 20-12 30 0 20 12 30 0 20-12 30 0 20 12 30 0 14-10 16-6" />
  </Svg>
);

export const Heart = ({ fillColor, ...p }: DoodleProps & { fillColor?: string }) => (
  <Svg viewBox="0 0 64 60" {...p}>
    <path {...L} fill={fillColor ?? "none"} d="M32 54C14 41 4 31 5.5 18.5 7 8 19 3 26.5 9.5 29 11.6 31 14.5 32 17c1.5-3 3.5-6 6.5-8 8-5.5 19.5-.5 20 10.5.6 12.5-10.5 23-26.5 34.5Z" />
  </Svg>
);

export const Flower = ({ fillColor, ...p }: DoodleProps & { fillColor?: string }) => (
  <Svg viewBox="0 0 64 64" {...p}>
    <g fill={fillColor ?? "none"}>
      <path {...L} d="M32 25c-6-8-4-19 0-20 5 1 6 12 0 20Z" />
      <path {...L} d="M38 29c9-4 19 1 19 5-1 5-12 6-19-1Z" />
      <path {...L} d="M35 37c4 9 0 19-4 19-5-2-4-12 2-19Z" />
      <path {...L} d="M27 36c-9 4-19-1-19-5 1-5 12-6 19 1Z" />
      <path {...L} d="M26 28c-8-5-9-15-6-17 5-1 10 8 8 16Z" />
    </g>
    <circle {...L} cx="32" cy="32" r="4.5" fill="var(--butter)" />
  </Svg>
);

export const Bolt = ({ fillColor, ...p }: DoodleProps & { fillColor?: string }) => (
  <Svg viewBox="0 0 48 64" {...p}>
    <path {...L} fill={fillColor ?? "none"} d="M28 3L7 36h15l-5 25 24-36H25l3-22Z" />
  </Svg>
);

export const Snowflake = (p: DoodleProps) => (
  <Svg viewBox="0 0 64 64" {...p}>
    <path {...L} d="M32 5v54M9 18l46 28M9 46l46-28" />
    <path {...L} d="M25 9l7 7 7-7M25 55l7-7 7 7M8 28l10 2-3 9M56 36l-10-2 3-9M8 36l10-2-3-9M56 28l-10 2 3 9" />
  </Svg>
);

/** Nail polish bottle. `polish` is the liquid color. */
export const PolishBottle = ({ polish = "var(--pink)", ...p }: DoodleProps & { polish?: string }) => (
  <Svg viewBox="0 0 64 100" {...p}>
    <path {...L} d="M24 6c4-2 12-2 16 0l1 30H23Z" />
    <path {...L} d="M26 14h12M26 22h12" />
    <path {...L} d="M18 38c8-3 20-3 28 0 9 4 12 14 11 30-1 18-6 27-25 27S7 86 7 68c-1-16 2-26 11-30Z" />
    <path fill={polish} stroke="none" d="M10 62c14 4 30 4 44 0 1 18-5 28-22 28S9 80 10 62Z" opacity="0.95" />
    <path {...L} d="M10 62c14 4 30 4 44 0" />
    <path {...L} d="M17 48c2-3 5-5 8-5" />
  </Svg>
);

/**
 * A raised hand with five painted nails. `nails` sets each nail's color
 * (thumb, index, middle, ring, pinky); nails animate between colors.
 */
export const Hand = ({ nails = ["var(--pink)"], ...p }: DoodleProps & { nails?: string[] }) => {
  const c = (i: number) => nails[i % nails.length];
  const nail = { stroke: "var(--ink)", strokeWidth: 2, style: { transition: "fill 0.6s var(--ease-out)" } };
  return (
    <Svg viewBox="0 0 120 160" {...p}>
      <path {...L} d="M30 84V42c0-10 16-11 16 0v37" />
      <path {...L} d="M47 78V29c0-11 17-11 17 0v49" />
      <path {...L} d="M65 79V37c0-10 17-10 17 0v43" />
      <path {...L} d="M83 82V54c0-9 15-9 15 0v38" />
      <path {...L} d="M30 84c-6 16-6 34-2 46 5 15 18 21 36 21 21 0 33-10 35-30 1-11 0-20-1-29" />
      <path {...L} d="M31 99c-7-3-14-9-18-19-3-8 1-14 7-13 5 1 7 6 11 14" />
      <path {...L} d="M46 79c0 4 0 6 1 8M64 78v8M82 80v7" />
      <ellipse cx="38" cy="39" rx="5.2" ry="6.6" fill={c(1)} {...nail} />
      <ellipse cx="55.5" cy="26.5" rx="5.4" ry="6.8" fill={c(2)} {...nail} />
      <ellipse cx="73.5" cy="34.5" rx="5.2" ry="6.6" fill={c(3)} {...nail} />
      <ellipse cx="90.5" cy="52" rx="4.6" ry="5.8" fill={c(4)} {...nail} />
      <ellipse cx="16.5" cy="71.5" rx="4.6" ry="5.6" transform="rotate(-35 16.5 71.5)" fill={c(0)} {...nail} />
    </Svg>
  );
};

export const ShoppingBag = ({ fillColor, ...p }: DoodleProps & { fillColor?: string }) => (
  <Svg viewBox="0 0 90 100" {...p}>
    <path {...L} fill={fillColor ?? "none"} d="M10 30c22-2 48-2 70 0l4 64c-26 3-52 3-78 0Z" />
    <path {...L} d="M30 30c-2-26 32-28 30 0" />
    <path {...L} className="anim-blink" d="M34 52v5M56 51v5" />
    <path {...L} d="M31 66c7 9 22 9 29-1" />
  </Svg>
);

export const PriceTag = (p: DoodleProps) => (
  <Svg viewBox="0 0 80 60" {...p}>
    <path {...L} d="M22 6h50c3 0 4 2 4 5v38c0 3-1 5-4 5H22L4 30Z" />
    <circle {...L} cx="20" cy="30" r="4" />
    <path {...L} d="M36 22h28M36 34h20" />
  </Svg>
);

export const Hanger = (p: DoodleProps) => (
  <Svg viewBox="0 0 100 60" {...p}>
    <path {...L} d="M44 14c0-8 12-8 12 0 0 5-6 6-6 11v4" />
    <path {...L} d="M50 29L6 50c-4 2-3 6 2 6h84c5 0 6-4 2-6Z" />
  </Svg>
);

export const SpeechBubble = ({ fillColor, ...p }: DoodleProps & { fillColor?: string }) => (
  <Svg viewBox="0 0 120 80" preserveAspectRatio="none" {...p}>
    <path {...L} fill={fillColor ?? "var(--white)"} d="M14 6c30-3 64-3 94 0 7 1 9 6 9 13 0 15 0 25-1 34-1 6-4 9-10 9H44L22 76l4-14h-12c-6 0-9-3-10-9-1-11-1-22 0-34 1-8 4-12 10-13Z" />
  </Svg>
);

/** Placeholder doodle portrait. Swap for a real photo in the landing hero. */
export const Avatar = (p: DoodleProps) => (
  <Svg viewBox="0 0 200 220" {...p}>
    <path {...L} d="M44 92c-6-50 26-76 60-74 38 2 62 32 54 78 10 30 14 64 2 100M44 92c-12 34-14 72-2 104" />
    <path {...L} fill="var(--white)" d="M100 48c32 0 50 24 50 60 0 40-22 66-50 66s-50-26-50-66c0-36 18-60 50-60Z" />
    <path {...L} d="M52 92c24 0 52-12 66-40 6 18 18 32 32 38" />
    <path {...L} className="anim-blink" d="M80 112c0 4 0 7 1 9M120 112c0 4 0 7-1 9" />
    <path {...L} d="M84 142c9 9 25 9 34-1" />
    <circle cx="70" cy="132" r="8" fill="var(--pink)" opacity="0.45" stroke="none" />
    <circle cx="130" cy="132" r="8" fill="var(--pink)" opacity="0.45" stroke="none" />
    <path {...L} d="M100 118c-3 6-4 10 2 11" />
    <path {...L} d="M72 172c-14 6-24 18-28 40M128 172c14 6 24 18 28 40" />
  </Svg>
);

/** A small friendly customer. `tint` colors the shirt. */
export const Shopper = ({ tint = "var(--mint)", ...p }: DoodleProps & { tint?: string }) => (
  <Svg viewBox="0 0 60 110" {...p}>
    <circle {...L} cx="30" cy="20" r="14" fill="var(--white)" />
    <path {...L} d="M24 18v3M36 18v3M24 26c4 4 9 4 12 0" />
    <path {...L} fill={tint} d="M12 46c4-8 32-8 36 0l6 34c-14 4-34 4-48 0Z" />
    <path {...L} d="M22 82v24M38 82v24" />
  </Svg>
);

/** Furugh-ish waving character for Chapter 1 (not a likeness). */
export const Waver = (p: DoodleProps) => (
  <Svg viewBox="0 0 160 220" {...p}>
    <path {...L} d="M52 62c-4-34 14-50 32-50 22 0 38 18 34 50 6 20 6 40 0 58M52 62c-8 22-8 40-2 58" />
    <circle {...L} cx="84" cy="62" r="30" fill="var(--white)" />
    <path {...L} d="M56 54c18 0 34-8 42-26 4 12 12 20 22 24" />
    <path {...L} className="anim-blink" d="M74 66v5M95 66v5" />
    <path {...L} d="M73 80c6 6 16 6 22-1" />
    <circle cx="66" cy="76" r="5" fill="var(--pink)" opacity="0.45" stroke="none" />
    <circle cx="103" cy="76" r="5" fill="var(--pink)" opacity="0.45" stroke="none" />
    <path {...L} fill="var(--butter)" d="M50 116c8-14 60-14 68 0l10 70c-28 8-60 8-88 0Z" />
    <path {...L} d="M54 124c-14 14-22 30-26 48" />
    <g className="anim-wave">
      <path {...L} d="M114 122c14-10 22-26 24-46" />
      <path {...L} d="M132 74c-2-8 0-14 4-16M138 76c0-8 3-14 7-15M141 82c2-6 6-9 9-8" />
    </g>
    <path {...L} d="M70 190v24M98 190v24" />
  </Svg>
);

export const Cart = (p: DoodleProps) => (
  <Svg viewBox="0 0 110 80" {...p}>
    <path {...L} d="M4 8h14l12 46h60l12-34H24" />
    <path {...L} d="M34 36h60M30 22l4 32" />
    <circle {...L} cx="38" cy="68" r="7" />
    <circle {...L} cx="82" cy="68" r="7" />
  </Svg>
);

export const Toolbox = (p: DoodleProps) => (
  <Svg viewBox="0 0 100 70" {...p}>
    <path {...L} fill="var(--coral)" d="M6 24h88v40H6Z" />
    <path {...L} d="M36 24v-10h28v10M6 38h88" />
    <path {...L} d="M44 34h12v8H44Z" />
  </Svg>
);

export const House = (p: DoodleProps) => (
  <Svg viewBox="0 0 100 90" {...p}>
    <path {...L} d="M8 44L50 8l42 36" />
    <path {...L} d="M18 36v48h64V36" />
    <path {...L} fill="var(--butter)" d="M42 84V58h16v26" />
    <path {...L} d="M26 48h12v10H26ZM62 48h12v10H62Z" />
  </Svg>
);

export const Shelf = ({ items = ["var(--mint)", "var(--pink)", "var(--butter)"], ...p }: DoodleProps & { items?: string[] }) => (
  <Svg viewBox="0 0 160 100" {...p}>
    <path {...L} d="M6 4v94M154 4v94M6 46h148M6 94h148" />
    <path {...L} fill={items[0]} d="M16 46V24h24v22" />
    <path {...L} fill={items[1]} d="M46 46V14h18v32" />
    <path {...L} fill={items[2]} d="M72 46V28h30v18" />
    <path {...L} fill={items[1]} d="M110 46V20h34v26" />
    <path {...L} fill={items[2]} d="M18 94V70h30v24" />
    <path {...L} fill={items[0]} d="M56 94V62h22v32" />
    <path {...L} fill={items[1]} d="M88 94V74h22v20" />
    <path {...L} fill={items[0]} d="M118 94V66h26v28" />
  </Svg>
);

export const Box = ({ fillColor = "var(--butter)", ...p }: DoodleProps & { fillColor?: string }) => (
  <Svg viewBox="0 0 60 56" {...p}>
    <path {...L} fill={fillColor} d="M4 14l26-10 26 10v30L30 54 4 44Z" />
    <path {...L} d="M4 14l26 10 26-10M30 24v30" />
  </Svg>
);

export const Rack = (p: DoodleProps) => (
  <Svg viewBox="0 0 220 160" {...p}>
    <path {...L} d="M14 20h192M20 20v134M200 20v134M8 154h24M188 154h24" />
    {[40, 88, 136, 172].map((x, i) => (
      <g key={x} className="anim-wobble" style={{ animationDelay: `${i * 0.3}s`, transformOrigin: `${x}px 20px` } as CSSProperties}>
        <path {...L} d={`M${x} 20v8`} />
        <path
          {...L}
          fill={["var(--pink)", "var(--lilac)", "var(--mint)", "var(--butter)"][i]}
          d={
            i % 2
              ? `M${x - 18} 40c6-8 30-8 36 0l6 76h-48Z`
              : `M${x - 16} 38c5-10 27-10 32 0l4 22-6 2v52h-28v-52l-6-2Z`
          }
        />
        <path {...L} d={`M${x - 18} 40l18-12 18 12`} />
      </g>
    ))}
  </Svg>
);

export const Checkout = (p: DoodleProps) => (
  <Svg viewBox="0 0 160 100" {...p}>
    <path {...L} d="M4 60h152v36H4Z" />
    <path {...L} fill="var(--mint)" d="M100 22h44v30h-44Z" />
    <path {...L} d="M122 52v8M108 32h14M108 40h28" />
    <path {...L} d="M10 60l10-14h60l6 14" />
    <path {...L} d="M30 60V50M44 60V48M58 60V50" />
  </Svg>
);

export const Chat = (p: DoodleProps) => (
  <Svg viewBox="0 0 64 64" {...p}>
    <path {...L} d="M8 12c16-3 32-3 46 0 4 1 5 4 5 8v18c0 4-2 6-6 6H30L16 56l3-12h-9c-4 0-6-2-6-6V20c0-5 2-7 4-8Z" />
    <path {...L} d="M18 26h28M18 34h18" />
  </Svg>
);

export const Compass = (p: DoodleProps) => (
  <Svg viewBox="0 0 64 64" {...p}>
    <circle {...L} cx="32" cy="32" r="26" />
    <path {...L} fill="var(--coral)" d="M40 18l-5 18-11 10 5-18Z" />
  </Svg>
);

export const Shuffle = (p: DoodleProps) => (
  <Svg viewBox="0 0 64 64" {...p}>
    <path {...L} d="M6 18c18 0 22 28 40 28h10M6 46c18 0 22-28 40-28h10" />
    <path {...L} d="M50 10l8 8-8 8M50 38l8 8-8 8" />
  </Svg>
);

export const HighFive = (p: DoodleProps) => (
  <Svg viewBox="0 0 64 64" {...p}>
    <path {...L} d="M14 54c-6-8-8-18-6-26 1-4 6-4 7 0l2 8V12c0-4 6-4 6 0v18-22c0-4 6-4 6 0v22-18c0-4 6-4 6 0v20" />
    <path {...L} d="M50 54c6-8 8-18 6-26-1-4-6-4-7 0l-2 8V12c0-4-6-4-6 0" />
    <path {...L} d="M30 6l2-4M22 8l-2-4M38 8l2-4" />
  </Svg>
);

export const Radar = (p: DoodleProps) => (
  <Svg viewBox="0 0 64 64" {...p}>
    <path {...L} d="M32 32m-26 0a26 26 0 1 0 52 0a26 26 0 1 0-52 0M32 32m-15 0a15 15 0 1 0 30 0a15 15 0 1 0-30 0" />
    <path {...L} d="M32 32l18-18" />
    <circle cx="44" cy="22" r="4" fill="var(--pink)" stroke="none" />
  </Svg>
);

export const Lightning = (p: DoodleProps) => (
  <Svg viewBox="0 0 64 64" {...p}>
    <path {...L} d="M8 50c6-6 10-6 16 0s10 6 16 0 10-6 16 0" />
    <path {...L} fill="var(--butter)" d="M34 4L20 30h12l-4 16 16-24H32Z" />
  </Svg>
);

export const Ribbon = (p: DoodleProps) => (
  <Svg viewBox="0 0 64 64" {...p}>
    <circle {...L} cx="32" cy="24" r="16" fill="var(--lilac)" />
    <path {...L} d="M22 36L14 60l10-6 6 8 2-22M42 36l8 24-10-6-6 8-2-22" />
    <path {...L} d="M26 24l4 4 8-9" />
  </Svg>
);

export const Paint = ({ color, ...p }: DoodleProps & { color: string }) => (
  <Svg viewBox="0 0 80 72" draw={false} {...p}>
    <path fill={color} stroke="var(--ink)" strokeWidth="2.4" d="M40 6c14-2 28 6 32 20 4 12-4 18-4 26 0 10-10 16-20 14-8-2-12-8-20-6-10 2-20-2-22-12-2-12 6-14 4-24C8 14 24 8 40 6Z" />
    <path fill="none" stroke="var(--white)" strokeWidth="3" strokeLinecap="round" opacity="0.7" d="M24 22c4-4 9-6 14-6" />
  </Svg>
);
