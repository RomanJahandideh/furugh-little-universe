"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { ContactSection, FrameCorners, Footer } from "@/components/common/Chrome";
import { ArtImage } from "@/components/gallery/ArtImage";
import { ArchOutline, Cloud, Divider, Lotus, Shamseh, Vine } from "@/components/ornament/Ornaments";
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
        intro="A wall that needs ornament, or a set of nails that needs personality? Send a message and it goes straight to Forough."
        subject="New message from furugh.com"
      />
      <Footer />
    </main>
  );
}

/* ---------------- Hero: the ornamented hall with two doors ---------------- */
function Hero({ nailDoor, paintingDoor }: { nailDoor: GalleryArtwork; paintingDoor?: PaintingPhoto }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const medallionY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="lapis relative overflow-hidden px-3 pb-3 pt-[calc(var(--nav-h)+env(safe-area-inset-top)+0.5rem)] sm:px-6 sm:pb-6">
      <Reveal className="gilded-frame relative mx-auto flex min-h-[calc(100svh-var(--nav-h)-1.5rem)] max-w-7xl flex-col items-center px-4 pb-24 pt-10 text-center sm:px-10 sm:pb-20 sm:pt-12 lg:pb-14 lg:pt-8">
        <FrameCorners />

        {/* Background ornament: medallion, clouds and vines. */}
        <motion.div aria-hidden style={{ y: medallionY }} className="pointer-events-none absolute left-1/2 top-[3%] w-[150vw] max-w-[760px] -translate-x-1/2 opacity-[0.17] sm:w-[90vw] lg:opacity-[0.22]">
          <div className="slow-turn">
            <Shamseh weight={0.9} />
          </div>
        </motion.div>
        <Cloud aria-hidden className="drift pointer-events-none absolute left-[6%] top-[9%] w-24 opacity-70 sm:w-40" weight={1.4} />
        <Cloud aria-hidden className="drift pointer-events-none absolute right-[6%] top-[14%] w-20 -scale-x-100 opacity-60 sm:w-36" weight={1.4} style={{ animationDelay: "-6s" }} />
        <Vine aria-hidden className="sway pointer-events-none absolute bottom-2 left-2 w-[44%] max-w-[420px] opacity-60" length={420} />
        <Vine aria-hidden className="sway pointer-events-none absolute bottom-2 right-2 w-[44%] max-w-[420px] -scale-x-100 opacity-60" length={420} style={{ animationDelay: "-4s" }} />

        <div className="relative">
          <p className="rise label text-gold-light">Welcome to the studio of</p>
          <h1 className="rise font-display h-hero mt-4 lg:text-[5.4rem]" style={v({ "--i": 1 })}>
            Forough
            <span className="block italic text-gold-light">Mahmoudpour</span>
          </h1>
          <Divider className="rise mx-auto mt-5 w-52" />
          <p className="rise mx-auto mt-4 max-w-md text-[1.05rem] text-[#e9dfcb] sm:text-lg" style={v({ "--i": 2 })}>
            Decorative wall painting and nail artistry: two crafts, one patient hand.
          </p>
        </div>

        <p className="rise label relative mt-9 text-gold-light/90 lg:mt-7" style={v({ "--i": 3 })}>
          Choose your path
        </p>
        <nav aria-label="Choose your path" className="relative mt-5 grid w-full max-w-3xl grid-cols-2 gap-4 sm:gap-10 lg:max-w-2xl">
          <Door
            href="/decorative-painting/"
            title="Decorative Painting"
            sub="Murals & ornament"
            i={4}
            picture={
              paintingDoor ? (
                <ArtImage art={paintingDoor} sizes="(min-width: 768px) 340px, 45vw" priority className="h-full object-cover" decorative />
              ) : (
                <span className="grid h-full place-items-center bg-[radial-gradient(circle_at_50%_40%,#b04a30,#6d2516)]">
                  <Lotus className="w-[72%]" weight={1.6} />
                </span>
              )
            }
          />
          <Door
            href="/nails/"
            title="Nail Artistry"
            sub="Nail technician & artist"
            i={5}
            picture={<ArtImage art={nailDoor} sizes="(min-width: 768px) 340px, 45vw" priority className="h-full object-cover" decorative />}
          />
        </nav>
      </Reveal>
    </section>
  );
}

function Door({ href, title, sub, picture, i }: { href: string; title: string; sub: string; picture: ReactNode; i: number }) {
  return (
    <Link href={href} className="rise group block" style={v({ "--i": i })}>
      <span className="relative mx-auto block aspect-[3/4] w-full max-w-[300px] lg:max-w-[225px]">
        <span className="arch absolute inset-0 block overflow-hidden bg-lapis-deep">
          <span className="block h-full transition-transform duration-[1.2s] [transition-timing-function:var(--ease-out)] group-hover:scale-[1.06]">{picture}</span>
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0d1a35]/55 via-transparent to-transparent" />
        </span>
        <ArchOutline className="transition-[filter] duration-500 group-hover:drop-shadow-[0_0_10px_rgba(226,195,120,0.55)]" />
      </span>
      <span className="font-display mt-4 flex min-h-[2.3em] items-start justify-center text-[1.35rem] leading-[1.1] sm:min-h-0 sm:text-3xl">{title}</span>
      <span className="mt-1 block text-[0.82rem] text-[#e9dfcb] sm:text-base">{sub}</span>
      <span className="label mt-3 inline-flex items-center gap-2 text-gold-light">
        Enter <span aria-hidden className="transition-transform group-hover:translate-x-1">&rarr;</span>
      </span>
    </Link>
  );
}

/* ---------------- About Forough ---------------- */
function About() {
  return (
    <section aria-labelledby="about-title" className="mx-auto max-w-6xl px-4 py-20 sm:px-8 sm:py-28">
      <Reveal className="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        {/* Simple rectangle: photo on a paper mat, with an offset gold frame behind it. */}
        <div className="relative mx-auto w-[86%] max-w-[360px]">
          <span aria-hidden className="absolute -bottom-4 -right-4 left-4 top-4 border border-gold sm:-bottom-5 sm:-right-5 sm:left-5 sm:top-5" />
          <div className="paper-panel relative p-2.5">
            <img
              src={asset(`/images/profile/${portrait.about.name}-880.webp`)}
              srcSet={portrait.about.widths.map((w) => `${asset(`/images/profile/${portrait.about.name}-${w}.webp`)} ${w}w`).join(", ")}
              sizes="(min-width: 768px) 360px, 86vw"
              width={portrait.about.width}
              height={portrait.about.height}
              alt={portrait.about.alt}
              loading="lazy"
              className="block aspect-[4/5] h-auto w-full object-cover"
              style={{ backgroundImage: `url(${portrait.about.blur})`, backgroundSize: "cover" }}
            />
          </div>
        </div>
        <div>
          <p className="rise label text-gold">About</p>
          <h2 id="about-title" className="rise font-display h-section mt-4" style={v({ "--i": 1 })}>
            Hello, and welcome.
          </h2>
          <Divider className="rise mt-5 w-44" />
          <p className="rise mt-6 text-[1.12rem] leading-relaxed text-ink-soft" style={v({ "--i": 2 })}>
            I&rsquo;m Forough, a painter based in Surrey, BC. On walls, I bring colour and ornament to interiors. At the nail desk, I paint tiny works of art. Whichever brought you here, thank you for stopping by.
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
    ...nailPicks.slice(0, paintingPicks.length ? 3 : 4).map((n) => ({ key: n.id, href: "/nails/", label: "Nail artistry", title: n.title, art: n })),
  ];
  return (
    <section aria-labelledby="selected-title" className="border-y border-line bg-panel">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-24">
        <Reveal className="text-center">
          <p className="rise label text-gold">From the studio</p>
          <h2 id="selected-title" className="rise font-display h-section mt-4" style={v({ "--i": 1 })}>
            Selected work
          </h2>
          <Divider className="rise mx-auto mt-5 w-44" />
        </Reveal>
        <ul className={`mt-12 grid grid-cols-2 gap-4 sm:gap-6 ${items.length > 4 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
          {items.map((it, i) => (
            <Reveal as="li" key={it.key}>
              <Link href={it.href} className="rise group block" style={v({ "--i": i % 4 })}>
                <span className="paper-panel block overflow-hidden p-2">
                  <span className="block overflow-hidden">
                    <ArtImage art={it.art} sizes="(min-width: 1024px) 30vw, 46vw" decorative className="aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105" />
                  </span>
                </span>
                <span className="label mt-3 block text-gold">{it.label}</span>
                <span className="font-display mt-1 block text-xl">{it.title}</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
