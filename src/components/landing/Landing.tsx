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
import { siteConfig } from "@/data/site-config";
import type { PaintingPhoto } from "@/lib/paintings";
import { asset } from "@/lib/paths";

const v = (o: Record<string, string | number>) => o as CSSProperties;
const srcset = (p: { name: string; widths: number[] }) =>
  p.widths.map((w) => `${asset(`/images/profile/${p.name}-${w}.webp`)} ${w}w`).join(", ");

export function Landing({ paintingPicks, floors }: { paintingPicks: PaintingPhoto[]; floors: PaintingPhoto[] }) {
  return (
    <main id="main" className="overflow-x-clip">
      <Hero />
      <About />
      <PrepCook />
      <ProcessVideos linkToPainting />
      {floors.length > 1 && <Elevator floors={floors} />}
      <Selected paintingPicks={paintingPicks} />
      <ContactSection
        title="Let’s talk about your project."
        intro="A wall or ceiling that needs painting, or a prep cook for your kitchen? Send a message and it goes straight to Forough's inbox."
        subject="New message from furugh.com"
      />
      <Footer />
    </main>
  );
}

/* ---------------- Hero: her autumn photo, full page, text on top ---------------- */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = useRatchet(scrollYProgress, 7, "heavy");
  const y = useTransform(p, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <Stage tone="teal" ref={ref} aria-label="Welcome" className="relative h-[100svh] min-h-[600px] overflow-hidden bg-[#2a211b]">
      <motion.div style={{ y }} className="absolute inset-0">
        <picture>
          <source media="(min-width: 768px)" srcSet={srcset(portrait.wide)} sizes="100vw" />
          <img
            src={asset(`/images/profile/${portrait.tall.name}-960.webp`)}
            srcSet={srcset(portrait.tall)}
            sizes="100vw"
            width={portrait.tall.width}
            height={portrait.tall.height}
            alt={portrait.alt}
            fetchPriority="high"
            className="push-in h-full w-full object-cover object-[50%_30%] md:object-[82%_40%]"
            style={{ backgroundImage: `url(${portrait.tall.blur})`, backgroundSize: "cover" }}
          />
        </picture>
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,11,9,0.9)_0%,rgba(14,11,9,0.5)_42%,rgba(14,11,9,0)_66%)] md:bg-[linear-gradient(to_right,rgba(14,11,9,0.82)_0%,rgba(14,11,9,0.5)_38%,rgba(14,11,9,0)_64%)]" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />

      <motion.div style={{ opacity: fade }} className="relative mx-auto flex h-full max-w-7xl items-end px-5 pb-10 sm:px-8 md:items-center md:pb-0">
        <div className="max-w-xl text-white">
          <p className="hero-in label text-white/85" style={v({ "--d": "0.2s" })}>
            Welcome &middot; Vancouver, BC
          </p>
          <h1 className="hero-in font-black mt-3 text-[clamp(2.2rem,10.5vw,6rem)] uppercase text-gold md:text-[clamp(3rem,4.6vw,4.4rem)]" style={v({ "--d": "0.35s" })}>
            Forough
            <span className="block whitespace-nowrap">Mahmoudpour</span>
          </h1>
          <p className="hero-in mt-4 max-w-md text-[1.1rem] leading-snug text-white/85 sm:text-[1.25rem]" style={v({ "--d": "0.5s" })}>
            Decorative painting for walls, ceilings and domes.
          </p>
          <p className="hero-in font-black mt-5 flex items-end gap-3 text-[1.8rem] uppercase text-gold md:text-[2.4rem]" style={v({ "--d": "0.6s" })}>
            <span aria-hidden className="pb-1 text-xl">&darr;</span>
            <VerbCycle words={["Scroll", "Lift", "Hoist", "Raise", "Climb"]} />
          </p>
          <nav aria-label="Start here" className="hero-in mt-6 grid gap-3 sm:max-w-xl sm:grid-cols-2" style={v({ "--d": "0.75s" })}>
            <PathLink href="/decorative-painting/" n="01" title="See the painting work" />
            <PathLink href="#contact" n="02" title="Get in touch" />
          </nav>
        </div>
      </motion.div>
    </Stage>
  );
}

function PathLink({ href, n, title }: { href: string; n: string; title: string }) {
  return (
    <Link
      href={href}
      className="group flex min-h-[64px] items-center justify-between gap-4 border border-gold/80 bg-black/20 px-5 py-3 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-gold hover:text-char"
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
          <div className="rise mt-8 flex flex-wrap gap-3" style={v({ "--i": 3 })}>
            <Link href="/decorative-painting/" className="btn bg-gold text-char hover:brightness-105">See the painting work <span aria-hidden>&rarr;</span></Link>
            {siteConfig.resumes.painting && (
              <a href={asset(siteConfig.resumes.painting)} download className="btn border border-gold/80 text-paper hover:bg-gold hover:text-char">Download my painting CV (PDF)</a>
            )}
          </div>
        </div>
      </Reveal>
    </Stage>
  );
}

/* ---------------- Selected work ---------------- */
function Selected({ paintingPicks }: { paintingPicks: PaintingPhoto[] }) {
  const items = paintingPicks.slice(0, 6).map((p) => ({ key: p.id, href: "/decorative-painting/", label: "Decorative painting", title: p.title, art: p }));
  return (
    <Stage tone="paper" aria-labelledby="selected-title">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <p className="label text-ink-soft">Selected work</p>
        <h2 id="selected-title" className="font-black mt-4 text-[clamp(2.6rem,7vw,5rem)]">
          <LiftText>From the studio</LiftText>
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

/* ---------------- Prep cook ---------------- */
const PREP_NEEDS = [
  {
    t: "FOODSAFE Level 1",
    d: "BC\u2019s Food Premises Regulation requires a FOODSAFE Level 1 (or equivalent) holder on site, and many kitchens ask it of every cook.",
    has: true,
  },
  {
    t: "Safe food handling",
    d: "Keeping cold food at 4\u00b0C or below and hot food at 60\u00b0C or above, preventing cross-contamination, and labelling, dating and rotating stock first in, first out.",
    has: true,
  },
  {
    t: "Prep and mise en place",
    d: "Washing, peeling and cutting vegetables, weighing and measuring ingredients, portioning, and following recipes and the chef\u2019s prep list.",
  },
  {
    t: "A clean, organised station",
    d: "Cleaning and sanitising surfaces, tools and equipment, and unpacking and storing deliveries.",
  },
  {
    t: "Pace and teamwork",
    d: "Working steadily in a hot, busy kitchen, with early, split or weekend shifts.",
  },
];

function PrepCook() {
  return (
    <Stage tone="slate" id="prep" aria-labelledby="prep-title" className="scroll-mt-[var(--nav-h)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 sm:py-32 md:grid-cols-[1fr_1.1fr] md:gap-20">
        <div>
          <p className="label text-gold">Also in the kitchen</p>
          <h2 id="prep-title" className="font-black mt-4 text-[clamp(2.6rem,7vw,5rem)] text-gold">
            <LiftText>Prep cook</LiftText>
          </h2>
          <p className="mt-6 max-w-lg text-[1.1rem] leading-relaxed text-paper/80">
            Alongside her painting, Forough is open to prep cook work in Vancouver kitchens. The same steady hands and eye for detail that go into a gold-leaf edge go into clean cuts, even portions and a tidy station.
          </p>
          <PullUp steps={4} className="mt-10 w-fit">
            <span className="flex items-center gap-4 border-2 border-gold px-6 py-5">
              <span aria-hidden className="font-black text-[2.6rem] text-gold">&#10003;</span>
              <span>
                <span className="label block text-gold">Certified</span>
                <span className="font-display block text-[1.5rem] leading-tight">FOODSAFE Level 1</span>
              </span>
            </span>
          </PullUp>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="#contact" className="btn bg-gold text-char hover:brightness-105">Hiring for your kitchen? Get in touch <span aria-hidden>&rarr;</span></Link>
            {siteConfig.resumes.cooking && (
              <a href={asset(siteConfig.resumes.cooking)} download className="btn border border-gold/80 text-paper hover:bg-gold hover:text-char">Download my kitchen CV (PDF)</a>
            )}
          </div>
        </div>
        <div>
          <p className="label text-paper/70">What the role asks for in BC</p>
          <ul className="mt-5 border-t border-paper/20">
            {PREP_NEEDS.map((n, i) => (
              <li key={n.t} className="border-b border-paper/20 py-5">
                <span className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <span className="font-display text-[1.35rem] leading-tight">
                    <span className="label mr-3 text-gold">{String(i + 1).padStart(2, "0")}</span>
                    {n.t}
                  </span>
                  {n.has && <span className="label shrink-0 text-gold">&#10003; Covered by FOODSAFE</span>}
                </span>
                <span className="mt-2 block text-[0.98rem] leading-relaxed text-paper/70">{n.d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Stage>
  );
}
