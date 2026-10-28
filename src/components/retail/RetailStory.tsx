"use client";

import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";
import {
  ArrowDown,
  Box,
  Cart,
  Chat,
  Checkout,
  Compass,
  Hanger,
  Heart,
  HighFive,
  House,
  Lightning,
  PriceTag,
  Rack,
  Radar,
  Ribbon,
  Shelf,
  Shopper,
  ShoppingBag,
  Shuffle,
  Smile,
  Sparkle,
  SpeechBubble,
  Squiggle,
  Star,
  Toolbox,
  Waver,
} from "@/components/illustrations/Doodles";
import { retailProfile as P } from "@/data/profile";
import { siteConfig } from "@/data/site-config";
import { asset } from "@/lib/paths";

const v = (o: Record<string, string | number>) => o as CSSProperties;

export function RetailStory() {
  return (
    <main id="main" className="overflow-x-clip">
      <Hero />
      <Hello />
      <Stores />
      <Strengths />
      <Receipt />
      <NextChapter />
      <footer className="border-t-2 border-ink px-4 py-10 text-center pb-[max(2.5rem,env(safe-area-inset-bottom))]">
        <p className="font-hand text-2xl">Thanks for stopping by the shop floor.</p>
        <p className="mt-2 text-sm text-ink-soft">&copy; {new Date().getFullYear()} Furugh</p>
      </footer>
    </main>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative mx-auto grid min-h-[92svh] max-w-7xl items-center gap-6 px-4 pt-[calc(var(--nav-h)+env(safe-area-inset-top)+1.5rem)] sm:px-8 lg:grid-cols-[1.3fr_1fr]">
      <Reveal className="relative z-10">
        <p className="rise sticker inline-flex rotate-2 items-center gap-2 bg-butter px-4 py-1.5 font-hand text-[1.3rem] font-bold">
          <ShoppingBag className="h-6 w-6 text-ink" fillColor="var(--white)" draw={false} />
          {P.hero.kicker}
        </p>
        <h1 className="font-display text-mega mt-5 font-semibold">
          <span className="rise block" style={v({ "--i": 1 })}>
            Meet
          </span>
          <span className="rise relative inline-block" style={v({ "--i": 2 })}>
            Furugh.
            <Squiggle className="absolute -bottom-2 left-0 h-5 w-full text-coral" style={v({ strokeWidth: 3.5, "--d": "0.6s" })} />
          </span>
        </h1>
        <p className="rise mt-6 max-w-lg font-display text-[clamp(1.3rem,5vw,1.9rem)] leading-snug" style={v({ "--i": 3 })}>
          {P.hero.subtitle}
        </p>
        <a href="#hello" className="rise mt-8 inline-flex min-h-11 items-center gap-2 font-hand text-xl" style={v({ "--i": 4 })}>
          Come on in
          <ArrowDown className="anim-float h-10 w-5 text-ink" draw={false} />
        </a>
      </Reveal>
      <Reveal className="relative mx-auto w-full max-w-[340px] lg:max-w-[420px]" aria-hidden>
        <span className="absolute inset-[10%] rounded-full bg-butter" />
        <Waver className="relative w-full text-ink" />
        <Star className="pop anim-twinkle absolute left-0 top-[8%] w-[14%] text-ink" fill="var(--pink)" style={v({ "--i": 3 })} />
        <Heart className="pop anim-float absolute right-[4%] top-[2%] w-[12%] text-ink" fillColor="var(--coral)" style={v({ "--i": 4 })} />
      </Reveal>
    </section>
  );
}

/* ---------- Chapter 1: It Starts With Hello ---------- */
function Hello() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const leftIn = useTransform(scrollYProgress, [0.1, 0.45], ["-120%", "0%"]);
  const rightIn = useTransform(scrollYProgress, [0.15, 0.5], ["120%", "0%"]);

  return (
    <section id="hello" ref={ref} aria-labelledby="ch1" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-8 lg:py-32">
      <Reveal className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <ChapterTag n={1} />
          <h2 id="ch1" className="rise font-display text-huge mt-3 font-semibold">
            It Starts
            <br />
            <span className="marker" style={v({ "--marker": "var(--mint)" })}>
              With Hello
            </span>
          </h2>
          {P.hello.body.map((p, i) => (
            <p key={i} className="rise mt-5 max-w-lg text-[1.1rem] text-ink-soft" style={v({ "--i": i + 1 })}>
              {p}
            </p>
          ))}
        </div>

        <div className="relative mx-auto h-[380px] w-full max-w-md sm:h-[440px]" aria-hidden>
          <Waver className="absolute bottom-0 left-1/2 w-[46%] -translate-x-1/2 text-ink" />
          <motion.div style={{ x: leftIn }} className="absolute bottom-0 left-0 w-[20%]">
            <Shopper className="anim-float w-full text-ink" tint="var(--lilac)" draw={false} />
          </motion.div>
          <motion.div style={{ x: rightIn }} className="absolute bottom-0 right-0 w-[19%]">
            <Shopper className="anim-float w-full text-ink" tint="var(--coral)" style={{ animationDelay: "1.2s" }} draw={false} />
          </motion.div>
          {P.hello.bubbles.map((b, i) => (
            <Bubble key={b} text={b} index={i} progress={scrollYProgress} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

const BUBBLE_SPOTS = [
  { left: "0%", top: "2%", rot: -4, tone: "var(--white)" },
  { left: "48%", top: "0%", rot: 3, tone: "var(--butter)" },
  { left: "4%", top: "30%", rot: 2, tone: "var(--mint)" },
  { left: "54%", top: "28%", rot: -3, tone: "var(--white)" },
];

function Bubble({ text, index, progress }: { text: string; index: number; progress: MotionValue<number> }) {
  const start = 0.18 + index * 0.07;
  const opacity = useTransform(progress, [start, start + 0.08], [0, 1]);
  const scale = useTransform(progress, [start, start + 0.1], [0.5, 1]);
  const s = BUBBLE_SPOTS[index];
  return (
    <motion.div
      style={{ opacity, scale, left: s.left, top: s.top, rotate: s.rot }}
      className="absolute w-[46%] origin-bottom-left"
    >
      <SpeechBubble className="h-[84px] w-full text-ink" fillColor={s.tone} draw={false} />
      <span className="absolute inset-0 grid place-items-center px-3 pb-5 text-center font-hand text-[1.25rem] font-bold leading-none">
        {text}
      </span>
    </motion.div>
  );
}

/* ---------- Chapter 2: Every Store Has Its Own Story ---------- */
function Stores() {
  const scenes = P.stores.scenes;
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    steps.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section aria-labelledby="ch2" className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal className="max-w-2xl">
          <ChapterTag n={2} />
          <h2 id="ch2" className="rise font-display text-huge mt-3 font-semibold">
            Every Store Has Its Own Story
          </h2>
          <p className="rise mt-5 text-[1.1rem] text-ink-soft" style={v({ "--i": 1 })}>
            {P.stores.intro}
          </p>
        </Reveal>

        <div className="relative mt-10 lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Sticky stage: the scene redraws itself as each story scrolls by. */}
          <div className="sticky top-[calc(var(--nav-h)+env(safe-area-inset-top))] z-10 -mx-4 bg-white px-4 pb-3 pt-2 sm:-mx-8 sm:px-8 lg:order-2 lg:mx-0 lg:h-[calc(100svh-var(--nav-h))] lg:px-0 lg:pt-10">
            <SceneStage active={active} />
            <ol className="mt-3 flex justify-center gap-2" aria-label="Store scenes">
              {scenes.map((s, i) => (
                <li key={s.id}>
                  <span
                    className={`block rounded-full border-2 border-ink px-3 py-1 text-xs font-bold transition-colors duration-500 ${i === active ? "" : "bg-white text-ink-soft"}`}
                    style={i === active ? { background: s.tone } : undefined}
                    aria-current={i === active ? "step" : undefined}
                  >
                    {s.label}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative lg:order-1">
            {scenes.map((s, i) => (
              <article
                key={s.id}
                ref={(el) => {
                  steps.current[i] = el;
                }}
                data-index={i}
                className="flex min-h-[70svh] items-center py-10 lg:min-h-[90svh]"
              >
                <Reveal className="w-full rounded-[28px] border-2 border-ink bg-paper p-6 shadow-[5px_5px_0_var(--ink)] sm:p-8" style={v({ rotate: `${[-1, 1, -0.5][i]}deg` })}>
                  <p className="rise font-hand text-xl font-bold" style={{ color: "var(--ink)" }}>
                    <span className="marker" style={v({ "--marker": s.tone })}>
                      Scene {String.fromCharCode(65 + i)}: {s.label}
                    </span>
                  </p>
                  <h3 className="rise mt-3 font-display text-big font-semibold" style={v({ "--i": 1 })}>
                    {s.title}
                  </h3>
                  <p className="rise mt-4 text-[1.08rem]" style={v({ "--i": 2 })}>
                    {s.body}
                  </p>
                  <p className="rise mt-5 border-t-2 border-dashed border-ink/30 pt-4 text-sm font-semibold text-ink-soft" style={v({ "--i": 3 })}>
                    {s.where}
                  </p>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const enter = {
  initial: { opacity: 0, scale: 0.6, rotate: -8, y: 20 },
  animate: { opacity: 1, scale: 1, rotate: 0, y: 0 },
  exit: { opacity: 0, scale: 0.7, rotate: 6, y: -10 },
};

function Piece({ className, delay = 0, children }: { className: string; delay?: number; children: ReactNode }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      variants={enter}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "spring", stiffness: 260, damping: 20, delay }}
    >
      {children}
    </motion.div>
  );
}

function SceneStage({ active }: { active: number }) {
  const tone = P.stores.scenes[active].tone;
  return (
    <div
      className="relative mx-auto aspect-[4/3] w-full max-w-[520px] overflow-hidden rounded-[32px] border-2 border-ink transition-colors duration-700 max-lg:max-h-[40svh]"
      style={{ background: `color-mix(in srgb, ${tone} 38%, white)` }}
      aria-hidden
    >
      <div className="dot-grid absolute inset-0 opacity-60" />
      <span className="absolute bottom-[14%] left-0 right-0 border-t-2 border-ink" />
      <AnimatePresence mode="popLayout">
        {active === 0 && (
          <motion.div key="home" className="absolute inset-0">
            <Piece className="left-[6%] top-[10%] w-[40%]">
              <House className="w-full text-ink" draw={false} />
            </Piece>
            <Piece className="right-[5%] top-[8%] w-[46%]" delay={0.08}>
              <Shelf className="w-full text-ink" items={["var(--coral)", "var(--butter)", "var(--white)"]} draw={false} />
            </Piece>
            <Piece className="bottom-[14%] left-[40%] w-[24%]" delay={0.16}>
              <Toolbox className="anim-jiggle w-full text-ink" draw={false} />
            </Piece>
            <Piece className="bottom-[13%] right-[6%] w-[28%]" delay={0.22}>
              <Cart className="w-full text-ink" draw={false} />
            </Piece>
            <Piece className="bottom-[14%] left-[8%] w-[13%]" delay={0.28}>
              <Shopper className="w-full text-ink" tint="var(--mint)" draw={false} />
            </Piece>
          </motion.div>
        )}
        {active === 1 && (
          <motion.div key="fashion" className="absolute inset-0">
            <Piece className="left-[4%] top-[6%] w-[62%]">
              <Rack className="w-full text-ink" draw={false} />
            </Piece>
            <Piece className="right-[6%] top-[10%] w-[26%]" delay={0.1}>
              <Hanger className="anim-wobble w-full text-ink" draw={false} />
            </Piece>
            <Piece className="right-[8%] top-[34%] w-[20%]" delay={0.16}>
              <PriceTag className="anim-wobble w-full text-ink" draw={false} />
            </Piece>
            <Piece className="bottom-[14%] right-[10%] w-[18%]" delay={0.22}>
              <ShoppingBag className="w-full text-ink" fillColor="var(--pink)" draw={false} />
            </Piece>
            <Piece className="bottom-[14%] left-[66%] w-[12%]" delay={0.28}>
              <Shopper className="w-full text-ink" tint="var(--butter)" draw={false} />
            </Piece>
          </motion.div>
        )}
        {active === 2 && (
          <motion.div key="hyper" className="absolute inset-0">
            <Piece className="left-[4%] top-[6%] w-[44%]">
              <Shelf className="w-full text-ink" items={["var(--mint)", "var(--butter)", "var(--pink)"]} draw={false} />
            </Piece>
            <Piece className="right-[4%] top-[18%] w-[44%]" delay={0.08}>
              <Checkout className="w-full text-ink" draw={false} />
            </Piece>
            <Piece className="bottom-[14%] left-[6%] w-[12%]" delay={0.14}>
              <Box className="anim-jiggle w-full text-ink" draw={false} />
            </Piece>
            <Piece className="bottom-[14%] left-[19%] w-[10%]" delay={0.2}>
              <Box className="anim-jiggle w-full text-ink" fillColor="var(--coral)" style={{ animationDelay: "0.4s" }} draw={false} />
            </Piece>
            <div className="absolute bottom-[13%] left-0 right-0 h-[22%] overflow-hidden">
              <div className="h-full w-[30%]" style={{ animation: "roll 5s linear infinite" }}>
                <Cart className="h-full text-ink" draw={false} />
              </div>
            </div>
            <div className="absolute bottom-[13%] left-0 right-0 h-[18%] overflow-hidden">
              <div className="h-full w-[26%]" style={{ animation: "roll 6.5s linear 2.2s infinite", transform: "translateX(-120%)" }}>
                <Cart className="h-full text-ink" draw={false} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Chapter 3: What I Bring to the Floor ---------- */
const ICONS: Record<string, (p: { className: string }) => ReactNode> = {
  chat: (p) => <Chat {...p} />,
  compass: (p) => <Compass {...p} />,
  shuffle: (p) => <Shuffle {...p} />,
  highfive: (p) => <HighFive {...p} />,
  radar: (p) => <Radar {...p} />,
  lightning: (p) => <Lightning {...p} />,
  ribbon: (p) => <Ribbon {...p} />,
};
const CARD_TONES = ["var(--butter)", "var(--mint)", "var(--lilac)", "var(--pink)", "var(--coral)"];

function Strengths() {
  return (
    <section aria-labelledby="ch3" className="mx-auto max-w-7xl px-4 py-24 sm:px-8 lg:py-32">
      <Reveal className="max-w-2xl">
        <ChapterTag n={3} />
        <h2 id="ch3" className="rise font-display text-huge mt-3 font-semibold">
          What I Bring to the Floor
        </h2>
      </Reveal>
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {P.strengths.cards.map((c, i) => (
          <Reveal as="li" key={c.title} className={i === 6 ? "lg:col-start-2" : ""}>
            <div
              className="rise group relative h-full rounded-[28px] border-2 border-ink bg-white p-6 transition-transform duration-500 [transition-timing-function:var(--ease-bounce)] hover:-rotate-1 hover:scale-[1.02]"
              style={v({ "--r0": `${i % 2 ? 4 : -4}deg`, rotate: `${[-1.2, 0.8, -0.4, 1.1, -0.8, 0.5, -1][i]}deg` })}
            >
              <div className="flex items-center gap-4">
                <span
                  className="grid h-16 w-16 shrink-0 place-items-center rounded-full border-2 border-ink transition-transform duration-500 group-hover:rotate-12"
                  style={{ background: CARD_TONES[i % CARD_TONES.length] }}
                >
                  {ICONS[c.icon]({ className: "h-10 w-10 text-ink" })}
                </span>
                <h3 className="font-display text-[1.45rem] font-semibold leading-tight">{c.title}</h3>
              </div>
              <p className="mt-4 text-ink-soft">{c.body}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/* ---------- The short version, as a shop receipt ---------- */
function Receipt() {
  return (
    <section aria-labelledby="facts" className="px-4 pb-24 sm:px-8">
      <Reveal className="mx-auto max-w-sm">
        <div
          className="rise relative bg-white px-6 pb-10 pt-8 font-mono text-[0.92rem] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)]"
          style={v({
            rotate: "-1.5deg",
            "--r0": "-6deg",
            maskImage:
              "conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / 18px 100%",
            WebkitMaskImage:
              "conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / 18px 100%",
          })}
        >
          <h2 id="facts" className="text-center font-sans text-lg font-bold uppercase tracking-[0.2em]">
            The short version
          </h2>
          <p className="mt-1 text-center text-xs text-ink-soft">for busy hiring managers</p>
          <p className="my-4 overflow-hidden whitespace-nowrap text-ink-soft" aria-hidden>
            - - - - - - - - - - - - - - - - - - - - - - - - - -
          </p>
          <ul className="space-y-3">
            {P.facts.map((f) => (
              <li key={f} className="flex gap-3">
                <span aria-hidden>&#10003;</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <p className="my-4 overflow-hidden whitespace-nowrap text-ink-soft" aria-hidden>
            - - - - - - - - - - - - - - - - - - - - - - - - - -
          </p>
          <p className="text-center font-hand text-2xl font-bold">Thank you, come again!</p>
          <Smile className="mx-auto mt-2 h-10 w-10 text-ink" draw={false} />
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- Chapter 4: Ready for What's Next ---------- */
function NextChapter() {
  const { email, resumePath, profileUrl } = siteConfig.retail;
  return (
    <section aria-labelledby="ch4" className="relative overflow-hidden bg-butter px-4 py-24 sm:px-8 lg:py-32">
      <Reveal className="relative mx-auto max-w-4xl text-center">
        <Sparkle className="pop anim-twinkle absolute left-0 top-0 w-12 text-ink sm:w-16" fillColor="var(--white)" />
        <Sparkle className="pop anim-twinkle absolute bottom-0 right-2 w-10 text-ink" fillColor="var(--pink)" style={{ animationDelay: "1s" }} />
        <ChapterTag n={4} center />
        <h2 id="ch4" className="rise font-display text-huge mt-3 font-semibold">
          {P.next.title}
        </h2>
        <p className="rise mx-auto mt-6 max-w-xl text-[1.15rem]" style={v({ "--i": 1 })}>
          {P.next.body}
        </p>
        <div className="rise mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row" style={v({ "--i": 2 })}>
          {email ? (
            <a className="btn-ink" href={`mailto:${email}?subject=${encodeURIComponent("Retail role: hello Furugh")}`}>
              Get in Touch
            </a>
          ) : (
            <span className="btn-ink" aria-disabled="true" title="Contact email not added yet">
              Get in Touch <span className="text-xs font-normal">(email coming soon)</span>
            </span>
          )}
          {resumePath ? (
            <a className="btn-line" href={asset(resumePath)} download>
              View My Résumé
            </a>
          ) : (
            <span className="btn-line" aria-disabled="true" title="Résumé PDF not added yet">
              View My Résumé <span className="text-xs font-normal">(PDF coming soon)</span>
            </span>
          )}
        </div>
        {profileUrl && (
          <p className="rise mt-6" style={v({ "--i": 3 })}>
            <a className="font-semibold underline decoration-2 underline-offset-4" href={profileUrl} rel="noopener noreferrer" target="_blank">
              Professional profile
            </a>
          </p>
        )}
        <p className="rise mt-8 text-sm text-ink-soft" style={v({ "--i": 4 })}>
          This contact is for employers and recruiters.
        </p>
      </Reveal>
    </section>
  );
}

function ChapterTag({ n, center = false }: { n: number; center?: boolean }) {
  return (
    <p className={`rise flex items-center gap-2 font-hand text-xl font-bold ${center ? "justify-center" : ""}`}>
      <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-ink bg-white text-lg">{n}</span>
      Chapter {n}
    </p>
  );
}
