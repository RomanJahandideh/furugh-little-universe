"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { ContactSection, Footer } from "@/components/common/Chrome";
import { ArtImage } from "@/components/gallery/ArtImage";
import { portrait } from "@/data/portrait";
import type { GalleryArtwork } from "@/lib/artworks";
import type { PaintingPhoto } from "@/lib/paintings";
import { asset } from "@/lib/paths";

const v = (o: Record<string, string | number>) => o as CSSProperties;

export function Landing({ nailPicks, paintingPicks }: { nailPicks: GalleryArtwork[]; paintingPicks: PaintingPhoto[] }) {
  return (
    <main id="main" className="overflow-x-clip">
      <Hero />
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

/* ---------------- Hero: cinematic autumn portrait with the two paths ---------------- */
const srcset = (p: { name: string; widths: number[] }) =>
  p.widths.map((w) => `${asset(`/images/profile/${p.name}-${w}.webp`)} ${w}w`).join(", ");

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[600px] overflow-hidden bg-[#2a211b]">
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
      {/* Shading: bottom on phones, left side on larger screens, top for the menu. */}
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,11,9,0.9)_0%,rgba(14,11,9,0.5)_42%,rgba(14,11,9,0)_66%)] md:bg-[linear-gradient(to_right,rgba(14,11,9,0.82)_0%,rgba(14,11,9,0.5)_38%,rgba(14,11,9,0)_64%)]" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />

      <motion.div style={{ opacity: fade }} className="relative mx-auto flex h-full max-w-7xl items-end px-5 pb-10 sm:px-8 md:items-center md:pb-0">
        <div className="max-w-xl text-white">
          <p className="hero-in label text-white/80" style={v({ "--d": "0.2s" })}>
            Welcome &middot; Vancouver, BC
          </p>
          <h1 className="hero-in font-display mt-3 text-[clamp(3rem,11vw,7rem)] leading-[0.98] md:text-[clamp(3rem,5.2vw,4.8rem)]" style={v({ "--d": "0.35s" })}>
            Forough
            <span className="block">Mahmoudpour</span>
          </h1>
          <p className="hero-in mt-4 max-w-md text-[1.1rem] leading-snug text-white/85 sm:text-[1.25rem]" style={v({ "--d": "0.5s" })}>
            Decorative painting and nail artistry. Choose a path:
          </p>
          <nav aria-label="Choose a path" className="hero-in mt-7 grid gap-3 sm:max-w-xl sm:grid-cols-2" style={v({ "--d": "0.65s" })}>
            <PathLink href="/decorative-painting/" n="01" title="Decorative Painting" />
            <PathLink href="/nails/" n="02" title="Nail Artistry" />
          </nav>
        </div>
      </motion.div>
    </section>
  );
}

function PathLink({ href, n, title }: { href: string; n: string; title: string }) {
  return (
    <Link
      href={href}
      className="group flex min-h-[64px] items-center justify-between gap-4 border border-white/60 bg-black/15 px-5 py-3 backdrop-blur-sm transition-colors duration-300 hover:bg-white hover:text-ink"
    >
      <span>
        <span className="label block opacity-70">{n}</span>
        <span className="font-display block whitespace-nowrap text-[1.4rem] leading-tight">{title}</span>
      </span>
      <span aria-hidden className="text-xl transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
    </Link>
  );
}

/* ---------------- About ---------------- */
function About() {
  return (
    <section aria-labelledby="about-title" className="border-t border-line">
      <Reveal className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <div className="rise mx-auto w-full max-w-[400px] overflow-hidden bg-sand">
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
        </div>
        <div>
          <p className="rise label text-ink-soft">About</p>
          <h2 id="about-title" className="rise font-display h-section mt-4" style={v({ "--i": 1 })}>
            Hello, and welcome.
          </h2>
          <p className="rise mt-6 max-w-lg text-[1.1rem] leading-relaxed text-ink-soft" style={v({ "--i": 2 })}>
            I&rsquo;m Forough, a decorative painter based in Vancouver, BC. For me, it&rsquo;s all in the details: the curl of a carved scroll, the edge of a sheet of gold leaf, a single petal on a painted branch. And colour is where every wall begins. I mix and layer each tone by hand, from soft plaster finishes to deep teal, warm gold and blossom pink, until it feels right in the room.
          </p>
          <div className="rise mt-8 flex flex-wrap gap-3" style={v({ "--i": 3 })}>
            <Link href="/decorative-painting/" className="btn btn-dark">See the painting work</Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------- Selected work ---------------- */
function Selected({ nailPicks, paintingPicks }: { nailPicks: GalleryArtwork[]; paintingPicks: PaintingPhoto[] }) {
  const items = [
    ...paintingPicks.slice(0, 3).map((p) => ({ key: p.id, href: "/decorative-painting/", label: "Decorative painting", title: p.title, art: p })),
    ...nailPicks.slice(0, 3).map((n) => ({ key: n.id, href: "/nails/", label: "Nail artistry", title: n.title, art: n })),
  ];
  return (
    <section aria-labelledby="selected-title" className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <p className="rise label text-ink-soft">Selected work</p>
          <h2 id="selected-title" className="rise font-display h-section mt-4" style={v({ "--i": 1 })}>
            From both studios
          </h2>
        </Reveal>
        <ul className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal as="li" key={it.key}>
              <Link href={it.href} className="rise group block" style={v({ "--i": i % 3 })}>
                <span className="block overflow-hidden bg-sand">
                  <ArtImage art={it.art} sizes="(min-width: 1024px) 30vw, 46vw" decorative className="aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </span>
                <span className="label mt-3 block text-ink-soft">{it.label}</span>
                <span className="font-display mt-1 block text-xl">{it.title}</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
