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

/* ---------------- Hero: name and the two paths ---------------- */
function Hero({ nailDoor, paintingDoor }: { nailDoor: GalleryArtwork; paintingDoor?: PaintingPhoto }) {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 pt-[calc(var(--nav-h)+env(safe-area-inset-top)+3rem)] sm:px-8 sm:pt-[calc(var(--nav-h)+4.5rem)]">
      <Reveal>
        <p className="rise label text-ink-soft">Welcome</p>
        <h1 className="rise font-display h-hero mt-4" style={v({ "--i": 1 })}>
          Forough Mahmoudpour
        </h1>
        <p className="rise mt-6 max-w-lg text-[1.1rem] text-ink-soft sm:text-lg" style={v({ "--i": 2 })}>
          Decorative painting and nail artistry. Choose a path to see the work.
        </p>
      </Reveal>
      <nav aria-label="Choose a path" className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-6 lg:mt-12">
        {paintingDoor && <Door href="/decorative-painting/" n="01" title="Decorative Painting" sub="Walls, ceilings & ornament" art={paintingDoor} i={3} />}
        <Door href="/nails/" n="02" title="Nail Artistry" sub="Nail technician & artist" art={nailDoor} i={4} />
      </nav>
    </section>
  );
}

function Door({ href, n, title, sub, art, i }: { href: string; n: string; title: string; sub: string; art: GalleryArtwork | PaintingPhoto; i: number }) {
  return (
    <Reveal>
      <Link href={href} className="rise group block" style={v({ "--i": i })}>
        <span className="block aspect-[4/5] overflow-hidden bg-sand lg:aspect-[3/2]">
          <ArtImage art={art} sizes="(min-width: 1024px) 40vw, 46vw" priority decorative className="h-full object-cover object-[50%_65%] transition-transform duration-[1.2s] [transition-timing-function:var(--ease-out)] group-hover:scale-[1.03]" />
        </span>
        <span className="mt-4 flex items-baseline justify-between gap-3 border-b border-line pb-3">
          <span>
            <span className="label block text-ink-soft">{n}</span>
            <span className="font-display mt-1 block text-[1.4rem] leading-tight sm:text-4xl">{title}</span>
            <span className="mt-1 block text-[0.85rem] text-ink-soft sm:text-base">{sub}</span>
          </span>
          <span aria-hidden className="text-xl transition-transform group-hover:translate-x-1">&rarr;</span>
        </span>
      </Link>
    </Reveal>
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
