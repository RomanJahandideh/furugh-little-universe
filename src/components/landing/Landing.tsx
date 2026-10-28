"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/animations/Reveal";
import {
  Arrow,
  ArrowDown,
  Avatar,
  Hand,
  Heart,
  PolishBottle,
  ScribbleCircle,
  Shopper,
  ShoppingBag,
  Smile,
  Sparkle,
  SpeechBubble,
  Squiggle,
  Star,
} from "@/components/illustrations/Doodles";
import type { GalleryArtwork } from "@/lib/artworks";

const NAIL_SETS = [
  ["var(--pink)", "var(--pink)", "var(--white)", "var(--pink)", "var(--pink)"],
  ["var(--lilac)", "var(--mint)", "var(--butter)", "var(--coral)", "var(--pink)"],
  ["var(--ink)", "var(--butter)", "var(--ink)", "var(--butter)", "var(--ink)"],
  ["var(--mint)", "var(--mint)", "var(--lilac)", "var(--mint)", "var(--mint)"],
];

/** The hand on the landing page repaints its nails every couple of seconds. */
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
  // As you scroll, the two identities drift apart from the portrait.
  const bagX = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const handX = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const spin = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const spin2 = useTransform(scrollYProgress, [0, 1], [0, 18]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const nails = NAIL_SETS[useCycle(NAIL_SETS.length, 1800)];

  return (
    <main id="main" className="overflow-x-clip">
      {/* ---------- Hero: both worlds visible before any scroll ---------- */}
      <section
        ref={hero}
        className="relative mx-auto flex max-w-7xl flex-col px-4 pb-8 pt-[calc(var(--nav-h)+env(safe-area-inset-top)+0.75rem)] sm:px-8 lg:min-h-[100svh]"
      >
        <Reveal className="relative lg:flex-1">
          <div className="grid items-center gap-x-10 lg:grid-cols-[1.25fr_1fr]">
            <div className="relative z-10">
              <p className="rise sticker inline-flex -rotate-3 items-center gap-2 px-4 py-1.5 font-hand text-[1.35rem] font-bold" style={{ "--i": 0 } as React.CSSProperties}>
                <Star className="h-5 w-5 text-ink" fill="var(--butter)" draw={false} />
                Furugh Does Things
              </p>
              <h1 className="font-display text-mega mt-5 font-semibold">
                <span className="rise block" style={{ "--i": 1 } as React.CSSProperties}>
                  Hi, I&rsquo;m
                </span>
                <span className="rise relative inline-block" style={{ "--i": 2 } as React.CSSProperties}>
                  Furugh.
                  <ScribbleCircle
                    className="pointer-events-none absolute -inset-x-[8%] -inset-y-[18%] h-[136%] w-[116%] text-pink"
                    style={{ strokeWidth: 3, "--d": "0.5s" } as React.CSSProperties}
                  />
                </span>
              </h1>
              <p className="rise mt-5 max-w-md font-display text-[clamp(1.35rem,5.4vw,2rem)] leading-tight" style={{ "--i": 3 } as React.CSSProperties}>
                I work with people.
                <br />
                <span className="marker">And I make tiny masterpieces.</span>
              </p>
            </div>

            {/* Portrait composition (doodle placeholder until a real photo is added). */}
            <motion.div
              style={{ opacity: fade }}
              className="pointer-events-none relative mx-auto mt-5 w-[42%] max-w-[230px] [@media(max-height:700px)]:mt-2 [@media(max-height:700px)]:w-[22%] lg:mt-0 lg:w-[50%] lg:max-w-[300px]"
              aria-hidden
            >
              <Avatar className="pop relative z-10 w-full text-ink" />
              <motion.div style={{ x: bagX, rotate: spin }} className="absolute -left-[78%] bottom-[4%] w-[62%] lg:-left-[52%] lg:w-[46%]">
                <ShoppingBag className="pop anim-float text-ink" fillColor="var(--butter)" style={{ "--i": 3 } as React.CSSProperties} />
              </motion.div>
              <motion.div style={{ x: handX, rotate: spin2 }} className="absolute -right-[74%] bottom-0 w-[58%] lg:-right-[50%] lg:w-[44%]">
                <Hand className="pop anim-float text-ink" nails={nails} style={{ "--i": 4, "--rot": "8deg" } as React.CSSProperties} />
              </motion.div>
              <Sparkle className="pop anim-twinkle absolute -left-[30%] top-0 w-[18%] text-ink" fillColor="var(--pink)" />
              <Heart className="pop anim-float absolute -right-[26%] top-[6%] w-[16%] text-ink" fillColor="var(--coral)" />
            </motion.div>
          </div>
        </Reveal>

        {/* The two doors. Always on the first screen. */}
        <nav aria-label="Pick a world" className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:mt-4">
          <Door
            href="/retail/"
            tone="var(--butter)"
            kicker="Thing No. 1"
            line="I make shopping feel personal."
            cta="Meet the Sales Pro"
            icon={<ShoppingBag className="h-10 w-10 shrink-0 text-ink sm:h-16 sm:w-16" fillColor="var(--white)" draw={false} />}
          />
          <Door
            href="/nails/"
            tone="var(--pink)"
            kicker="Thing No. 2"
            line="I turn tiny canvases into art."
            cta="Explore Nail Art"
            icon={<Hand className="h-10 w-10 shrink-0 text-ink sm:h-16 sm:w-16" nails={nails} draw={false} />}
          />
        </nav>

        <div className="mt-6 flex items-center justify-center gap-2 font-hand text-xl text-ink-soft" aria-hidden>
          or scroll, and meet them both
          <ArrowDown className="anim-float h-10 w-5 text-ink" draw={false} />
        </div>
      </section>

      {/* ---------- Two worlds, introduced ---------- */}
      <section aria-labelledby="two-worlds" className="mx-auto max-w-7xl px-4 pb-24 sm:px-8">
        <Reveal className="mb-10 text-center">
          <h2 id="two-worlds" className="rise font-display text-huge font-semibold">
            One person.
            <br />
            <span className="relative inline-block">
              Two worlds.
              <Squiggle className="absolute -bottom-3 left-0 h-4 w-full text-pink" style={{ strokeWidth: 3 }} />
            </span>
          </h2>
          <p className="rise mx-auto mt-6 max-w-md text-ink-soft" style={{ "--i": 1 } as React.CSSProperties}>
            Here for a hire? Go left. Here for your next set of nails? Go right. Each world is its own little trip.
          </p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <WorldPanel
            href="/retail/"
            tone="var(--butter)"
            title="Meet Furugh, the people person."
            body="About three years of helping shoppers in a home improvement store, a fashion brand and a buzzing hypermarket."
            cta="Meet the Sales Pro"
            art={
              <div className="relative mx-auto h-56 w-full max-w-sm sm:h-64">
                <ShoppingBag className="pop absolute left-[30%] top-[12%] w-[38%] text-ink" fillColor="var(--white)" />
                <Shopper className="pop anim-float absolute bottom-0 left-[4%] w-[20%] text-ink" tint="var(--mint)" style={{ "--i": 2 } as React.CSSProperties} />
                <Shopper className="pop anim-float absolute bottom-0 right-[6%] w-[19%] text-ink" tint="var(--lilac)" style={{ "--i": 3, animationDelay: "1s" } as React.CSSProperties} />
                <div className="pop absolute right-[2%] top-0 w-[46%]" style={{ "--i": 4 } as React.CSSProperties}>
                  <SpeechBubble className="h-20 w-full text-ink" />
                  <span className="absolute inset-0 grid place-items-center pb-4 font-hand text-xl font-bold">Hi! Need a hand?</span>
                </div>
                <Smile className="pop anim-wobble absolute left-[2%] top-[4%] w-[16%] text-ink" style={{ "--i": 5 } as React.CSSProperties} />
              </div>
            }
          />
          <WorldPanel
            href="/nails/"
            tone="var(--pink)"
            title="Tiny canvases. Big personalities."
            body="A sketchbook of 60 original nail designs: minimal, floral, chrome, cute and loud. Browse by mood or by color."
            cta="Explore Nail Art"
            art={
              <div className="relative mx-auto h-56 w-full max-w-sm sm:h-64">
                {peeks.map((a, i) => (
                  <figure
                    key={a.id}
                    className="pop absolute w-[34%] overflow-hidden rounded-[18px] border-2 border-ink bg-white shadow-[4px_4px_0_var(--ink)]"
                    style={
                      {
                        "--i": i + 1,
                        left: `${4 + i * 30}%`,
                        top: `${[14, 0, 18][i]}%`,
                        rotate: `${[-8, 3, 9][i]}deg`,
                        aspectRatio: "3 / 4",
                      } as React.CSSProperties
                    }
                  >
                    <img
                      src={a.srcSet.split(", ")[0].split(" ")[0]}
                      alt=""
                      width={480}
                      height={640}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                      style={{ backgroundImage: `url(${a.blur})`, backgroundSize: "cover" }}
                    />
                  </figure>
                ))}
                <PolishBottle className="pop anim-wobble absolute -bottom-2 right-[2%] w-[16%] text-ink" polish="var(--pink)" style={{ "--i": 4 } as React.CSSProperties} />
                <Sparkle className="pop anim-twinkle absolute bottom-[6%] left-[4%] w-[10%] text-ink" fillColor="var(--butter)" />
              </div>
            }
          />
        </div>
      </section>

      <footer className="border-t-2 border-ink px-4 py-10 text-center pb-[max(2.5rem,env(safe-area-inset-bottom))]">
        <p className="font-hand text-2xl">Made with ink, polish &amp; a little bit of chaos.</p>
        <p className="mt-2 text-sm text-ink-soft">&copy; {new Date().getFullYear()} Furugh</p>
      </footer>
    </main>
  );
}

function Door({
  href,
  tone,
  kicker,
  line,
  cta,
  icon,
}: {
  href: string;
  tone: string;
  kicker: string;
  line: string;
  cta: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-[10rem] flex-col justify-between overflow-hidden rounded-[28px] border-2 border-ink p-4 shadow-[4px_4px_0_var(--ink)] transition-transform duration-300 [transition-timing-function:var(--ease-bounce)] hover:-translate-y-1 hover:-rotate-1 active:translate-y-0.5 sm:min-h-[13rem] sm:p-6"
      style={{ background: tone }}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="whitespace-nowrap font-hand text-lg font-bold leading-none sm:text-xl">{kicker}</span>
        <span className="transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">{icon}</span>
      </div>
      <div>
        <p className="font-display text-[1.05rem] leading-tight sm:text-2xl">{line}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-[0.95rem] font-bold underline decoration-2 underline-offset-4 sm:text-base">
          {cta}
          <span aria-hidden className="transition-transform group-hover:translate-x-1">&rarr;</span>
        </span>
      </div>
    </Link>
  );
}

function WorldPanel({
  href,
  tone,
  title,
  body,
  cta,
  art,
}: {
  href: string;
  tone: string;
  title: string;
  body: string;
  cta: string;
  art: React.ReactNode;
}) {
  return (
    <Reveal>
      <Link
        href={href}
        className="group relative block overflow-hidden rounded-[36px] border-2 border-ink bg-white p-6 transition-transform duration-500 [transition-timing-function:var(--ease-out)] hover:-translate-y-1 sm:p-10"
      >
        <span
          aria-hidden
          className="absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-70 transition-transform duration-700 group-hover:scale-125"
          style={{ background: tone }}
        />
        <div className="relative">{art}</div>
        <h3 className="rise relative mt-8 font-display text-big font-semibold">{title}</h3>
        <p className="rise relative mt-4 max-w-md text-ink-soft" style={{ "--i": 1 } as React.CSSProperties}>
          {body}
        </p>
        <span className="btn-ink rise relative mt-6" style={{ "--i": 2 } as React.CSSProperties}>
          {cta}
          <Arrow className="h-5 w-9 text-paper" draw={false} />
        </span>
      </Link>
    </Reveal>
  );
}
