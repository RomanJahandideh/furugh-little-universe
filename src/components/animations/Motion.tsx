"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* ScrollLit: words go from dim to bright as the paragraph is read.    */
/* ------------------------------------------------------------------ */
export function ScrollLit({
  text,
  as = "p",
  className = "",
  accent = [],
}: {
  text: string;
  as?: ElementType;
  className?: string;
  /** Words (exact, without punctuation) that light up in pink instead of white. */
  accent?: string[];
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  const Tag = as;
  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        const isAccent = accent.includes(w.replace(/[^\p{L}\p{N}']/gu, ""));
        return (
          <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]} still={!!reduce} accent={isAccent}>
            {w}
          </Word>
        );
      })}
    </Tag>
  );
}

function Word({
  children,
  progress,
  range,
  still,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  still: boolean;
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <>
      <motion.span style={{ opacity: still ? 1 : opacity, color: accent ? "var(--pink)" : undefined }}>{children}</motion.span>{" "}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Tilt3D: tips back in perspective and settles flat as it scrolls in; */
/* on desktop it also leans toward the cursor.                          */
/* ------------------------------------------------------------------ */
export function Tilt3D({
  children,
  className = "",
  max = 7,
  from = 22,
}: {
  children: ReactNode;
  className?: string;
  /** Max cursor tilt in degrees. */
  max?: number;
  /** Starting scroll tilt in degrees. */
  from?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.35"] });
  const enter = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.6 });
  const rotateScroll = useTransform(enter, [0, 1], [from, 0]);
  const scale = useTransform(enter, [0, 1], [0.9, 1]);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(py, { stiffness: 200, damping: 20 });
  const ry = useSpring(px, { stiffness: 200, damping: 20 });
  const rotateX = useTransform([rotateScroll, rx] as MotionValue<number>[], ([a, b]: number[]) => a + b);
  const shine = useMotionTemplate`radial-gradient(500px circle at ${useTransform(px, [-max, max], [100, 0])}% ${useTransform(py, [max, -max], [100, 0])}%, rgba(255,255,255,0.10), transparent 45%)`;

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={className} style={{ perspective: 1400 }}>
      <motion.div
        style={{ rotateX, rotateY: ry, scale, transformOrigin: "50% 100%", transformStyle: "preserve-3d" }}
        className="relative h-full will-change-transform"
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          px.set(((e.clientX - r.left) / r.width - 0.5) * 2 * max);
          py.set(-((e.clientY - r.top) / r.height - 0.5) * 2 * max);
        }}
        onPointerLeave={() => {
          px.set(0);
          py.set(0);
        }}
      >
        {children}
        <motion.span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: shine }} />
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Parallax: gentle vertical drift tied to scroll.                      */
/* ------------------------------------------------------------------ */
export function Parallax({ children, className = "", distance = 60 }: { children: ReactNode; className?: string; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y }}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee: an endless band of words.                                   */
/* ------------------------------------------------------------------ */
export function Marquee({ items, className = "", style }: { items: string[]; className?: string; style?: CSSProperties }) {
  const row = [...items, ...items];
  return (
    <div aria-hidden className={`overflow-hidden ${className}`} style={style}>
      <div className="marquee flex w-max gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            {t}
            <span className="text-pink">&#10022;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
