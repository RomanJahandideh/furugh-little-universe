"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { ContactSection, Footer } from "@/components/common/Chrome";
import { ArtImage } from "@/components/gallery/ArtImage";
import { portrait } from "@/data/portrait";
import type { GalleryArtwork } from "@/lib/artworks";
import type { PaintingPhoto } from "@/lib/paintings";
import { asset } from "@/lib/paths";

const v = (o: Record<string, string | number>) => o as CSSProperties;

export function Landing({ nailDoor, paintingDoor, nailPicks, paintingPicks }: { nailDoor: GalleryArtwork; paintingDoor?: PaintingPhoto; nailPicks: GalleryArtwork[]; paintingPicks: PaintingPhoto[] }) {
  return (
    <main id="main" className="overflow-x-clip">
      <Hero nailDoor={nailDoor} paintingDoor={paintingDoor} />
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

/* ---------------- Hero: full-screen split, one half per path ---------------- */
function Hero({ nailDoor, paintingDoor }: { nailDoor: GalleryArtwork; paintingDoor?: PaintingPhoto }) {
  return (
    <section aria-label="Choose a path" className="relative h-[100svh] min-h-[560px] bg-ink text-white">
      <nav aria-label="Choose a path" className="group/split flex h-full flex-col md:flex-row">
        {paintingDoor && (
          <Half href="/decorative-painting/" n="01" title="Decorative Painting" sub="Walls, ceilings & ornament" art={paintingDoor} focus="50% 62%" />
        )}
        <span aria-hidden className="h-px w-full bg-white/40 md:h-full md:w-px" />
        <Half href="/nails/" n="02" title="Nail Artistry" sub="Nail technician & artist" art={nailDoor} focus="50% 40%" />
      </nav>

      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-black/55 to-transparent md:h-72" />
      {/* Name sits over the seam, above both halves. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 pt-[calc(var(--nav-h)+env(safe-area-inset-top)+1.25rem)] text-center md:pt-[calc(var(--nav-h)+2rem)]">
        <p className="hero-in label text-white/80" style={v({ "--d": "0.2s" })}>
          Welcome
        </p>
        <h1 className="hero-in font-display mt-2 px-4 text-[clamp(2.2rem,7vw,5.2rem)] leading-none [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]" style={v({ "--d": "0.35s" })}>
          Forough Mahmoudpour
        </h1>
      </div>
    </section>
  );
}

function Half({ href, n, title, sub, art, focus }: { href: string; n: string; title: string; sub: string; art: GalleryArtwork | PaintingPhoto; focus: string }) {
  return (
    <Link
      href={href}
      className="group relative block min-h-0 flex-1 overflow-hidden transition-[flex-grow,opacity] duration-[900ms] [transition-timing-function:var(--ease-out)] md:hover:flex-[1.4] md:group-hover/split:[&:not(:hover)]:opacity-80"
    >
      <span aria-hidden className="hero-zoom absolute inset-0 block">
        <ArtImage
          art={art}
          sizes="(min-width: 768px) 60vw, 100vw"
          priority
          decorative
          className="h-full object-cover transition-transform duration-[1.6s] [transition-timing-function:var(--ease-out)] group-hover:scale-[1.04]"
          style={{ objectPosition: focus }}
        />
      </span>
      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/35" />
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-8 md:p-12">
        <span className="hero-in block" style={v({ "--d": "0.55s" })}>
          <span className="label block text-white/75">{n}</span>
          <span className="font-display mt-2 block text-[2rem] leading-[1.02] sm:text-5xl lg:text-6xl">{title}</span>
          <span className="mt-2 block text-[0.95rem] text-white/80 sm:text-base">{sub}</span>
        </span>
        <span className="hero-in label flex shrink-0 items-center gap-3 pb-1 text-white" style={v({ "--d": "0.7s" })}>
          <span className="hidden sm:inline">Enter</span>
          <span aria-hidden className="block h-px w-8 bg-white transition-all duration-500 group-hover:w-14" />
        </span>
      </span>
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
            I&rsquo;m Forough, a painter based in Surrey, BC. On walls and ceilings, I bring colour, gold leaf and ornament to interiors. At the nail desk, I paint tiny works of art. Thank you for stopping by.
          </p>
          <div className="rise mt-8 flex flex-wrap gap-3" style={v({ "--i": 3 })}>
            <Link href="/decorative-painting/" className="btn btn-dark">Decorative painting</Link>
            <Link href="/nails/" className="btn btn-outline">Nail artistry</Link>
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
