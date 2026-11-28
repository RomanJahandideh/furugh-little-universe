"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import zoomData from "@/data/zoom-images.json";
import { ArtImage } from "@/components/gallery/ArtImage";
import type { GalleryArtwork } from "@/lib/artworks";
import { asset } from "@/lib/paths";
import { NailSection, SectionHead } from "./parts";

/** Designs shown under the glass, with the detail worth looking for. */
const PIECES = [
  { id: "img-8329", look: "Look for the tiny highlights in each bear’s eyes and the hand-placed dots between the hearts." },
  { id: "img-3436", look: "Follow the gold glitter line as it hugs the curve of each cuticle." },
  { id: "img-4306", look: "Each zebra stripe is painted freehand; no two are the same width." },
  { id: "img-0291", look: "Find the small doodle on the white accent nail, drawn with a fine brush." },
];

const MIN = 1.5;
const MAX = 6;
const zoomSrc = (id: string) => (zoomData as Record<string, string>)[id];

export function NailLoupe({ art }: { art: (id: string) => GalleryArtwork | undefined }) {
  const pieces = PIECES.map((p) => ({ ...p, a: art(p.id) })).filter((p): p is typeof p & { a: GalleryArtwork } => !!p.a);
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(2.5);
  const [active, setActive] = useState(false);
  const [touch, setTouch] = useState(false);
  const [size, setSize] = useState({ w: 1, h: 1 });
  const [hiLoaded, setHiLoaded] = useState<Record<string, boolean>>({});
  const stage = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const piece = pieces[index];
  const hi = piece ? (zoomSrc(piece.id) ? asset(zoomSrc(piece.id)) : piece.a.full) : "";

  // Lens centre in stage pixels; springs give the glass a little weight.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, reduce ? { stiffness: 2000, damping: 100 } : { stiffness: 420, damping: 32, mass: 0.6 });
  const sy = useSpring(py, reduce ? { stiffness: 2000, damping: 100 } : { stiffness: 420, damping: 32, mass: 0.6 });

  const lens = touch ? 150 : 230;
  const lift = touch ? lens * 0.75 : 0; // keep the glass above the finger
  const left = useTransform(sx, (v) => v * size.w - lens / 2);
  const top = useTransform(sy, (v) => v * size.h - lens / 2 - lift);
  const bgPos = useTransform([sx, sy], ([x, y]: number[]) => `${-(x * size.w * zoom - lens / 2)}px ${-(y * size.h * zoom - lens / 2)}px`);
  const mapLeft = useTransform(sx, (v) => `${(v - 0.5 / zoom) * 100}%`);
  const mapTop = useTransform(sy, (v) => `${(v - 0.5 / zoom) * 100}%`);

  // Track the stage size.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, [index]);

  // Preload the high-definition photos once the section is near.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      pieces.forEach((p) => {
        const img = new Image();
        img.onload = () => setHiLoaded((m) => ({ ...m, [p.id]: true }));
        img.src = zoomSrc(p.id) ? asset(zoomSrc(p.id)) : p.a.full;
      });
    }, { rootMargin: "400px" });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once
  }, []);

  // Wheel zooms the glass (only while it is over the photo).
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!active) return;
      e.preventDefault();
      setZoom((z) => Math.min(MAX, Math.max(MIN, +(z - e.deltaY * 0.0025).toFixed(2))));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [active]);

  const move = useCallback((e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)));
    py.set(Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)));
  }, [px, py]);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 0.1 : 0.035;
    const k = e.key;
    if (k === "ArrowLeft") px.set(Math.max(0, px.get() - step));
    else if (k === "ArrowRight") px.set(Math.min(1, px.get() + step));
    else if (k === "ArrowUp") py.set(Math.max(0, py.get() - step));
    else if (k === "ArrowDown") py.set(Math.min(1, py.get() + step));
    else if (k === "+" || k === "=") setZoom((z) => Math.min(MAX, +(z + 0.5).toFixed(1)));
    else if (k === "-") setZoom((z) => Math.max(MIN, +(z - 0.5).toFixed(1)));
    else if (k === "Escape") return setActive(false);
    else return;
    e.preventDefault();
    setActive(true);
  };

  if (!piece) return null;
  const ratio = piece.a.width / piece.a.height;

  return (
    <NailSection tone="espresso" id="zoom">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHead id="zoom" n="02" label="Zoom in" title={<>Under the <em className="text-champagne">Glass</em></>} light className="lg:col-span-7" />
          <p className="leading-relaxed text-ivory/75 lg:col-span-4 lg:col-start-9">
            Nail art lives in details too small to see at a glance. Move the glass over the photo, scroll to zoom from {MIN}× to {MAX}×, and look closely at the brushwork in full resolution.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ---------- Stage ---------- */}
          <div className="lg:col-span-8">
            <div className="relative mx-auto" style={{ width: `min(100%, calc(72svh * ${ratio}))` }}>
              <div
                ref={stage}
                role="application"
                tabIndex={0}
                aria-label={`${piece.a.title}: magnifier. Move with the arrow keys, zoom with plus and minus.`}
                onPointerEnter={(e) => { setTouch(e.pointerType !== "mouse"); setActive(true); move(e); }}
                onPointerDown={(e) => { setTouch(e.pointerType !== "mouse"); setActive(true); move(e); }}
                onPointerMove={move}
                onPointerLeave={(e) => e.pointerType === "mouse" && setActive(false)}
                onPointerUp={(e) => e.pointerType !== "mouse" && setActive(false)}
                onFocus={() => setActive(true)}
                onBlur={() => setActive(false)}
                onKeyDown={onKey}
                className="group relative w-full touch-none select-none overflow-hidden bg-black/30 outline-none focus-visible:ring-2 focus-visible:ring-champagne md:cursor-none"
                style={{ aspectRatio: `${piece.a.width} / ${piece.a.height}` }}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={piece.id}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <ArtImage art={piece.a} sizes="(min-width: 1024px) 60vw, 92vw" decorative className="h-full w-full object-cover" />
                  </motion.div>
                </AnimatePresence>

                {/* Dim everything outside the glass a touch, so the lens reads as light. */}
                <motion.div
                  aria-hidden
                  animate={{ opacity: active ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="pointer-events-none absolute inset-0 bg-black/25"
                />

                {/* Idle hint */}
                <AnimatePresence>
                  {!active && (
                    <motion.div
                      aria-hidden
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="pointer-events-none absolute inset-0 grid place-items-center"
                    >
                      <span className="flex flex-col items-center gap-3">
                        <span className="loupe-pulse grid h-20 w-20 place-items-center rounded-full border border-white/70 bg-white/10 backdrop-blur-[2px]">
                          <LoupeIcon />
                        </span>
                        <span className="label rounded-full bg-black/45 px-4 py-2 text-white">{touch ? "Drag on the photo" : "Move over the photo"}</span>
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ---------- The glass ---------- */}
                <motion.div
                  aria-hidden
                  style={{ left, top, width: lens, height: lens }}
                  animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.6 }}
                  transition={{ type: "spring", stiffness: 380, damping: 24 }}
                  className="pointer-events-none absolute z-10"
                >
                  {/* handle */}
                  <span className="absolute left-[86%] top-[86%] block h-[20%] w-[42%] origin-left rotate-45 rounded-full bg-gradient-to-b from-[#7a5a4a] to-[#3a2622] shadow-[0_8px_18px_rgba(0,0,0,0.45)]" />
                  <span className="absolute left-[80%] top-[80%] block h-[16%] w-[16%] rotate-45 rounded-sm bg-gradient-to-br from-[#e6d3b5] to-[#a88a62]" />
                  {/* magnified photo */}
                  <motion.span
                    className="absolute inset-0 block rounded-full"
                    style={{
                      backgroundImage: `url(${hi})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: `${size.w * zoom}px ${size.h * zoom}px`,
                      backgroundPosition: bgPos,
                      backgroundColor: "#1d1513",
                    }}
                  />
                  {/* glass: rim, refraction edge, specular highlight */}
                  <span className="absolute inset-0 rounded-full shadow-[0_24px_50px_-12px_rgba(0,0,0,0.65),inset_0_0_0_1.5px_rgba(255,255,255,0.85),inset_0_0_0_7px_rgba(198,173,141,0.55),inset_0_0_0_8px_rgba(255,255,255,0.5),inset_0_0_18px_4px_rgba(0,0,0,0.18)]" />
                  <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_22%,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.12)_18%,transparent_38%)]" />
                  <span className="absolute inset-[10%] rounded-full border border-white/15" />
                  <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/60 px-2.5 py-1 text-[0.72rem] font-semibold text-white backdrop-blur-sm">
                    {zoom.toFixed(1)}× {!hiLoaded[piece.id] && "· loading HD"}
                  </span>
                </motion.div>
              </div>

              {/* Zoom controls */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-ivory">
                <span className="label text-champagne">Zoom</span>
                <button type="button" aria-label="Zoom out" onClick={() => setZoom((z) => Math.max(MIN, +(z - 0.5).toFixed(1)))} className="grid h-11 w-11 place-items-center rounded-full border border-ivory/40 text-xl hover:bg-ivory hover:text-espresso">&minus;</button>
                <input
                  type="range"
                  min={MIN}
                  max={MAX}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(+e.target.value)}
                  aria-label="Zoom level"
                  className="loupe-range h-11 min-w-0 flex-1 sm:max-w-xs"
                />
                <button type="button" aria-label="Zoom in" onClick={() => setZoom((z) => Math.min(MAX, +(z + 0.5).toFixed(1)))} className="grid h-11 w-11 place-items-center rounded-full border border-ivory/40 text-xl hover:bg-ivory hover:text-espresso">+</button>
                <span aria-live="polite" className="w-12 text-sm font-semibold tabular-nums">{zoom.toFixed(1)}×</span>
              </div>
            </div>
          </div>

          {/* ---------- Side panel ---------- */}
          <div className="lg:col-span-4">
            <div className="flex items-start gap-5">
              {/* mini map: where the glass is */}
              <div className="relative w-24 shrink-0 overflow-hidden border border-ivory/25" style={{ aspectRatio: `${piece.a.width} / ${piece.a.height}` }} aria-hidden>
                <ArtImage art={piece.a} sizes="96px" decorative className="h-full w-full object-cover opacity-70" />
                <motion.span
                  className="absolute border-2 border-champagne bg-champagne/15"
                  style={{ left: mapLeft, top: mapTop, width: `${100 / zoom}%`, height: `${100 / zoom}%`, opacity: active ? 1 : 0.4 }}
                />
              </div>
              <div className="min-w-0">
                <p className="label text-champagne">{String(index + 1).padStart(2, "0")} / {String(pieces.length).padStart(2, "0")}</p>
                <h3 className="font-editorial mt-2 text-[2.2rem]">{piece.a.title}</h3>
              </div>
            </div>
            <p className="mt-5 leading-relaxed text-ivory/80">{piece.a.alt}</p>
            <p className="mt-4 border-l-2 border-champagne pl-4 text-[0.98rem] italic leading-relaxed text-champagne">{piece.look}</p>
            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-ivory/20 pt-5 text-sm">
              {piece.a.shape && (<div><dt className="label text-ivory/55">Shape</dt><dd className="mt-1">{piece.a.shape}</dd></div>)}
              {piece.a.finish && (<div><dt className="label text-ivory/55">Finish</dt><dd className="mt-1">{piece.a.finish}</dd></div>)}
            </dl>

            <p className="label mt-10 text-ivory/60">Choose a design</p>
            <ul className="mt-3 grid grid-cols-4 gap-3">
              {pieces.map((p, i) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => { setIndex(i); px.set(0.5); py.set(0.5); }}
                    aria-pressed={i === index}
                    aria-label={`Look at ${p.a.title}`}
                    className={`block w-full overflow-hidden rounded-full border-2 transition-all duration-300 ${i === index ? "scale-105 border-champagne" : "border-transparent opacity-60 hover:opacity-100"}`}
                  >
                    <ArtImage art={p.a} sizes="80px" decorative className="aspect-square object-cover" />
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-6 hidden text-sm text-ivory/55 md:block">Keyboard: focus the photo, then arrow keys to move and + / − to zoom.</p>
          </div>
        </div>
      </div>
    </NailSection>
  );
}

function LoupeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 21 21" strokeLinecap="round" />
      <path d="M8 8.5a3 3 0 0 1 3-1.5" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}
