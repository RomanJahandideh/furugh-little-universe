"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { ContactSection, Footer } from "@/components/common/Chrome";
import { ArtImage } from "@/components/gallery/ArtImage";
import { Elevator } from "@/components/mechanics/Elevator";
import { LiftText, PullUp } from "@/components/mechanics/PullUp";
import { useRatchet } from "@/components/mechanics/ratchet";
import { ProcessVideos } from "@/components/painting/ProcessVideos";
import { VerbCycle } from "@/components/stage/Cursor";
import { Stage } from "@/components/stage/Stage";
import { portrait } from "@/data/portrait";
import type { GalleryArtwork } from "@/lib/artworks";
import type { PaintingPhoto } from "@/lib/paintings";
import { asset } from "@/lib/paths";

const v = (o: Record<string, string | number>) => o as CSSProperties;
const srcset = (p: { name: string; widths: number[] }) =>
  p.widths.map((w) => `${asset(`/images/profile/${p.name}-${w}.webp`)} ${w}w`).join(", ");

export function Landing({ nailPicks, paintingPicks, floors }: { nailPicks: GalleryArtwork[]; paintingPicks: PaintingPhoto[]; floors: PaintingPhoto[] }) {
  return (
    <main id="main" className="overflow-x-clip">
      <Hero />
      {floors.length > 1 && <Elevator floors={floors} />}
      <ProcessVideos linkToPainting />
      <About />
      <Selected nailPicks={nailPicks} paintingPicks={paintingPicks} />
      <ContactSection
        title="Let’s talk about your project."
        intro="A wall or ceiling that needs painting, or a set of nails? Send a message and it goes straight to Forough."
        subject="New message from furugh.com"
      />
      <Footer />
    </main>
  );
}

/* ---------------- Hero: framed autumn portrait, giant numerals, two paths ---------------- */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = useRatchet(scrollYProgress, 7, "heavy");
  const photoY = useTransform(p, [0, 1], ["0%", "-28%"]);
  const photoScale = useTransform(p, [0, 1], [1, 1.12]);
  const n1 = useTransform(p, [0, 1], ["0%", "35%"]);
  const n2 = useTransform(p, [0, 1], ["0%", "-30%"]);

  return (
    <Stage tone="teal" ref={ref} aria-label="Welcome" className="relative min-h-[100svh] overflow-hidden">
      {/* Giant numerals for the two paths */}
      <motion.span aria-hidden style={{ y: n1 }} className="font-black pointer-events-none absolute -left-[3vw] top-[38svh] select-none text-[44vw] text-gold md:top-[4svh] md:text-[27vw]">
        01
      </motion.span>
      <motion.span aria-hidden style={{ y: n2 }} className="font-black pointer-events-none absolute -right-[2vw] bottom-[-6svh] select-none text-[44vw] text-gold md:bottom-auto md:right-[2vw] md:top-[34svh] md:text-[22vw]">
        02
      </motion.span>

      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl grid-rows-[auto_1fr_auto] px-5 pb-8 pt-[calc(var(--nav-h)+env(safe-area-inset-top)+1rem)] sm:px-8 md:grid-cols-[1fr_auto] md:grid-rows-[1fr_auto] md:gap-x-10 md:pb-10">
        {/* Name block */}
        <div className="hero-in relative z-10 md:col-start-2 md:row-start-1 md:self-start md:pt-6 md:text-right" style={v({ "--d": "0.25s" })}>
          <h1 className="font-black text-[clamp(2.6rem,11vw,5.4rem)] uppercase text-gold">
            Forough
            <span className="block">Mahmoud&shy;pour</span>
          </h1>
          <p className="label mt-3 text-paper/80">Decorative painting &middot; Nail artistry &middot; Vancouver, BC</p>
        </div>

        {/* Framed photo, winched up on scroll */}
        <motion.div style={{ y: photoY, scale: photoScale }} className="relative z-0 mx-auto mt-6 w-full max-w-[560px] self-center md:absolute md:left-[6%] md:top-[30%] md:mt-0 md:w-[38vw] md:max-w-[600px]">
          <div className="hero-in shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)]" style={v({ "--d": "0.1s" })}>
            <picture>
              <source media="(min-width: 768px)" srcSet={srcset(portrait.wide)} sizes="38vw" />
              <img
                src={asset(`/images/profile/${portrait.tall.name}-960.webp`)}
                srcSet={srcset(portrait.tall)}
                sizes="92vw"
                width={portrait.tall.width}
                height={portrait.tall.height}
                alt={portrait.alt}
                fetchPriority="high"
                className="block aspect-[4/5] w-full object-cover object-[50%_35%] md:aspect-[16/10] md:object-[78%_45%]"
                style={{ backgroundImage: `url(${portrait.tall.blur})`, backgroundSize: "cover" }}
              />
            </picture>
          </div>
        </motion.div>

        {/* Bottom row: cycling verb + the two paths */}
        <div className="relative z-10 mt-6 flex flex-col gap-6 md:col-span-2 md:row-start-2 md:mt-0 md:flex-row md:items-end md:justify-between">
          <p className="hero-in font-black flex items-end gap-3 text-[2.2rem] uppercase text-gold md:text-[3.2rem]" style={v({ "--d": "0.5s" })}>
            <span aria-hidden className="pb-1 text-2xl">&darr;</span>
            <VerbCycle words={["Scroll", "Lift", "Hoist", "Raise", "Climb"]} />
          </p>
          <nav aria-label="Choose a path" className="hero-in grid gap-3 sm:grid-cols-2 md:w-[min(560px,46vw)]" style={v({ "--d": "0.65s" })}>
            <PathLink href="/decorative-painting/" n="01" title="Decorative Painting" />
            <PathLink href="/nails/" n="02" title="Nail Artistry" />
          </nav>
        </div>
      </div>
    </Stage>
  );
}

function PathLink({ href, n, title }: { href: string; n: string; title: string }) {
  return (
    <Link
      href={href}
      className="group flex min-h-[64px] items-center justify-between gap-4 border border-gold/80 bg-[#1d4447]/60 px-5 py-3 text-paper backdrop-blur-sm transition-colors duration-300 hover:bg-gold hover:text-char"
    >
      <span>
        <span className="label block text-gold group-hover:text-char">{n}</span>
        <span className="font-display block whitespace-nowrap text-[1.3rem] leading-tight">{title}</span>
      </span>
      <span aria-hidden className="text-xl transition-transform duration-300 group-hover:-translate-y-1">&uarr;</span>
    </Link>
  );
}

/* ---------------- About ---------------- */
function About() {
  return (
    <Stage tone="olive" aria-labelledby="about-title">
      <Reveal className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 sm:py-32 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <PullUp steps={7} className="mx-auto w-full max-w-[400px] bg-black/20">
          <img
            src={asset(`/images/profile/${portrait.about.name}-880.webp`)}
            srcSet={portrait.about.widths.map((w) => `${asset(`/images/profile/${portrait.about.name}-${w}.webp`)} ${w}w`).join(", ")}
            sizes="(min-width: 768px) 400px, 90vw"
            width={portrait.about.width}
            height={portrait.about.height}
            alt={portrait.about.alt}
            loading="lazy"
            className="block aspect-[4/5] h-auto w-full object-cover"
            style={{ backgroundImage: `url(${portrait.about.blur})`, backgroundSize: "cover" }}
          />
        </PullUp>
        <div>
          <p className="label text-gold">About</p>
          <h2 id="about-title" className="font-black mt-4 text-[clamp(2.6rem,7vw,5rem)] text-gold">
            <LiftText>Hello, and welcome.</LiftText>
          </h2>
          <p className="rise mt-6 max-w-lg text-[1.1rem] leading-relaxed text-paper/80" style={v({ "--i": 2 })}>
            I&rsquo;m Forough, a decorative painter based in Vancouver, BC. For me, it&rsquo;s all in the details: the curl of a carved scroll, the edge of a sheet of gold leaf, a single petal on a painted branch. And colour is where every wall begins. I mix and layer each tone by hand, from soft plaster finishes to deep teal, warm gold and blossom pink, until it feels right in the room.
          </p>
          <div className="rise mt-8" style={v({ "--i": 3 })}>
            <Link href="/decorative-painting/" className="btn bg-gold text-char hover:brightness-105">See the painting work <span aria-hidden>&rarr;</span></Link>
          </div>
        </div>
      </Reveal>
    </Stage>
  );
}

/* ---------------- Selected work ---------------- */
function Selected({ nailPicks, paintingPicks }: { nailPicks: GalleryArtwork[]; paintingPicks: PaintingPhoto[] }) {
  const items = [
    ...paintingPicks.slice(0, 3).map((p) => ({ key: p.id, href: "/decorative-painting/", label: "Decorative painting", title: p.title, art: p })),
    ...nailPicks.slice(0, 3).map((n) => ({ key: n.id, href: "/nails/", label: "Nail artistry", title: n.title, art: n })),
  ];
  return (
    <Stage tone="paper" aria-labelledby="selected-title">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <p className="label text-ink-soft">Selected work</p>
        <h2 id="selected-title" className="font-black mt-4 text-[clamp(2.6rem,7vw,5rem)]">
          <LiftText>From both studios</LiftText>
        </h2>
        <ul className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
          {items.map((it) => (
            <li key={it.key}>
              <Link href={it.href} data-cursor="Open" className="group block">
                <PullUp className="bg-sand">
                  <ArtImage art={it.art} sizes="(min-width: 1024px) 30vw, 46vw" decorative className="aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </PullUp>
                <span className="label mt-3 block text-ink-soft">{it.label}</span>
                <span className="font-display mt-1 block text-xl">{it.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Stage>
  );
}
