"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Marquee, ScrollLit, Tilt3D } from "@/components/animations/Motion";
import { Reveal } from "@/components/animations/Reveal";
import { Avatar, Hand, Heart, ScribbleCircle, Shopper, ShoppingBag, Smile, Sparkle, SpeechBubble } from "@/components/illustrations/Doodles";
import { ArtImage } from "@/components/gallery/ArtImage";
import type { GalleryArtwork } from "@/lib/artworks";

const v = (o: Record<string, string | number>) => o as CSSProperties;

const NAIL_SETS = [
  ["var(--pink)", "var(--pink)", "var(--white)", "var(--pink)", "var(--pink)"],
  ["var(--lilac)", "var(--mint)", "var(--butter)", "var(--coral)", "var(--pink)"],
  ["var(--butter)", "var(--butter)", "var(--pink)", "var(--butter)", "var(--butter)"],
  ["var(--mint)", "var(--mint)", "var(--lilac)", "var(--mint)", "var(--mint)"],
];

function useCycle(length: number, ms: number) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % length), ms);
    return () => window.clearInterval(t);
  }, [length, ms]);
  return i;
}

export function Landing({ peeks }: { peeks: GalleryArtwork[] }) {
  const hero = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const bagX = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);
  const handX = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);
  const lift = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const nails = NAIL_SETS[useCycle(NAIL_SETS.length, 1800)];

  return (
    <main id="main" className="overflow-x-clip">
      {/* ---------- Hero ---------- */}
      <section
        ref={hero}
        className="relative mx-auto flex max-w-7xl flex-col px-4 pb-8 pt-[calc(var(--nav-h)+env(safe-area-inset-top)+1rem)] sm:px-8 lg:min-h-[100svh]"
      >
        <Reveal className="relative lg:flex-1">
          <div className="grid items-center gap-x-10 lg:grid-cols-[1.3fr_1fr]">
            <motion.div style={{ y: lift }} className="relative z-10">
              <p className="rise label-mono flex items-center gap-2 text-ink-soft">
                <span className="h-2 w-2 rounded-full bg-pink" /> Furugh Does Things
              </p>
              <h1 className="font-display text-mega mt-4 uppercase">
                <span className="rise block" style={v({ "--i": 1 })}>
                  Hi, I&rsquo;m
                </span>
                <span className="rise relative inline-block" style={v({ "--i": 2 })}>
                  Furugh<span className="text-pink">.</span>
                  <ScribbleCircle className="pointer-events-none absolute -inset-x-[6%] -inset-y-[16%] h-[132%] w-[112%] text-pink" style={v({ strokeWidth: 2.4, "--d": "0.5s" })} />
                </span>
              </h1>
              <p className="rise mt-5 max-w-md text-[clamp(1.2rem,4.8vw,1.7rem)] font-medium leading-snug text-ink-soft" style={v({ "--i": 3 })}>
                I work with people. <span className="text-ink">And I make tiny masterpieces.</span>
              </p>
            </motion.div>

            {/* Doodle portrait placeholder, flanked by her two worlds. */}
            <motion.div
              style={{ opacity: fade }}
              className="pointer-events-none relative mx-auto mt-5 w-[40%] max-w-[230px] [@media(max-height:700px)]:mt-2 [@media(max-height:700px)]:w-[22%] lg:mt-0 lg:w-[50%] lg:max-w-[300px]"
              aria-hidden
            >
              <span className="glow absolute -inset-[35%] -z-10 rounded-full opacity-60 blur-3xl" />
              <Avatar className="pop relative z-10 w-full text-ink" />
              <motion.div style={{ x: bagX }} className="absolute -left-[78%] bottom-[4%] w-[62%] lg:-left-[52%] lg:w-[46%]">
                <ShoppingBag className="pop anim-float text-ink" fillColor="var(--butter)" style={v({ "--i": 3 })} />
              </motion.div>
              <motion.div style={{ x: handX }} className="absolute -right-[74%] bottom-0 w-[58%] lg:-right-[50%] lg:w-[44%]">
                <Hand className="pop anim-float text-ink" nails={nails} style={v({ "--i": 4, "--rot": "8deg" })} />
              </motion.div>
              <Sparkle className="pop anim-twinkle absolute -left-[30%] top-0 w-[18%] text-ink" fillColor="var(--pink)" />
              <Heart className="pop anim-float absolute -right-[26%] top-[6%] w-[16%] text-ink" fillColor="var(--coral)" />
            </motion.div>
          </div>
        </Reveal>

        <nav aria-label="Pick a world" className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-4 lg:mt-4">
          <Door href="/retail/" n="01" world="People" line="I make shopping feel personal." cta="Meet the Sales Pro" tone="var(--sand)"
            icon={<ShoppingBag className="h-9 w-9 shrink-0 text-ink sm:h-14 sm:w-14" fillColor="var(--butter)" draw={false} />} />
          <Door href="/nails/" n="02" world="Nails" line="I turn tiny canvases into art." cta="Explore Nail Art" tone="var(--pink)"
            icon={<Hand className="h-9 w-9 shrink-0 text-ink sm:h-14 sm:w-14" nails={nails} draw={false} />} />
        </nav>
      </section>

      <Marquee
        className="border-y border-line py-4 font-display text-[clamp(1.4rem,5vw,2.6rem)] uppercase"
        items={["Customer first", "French tips", "Product guidance", "Chrome & sparkle", "Calm in the rush", "Hand-painted florals", "Team player", "Tiny doodles"]}
      />

      {/* ---------- Statement ---------- */}
      <section aria-label="About" className="mx-auto max-w-6xl px-4 py-24 sm:px-8 sm:py-36">
        <p className="label-mono mb-6 text-ink-soft">(One person, two worlds)</p>
        <ScrollLit
          as="h2"
          className="font-display text-statement"
          accent={["Furugh", "two", "yours"]}
          text="Furugh helps shoppers find exactly what they came for, and paints tiny works of art on ten small canvases. One person, two worlds. Pick yours."
        />
      </section>

      {/* ---------- The two worlds ---------- */}
      <section aria-label="The two worlds" className="mx-auto grid max-w-7xl gap-6 px-4 pb-28 sm:px-8 lg:grid-cols-2 lg:gap-8">
        <WorldPanel
          href="/retail/"
          n="01"
          title="Meet Furugh, the people person."
          body="About three years of helping shoppers: a home improvement store, a fashion brand and a buzzing hypermarket."
          cta="Meet the Sales Pro"
          glow={["var(--butter)", "var(--coral)", "var(--mint)"]}
          art={
            <div className="relative mx-auto h-56 w-full max-w-sm sm:h-64">
              <ShoppingBag className="pop absolute left-[30%] top-[14%] w-[36%] text-ink" fillColor="var(--butter)" />
              <Shopper className="pop anim-float absolute bottom-0 left-[4%] w-[20%] text-ink" tint="var(--mint)" style={v({ "--i": 2 })} />
              <Shopper className="pop anim-float absolute bottom-0 right-[6%] w-[19%] text-ink" tint="var(--lilac)" style={v({ "--i": 3, animationDelay: "1s" })} />
              <div className="pop on-light absolute right-[0%] top-0 w-[48%]" style={v({ "--i": 4 })}>
                <SpeechBubble className="h-20 w-full text-ink" />
                <span className="absolute inset-0 grid place-items-center pb-4 font-hand text-xl font-bold">Hi! Need a hand?</span>
              </div>
              <Smile className="pop anim-wobble absolute left-[2%] top-[4%] w-[15%] text-ink" style={v({ "--i": 5 })} />
            </div>
          }
        />
        <WorldPanel
          href="/nails/"
          n="02"
          title="Tiny canvases. Big personalities."
          body="A sketchbook of 60 original nail designs: minimal, floral, chrome, cute and loud. Browse by mood or by color."
          cta="Explore Nail Art"
          glow={["var(--pink)", "var(--lilac)", "var(--coral)"]}
          art={
            <div className="relative mx-auto h-56 w-full max-w-sm sm:h-64">
              {peeks.map((a, i) => (
                <figure
                  key={a.id}
                  className="pop absolute w-[34%] overflow-hidden rounded-2xl border border-line bg-panel"
                  style={v({ "--i": i + 1, left: `${4 + i * 30}%`, top: `${[14, 0, 18][i]}%`, rotate: `${[-8, 3, 9][i]}deg` })}
                >
                  <ArtImage art={a} sizes="160px" decorative className="aspect-[3/4] object-cover" />
                </figure>
              ))}
              <Sparkle className="pop anim-twinkle absolute bottom-[6%] left-[4%] w-[10%] text-ink" fillColor="var(--butter)" />
            </div>
          }
        />
      </section>

      <BigFooter />
    </main>
  );
}

function Door({ href, n, world, line, cta, tone, icon }: { href: string; n: string; world: string; line: string; cta: string; tone: string; icon: ReactNode }) {
  return (
    <Link
      href={href}
      className="on-light group relative flex min-h-[10rem] flex-col justify-between overflow-hidden rounded-[22px] p-4 transition-transform duration-500 [transition-timing-function:var(--ease-out)] hover:-translate-y-1 sm:min-h-[13rem] sm:p-6"
      style={{ background: tone }}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="label-mono whitespace-nowrap">
          {n} / {world}
        </span>
        <span className="transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">{icon}</span>
      </div>
      <div>
        <p className="font-display text-[1.15rem] uppercase leading-[0.95] sm:text-3xl">{line}</p>
        <span className="mt-3 inline-flex items-center gap-2 text-[0.9rem] font-bold sm:text-base">
          {cta}
          <span aria-hidden className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-char text-[#f3f0ea] transition-transform duration-500 group-hover:translate-x-1 group-hover:-rotate-45">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}

function WorldPanel({ href, n, title, body, cta, art, glow }: { href: string; n: string; title: string; body: string; cta: string; art: ReactNode; glow: string[] }) {
  return (
    <Reveal>
      <Tilt3D className="h-full">
        <Link href={href} className="group relative block h-full overflow-hidden rounded-[28px] border border-line bg-panel p-6 sm:p-10">
          <span aria-hidden className="glow absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-50 blur-2xl transition-transform duration-1000 group-hover:scale-150" style={v({ "--g1": glow[0], "--g2": glow[1], "--g3": glow[2] })} />
          <p className="label-mono relative text-ink-soft">{n}</p>
          <div className="relative mt-2">{art}</div>
          <h3 className="rise relative mt-8 font-display text-big uppercase">{title}</h3>
          <p className="rise relative mt-4 max-w-md text-ink-soft" style={v({ "--i": 1 })}>
            {body}
          </p>
          <span className="btn-ink rise relative mt-7" style={v({ "--i": 2 })}>
            {cta} <span aria-hidden>&rarr;</span>
          </span>
        </Link>
      </Tilt3D>
    </Reveal>
  );
}

export function BigFooter({ line = "Made with ink, polish & a little bit of chaos." }: { line?: string }) {
  return (
    <footer className="overflow-hidden border-t border-line px-4 pt-14 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <p className="font-hand text-2xl text-ink-soft">{line}</p>
        <p className="label-mono text-ink-soft">&copy; {new Date().getFullYear()} Furugh</p>
      </div>
      <p aria-hidden className="mx-auto mt-6 max-w-7xl select-none font-display text-[clamp(5rem,27vw,22rem)] uppercase leading-[0.78] text-[color-mix(in_srgb,var(--ink)_8%,transparent)]">
        Furugh<span className="text-pink/60">.</span>
      </p>
    </footer>
  );
}
