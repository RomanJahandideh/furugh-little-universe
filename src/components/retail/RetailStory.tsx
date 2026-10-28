"use client";

import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { Marquee, ScrollLit, Tilt3D } from "@/components/animations/Motion";
import { NumberedTabs } from "@/components/animations/NumberedTabs";
import { Reveal } from "@/components/animations/Reveal";
import {
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
import { BigFooter } from "@/components/landing/Landing";
import { retailProfile as P } from "@/data/profile";
import { siteConfig } from "@/data/site-config";
import { asset } from "@/lib/paths";

const v = (o: Record<string, string | number>) => o as CSSProperties;

export function RetailStory() {
  return (
    <main id="main" className="overflow-x-clip">
      <Hero />
      <section aria-label="In short" className="mx-auto max-w-6xl px-4 py-20 sm:px-8 sm:py-32">
        <p className="label-mono mb-6 text-ink-soft">(The short story)</p>
        <ScrollLit as="p" className="font-display text-statement" accent={["exactly", "people."]} text={P.hero.subtitle} />
      </section>
      <Hello />
      <Marquee
        className="bg-butter py-4 font-display text-[clamp(1.4rem,5vw,2.6rem)] uppercase text-char"
        items={["Customer communication", "Product guidance", "Adaptability", "Team collaboration", "Calm in the rush"]}
      />
      <Stores />
      <Strengths />
      <Receipt />
      <NextChapter />
      <BigFooter line="Thanks for stopping by the shop floor." />
    </main>
  );
}

function ChapterTag({ n, title }: { n: number; title?: string }) {
  return (
    <p className="rise label-mono flex items-center gap-3 text-ink-soft">
      <span className="text-pink">{String(n).padStart(2, "0")}</span>
      <span className="h-px w-8 bg-line" />
      {title ?? `Chapter ${n}`}
    </p>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative mx-auto grid min-h-[88svh] max-w-7xl items-center gap-8 px-4 pt-[calc(var(--nav-h)+env(safe-area-inset-top)+1.5rem)] sm:px-8 lg:grid-cols-[1.3fr_1fr]">
      <Reveal className="relative z-10">
        <p className="rise label-mono flex items-center gap-2 text-ink-soft">
          <span className="h-2 w-2 rounded-full bg-butter" /> {P.hero.kicker}
        </p>
        <h1 className="font-display text-mega mt-4 uppercase">
          <span className="rise block" style={v({ "--i": 1 })}>
            Meet
          </span>
          <span className="rise relative inline-block" style={v({ "--i": 2 })}>
            Furugh<span className="text-butter">.</span>
            <Squiggle className="absolute -bottom-2 left-0 h-5 w-full text-butter" style={v({ strokeWidth: 3, "--d": "0.6s" })} />
          </span>
        </h1>
        <p className="rise mt-6 max-w-md text-[1.15rem] text-ink-soft" style={v({ "--i": 3 })}>
          Retail sales associate. People person. About three years of making shoppers feel looked after.
        </p>
        <div className="rise mt-8 flex flex-wrap gap-3" style={v({ "--i": 4 })}>
          <a href="#contact" className="btn-ink">
            Get in touch
          </a>
          <a href="#hello" className="btn-line">
            Read the story <span aria-hidden>&darr;</span>
          </a>
        </div>
      </Reveal>
      <Reveal className="relative mx-auto w-full max-w-[320px] lg:max-w-[420px]" aria-hidden>
        <span className="glow absolute inset-[4%] rounded-full opacity-70 blur-2xl" style={v({ "--g1": "var(--butter)", "--g2": "var(--coral)", "--g3": "var(--mint)" })} />
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
    <section id="hello" ref={ref} aria-labelledby="ch1" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-8 lg:py-28">
      <Reveal className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <ChapterTag n={1} />
          <h2 id="ch1" className="rise font-display text-huge mt-4 uppercase">
            It starts <span className="marker">with hello</span>
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
  { left: "0%", top: "2%", rot: -4, tone: "var(--sand)" },
  { left: "48%", top: "0%", rot: 3, tone: "var(--butter)" },
  { left: "4%", top: "30%", rot: 2, tone: "var(--mint)" },
  { left: "54%", top: "28%", rot: -3, tone: "var(--pink)" },
];

function Bubble({ text, index, progress }: { text: string; index: number; progress: MotionValue<number> }) {
  const start = 0.18 + index * 0.07;
  const opacity = useTransform(progress, [start, start + 0.08], [0, 1]);
  const scale = useTransform(progress, [start, start + 0.1], [0.5, 1]);
  const s = BUBBLE_SPOTS[index];
  return (
    <motion.div style={{ opacity, scale, left: s.left, top: s.top, rotate: s.rot }} className="on-light absolute w-[46%] origin-bottom-left">
      <SpeechBubble className="h-[84px] w-full text-ink" fillColor={s.tone} draw={false} />
      <span className="absolute inset-0 grid place-items-center px-3 pb-5 text-center font-hand text-[1.25rem] font-bold leading-none">{text}</span>
    </motion.div>
  );
}

/* ---------- Chapter 2: Every Store Has Its Own Story (numbered tabs) ---------- */
function Stores() {
  const scenes = P.stores.scenes;
  return (
    <section aria-labelledby="ch2" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal className="max-w-3xl">
          <ChapterTag n={2} />
          <h2 id="ch2" className="rise font-display text-huge mt-4 uppercase">
            Every store has its own story
          </h2>
          <p className="rise mt-5 text-[1.1rem] text-ink-soft" style={v({ "--i": 1 })}>
            {P.stores.intro}
          </p>
        </Reveal>

        <div className="mt-10 overflow-hidden rounded-[28px] border border-line bg-panel p-3 sm:p-5">
          <NumberedTabs
            label="Store scenes"
            stepMs={3600}
            tabs={scenes.map((s, si) => ({
              id: s.id,
              label: ["Home", "Fashion", "Hypermarket"][si],
              steps: s.pills.length,
              render: (step, goTo) => (
                <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr] lg:gap-8">
                  <div className="flex flex-col gap-3">
                    <div className="on-light rounded-[22px] bg-sand p-6 sm:p-8">
                      <p className="label-mono text-ink-soft">{s.label}</p>
                      <h3 className="mt-3 font-display text-big uppercase">{s.title}</h3>
                      <p className="mt-4 text-[1.05rem]">{s.body}</p>
                      <p className="mt-5 border-t border-line pt-4 text-sm font-semibold text-ink-soft">{s.where}</p>
                    </div>
                    <ul className="flex flex-wrap gap-2">
                      {s.pills.map((pill, pi) => (
                        <li key={pill}>
                          <button
                            type="button"
                            onClick={() => goTo(pi)}
                            aria-pressed={pi === step}
                            className={`flex min-h-11 items-center gap-2 rounded-full px-4 font-display text-[0.95rem] uppercase tracking-[-0.01em] transition-colors duration-300 ${
                              pi === step ? "bg-ink text-paper" : "border border-line text-ink-soft hover:text-ink"
                            }`}
                          >
                            {pill}
                            <span aria-hidden className={`grid h-5 w-5 place-items-center rounded-full text-xs transition-transform duration-300 ${pi === step ? "rotate-45 bg-pink text-char" : "border border-line"}`}>
                              +
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Tilt3D from={12} max={5}>
                    <SceneStage active={si} focus={step} />
                  </Tilt3D>
                </div>
              ),
            }))}
          />
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
    <motion.div className={`absolute ${className}`} variants={enter} initial="initial" animate="animate" exit="exit" transition={{ type: "spring", stiffness: 260, damping: 20, delay }}>
      {children}
    </motion.div>
  );
}

function SceneStage({ active, focus }: { active: number; focus: number }) {
  const tone = P.stores.scenes[active].tone;
  return (
    <div
      className="on-light relative aspect-[4/3] w-full overflow-hidden rounded-[22px] transition-colors duration-700"
      style={{ background: `color-mix(in srgb, ${tone} 55%, #f3efe7)` }}
      aria-hidden
    >
      <div className="dot-grid absolute inset-0 opacity-60" />
      <span className="absolute bottom-[14%] left-0 right-0 border-t-2 border-ink" />
      <span className="label-mono absolute right-4 top-4 rounded-full bg-[#f3efe7] px-2.5 py-1">
        {String(active + 1).padStart(2, "0")}.{focus + 1}
      </span>
      <AnimatePresence mode="popLayout">
        {active === 0 && (
          <motion.div key="home" className="absolute inset-0">
            <Piece className="left-[6%] top-[10%] w-[40%]"><House className="w-full text-ink" draw={false} /></Piece>
            <Piece className="right-[5%] top-[14%] w-[46%]" delay={0.08}><Shelf className="w-full text-ink" items={["var(--coral)", "var(--butter)", "#ffffff"]} draw={false} /></Piece>
            <Piece className="bottom-[14%] left-[40%] w-[24%]" delay={0.16}><Toolbox className="anim-jiggle w-full text-ink" draw={false} /></Piece>
            <Piece className="bottom-[13%] right-[6%] w-[28%]" delay={0.22}><Cart className="w-full text-ink" draw={false} /></Piece>
            <Piece className="bottom-[14%] left-[8%] w-[13%]" delay={0.28}><Shopper className="w-full text-ink" tint="var(--mint)" draw={false} /></Piece>
          </motion.div>
        )}
        {active === 1 && (
          <motion.div key="fashion" className="absolute inset-0">
            <Piece className="left-[4%] top-[8%] w-[62%]"><Rack className="w-full text-ink" draw={false} /></Piece>
            <Piece className="right-[6%] top-[14%] w-[26%]" delay={0.1}><Hanger className="anim-wobble w-full text-ink" draw={false} /></Piece>
            <Piece className="right-[8%] top-[38%] w-[20%]" delay={0.16}><PriceTag className="anim-wobble w-full text-ink" draw={false} /></Piece>
            <Piece className="bottom-[14%] right-[10%] w-[18%]" delay={0.22}><ShoppingBag className="w-full text-ink" fillColor="var(--pink)" draw={false} /></Piece>
            <Piece className="bottom-[14%] left-[66%] w-[12%]" delay={0.28}><Shopper className="w-full text-ink" tint="var(--butter)" draw={false} /></Piece>
          </motion.div>
        )}
        {active === 2 && (
          <motion.div key="hyper" className="absolute inset-0">
            <Piece className="left-[4%] top-[8%] w-[44%]"><Shelf className="w-full text-ink" items={["var(--mint)", "var(--butter)", "var(--pink)"]} draw={false} /></Piece>
            <Piece className="right-[4%] top-[20%] w-[44%]" delay={0.08}><Checkout className="w-full text-ink" draw={false} /></Piece>
            <Piece className="bottom-[14%] left-[6%] w-[12%]" delay={0.14}><Box className="anim-jiggle w-full text-ink" draw={false} /></Piece>
            <Piece className="bottom-[14%] left-[19%] w-[10%]" delay={0.2}><Box className="anim-jiggle w-full text-ink" fillColor="var(--coral)" style={{ animationDelay: "0.4s" }} draw={false} /></Piece>
            <div className="absolute bottom-[13%] left-0 right-0 h-[22%] overflow-hidden">
              <div className="h-full w-[30%]" style={{ animation: "roll 5s linear infinite" }}><Cart className="h-full text-ink" draw={false} /></div>
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
    <section aria-labelledby="ch3" className="mx-auto max-w-7xl px-4 py-20 sm:px-8 lg:py-28">
      <Reveal className="max-w-3xl">
        <ChapterTag n={3} />
        <h2 id="ch3" className="rise font-display text-huge mt-4 uppercase">
          What I bring to the floor
        </h2>
      </Reveal>
      <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {P.strengths.cards.map((c, i) => (
          <Reveal as="li" key={c.title} className={i === 6 ? "lg:col-start-2" : ""}>
            <Tilt3D from={10} max={6} className="h-full">
              <div className="rise group relative h-full overflow-hidden rounded-[24px] border border-line bg-panel p-6" style={v({ "--i": i % 3 })}>
                <span aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60" style={{ background: CARD_TONES[i % CARD_TONES.length] }} />
                <div className="relative flex items-center justify-between">
                  <span className="label-mono text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
                  <span className="on-light grid h-14 w-14 place-items-center rounded-full transition-transform duration-500 group-hover:rotate-12" style={{ background: CARD_TONES[i % CARD_TONES.length] }}>
                    {ICONS[c.icon]({ className: "h-9 w-9 text-ink" })}
                  </span>
                </div>
                <h3 className="relative mt-8 font-display text-[1.6rem] uppercase leading-[0.95]">{c.title}</h3>
                <p className="relative mt-3 text-ink-soft">{c.body}</p>
              </div>
            </Tilt3D>
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
        <Tilt3D from={18} max={8}>
          <div
            className="rise on-light relative bg-[#f6f3ec] px-6 pb-10 pt-8 font-mono text-[0.92rem]"
            style={v({
              rotate: "-1.5deg",
              maskImage: "conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / 18px 100%",
              WebkitMaskImage: "conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / 18px 100%",
            })}
          >
            <h2 id="facts" className="text-center font-sans text-lg font-bold uppercase tracking-[0.2em]">The short version</h2>
            <p className="mt-1 text-center text-xs text-ink-soft">for busy hiring managers</p>
            <p className="my-4 overflow-hidden whitespace-nowrap text-ink-soft" aria-hidden>- - - - - - - - - - - - - - - - - - - - - - - - - -</p>
            <ul className="space-y-3">
              {P.facts.map((f) => (
                <li key={f} className="flex gap-3">
                  <span aria-hidden>&#10003;</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <p className="my-4 overflow-hidden whitespace-nowrap text-ink-soft" aria-hidden>- - - - - - - - - - - - - - - - - - - - - - - - - -</p>
            <p className="text-center font-hand text-2xl font-bold">Thank you, come again!</p>
            <Smile className="mx-auto mt-2 h-10 w-10 text-ink" draw={false} />
          </div>
        </Tilt3D>
      </Reveal>
    </section>
  );
}

/* ---------- Chapter 4: Ready for What's Next ---------- */
function NextChapter() {
  const { email, resumePath, profileUrl } = siteConfig.retail;
  return (
    <section id="contact" aria-labelledby="ch4" className="on-light relative scroll-mt-24 overflow-hidden bg-butter px-4 py-24 sm:px-8 lg:py-32">
      <Reveal className="relative mx-auto max-w-5xl">
        <Sparkle className="pop anim-twinkle absolute right-0 top-0 w-12 text-ink sm:w-16" fillColor="#ffffff" />
        <p className="rise label-mono flex items-center gap-3">
          <span>04</span>
          <span className="h-px w-8 bg-line" /> Chapter 4
        </p>
        <h2 id="ch4" className="rise font-display text-huge mt-4 uppercase">
          {P.next.title}
        </h2>
        <p className="rise mt-6 max-w-xl text-[1.15rem]" style={v({ "--i": 1 })}>
          {P.next.body}
        </p>
        <div className="rise mt-10 flex flex-col gap-3 sm:flex-row" style={v({ "--i": 2 })}>
          {email ? (
            <a className="btn-ink" href={`mailto:${email}?subject=${encodeURIComponent("Retail role: hello Furugh")}`}>Get in Touch</a>
          ) : (
            <span className="btn-ink" aria-disabled="true" title="Contact email not added yet">
              Get in Touch <span className="text-xs font-normal">(email coming soon)</span>
            </span>
          )}
          {resumePath ? (
            <a className="btn-line" href={asset(resumePath)} download>View My Résumé</a>
          ) : (
            <span className="btn-line" aria-disabled="true" title="Résumé PDF not added yet">
              View My Résumé <span className="text-xs font-normal">(PDF coming soon)</span>
            </span>
          )}
        </div>
        {profileUrl && (
          <p className="rise mt-6" style={v({ "--i": 3 })}>
            <a className="font-semibold underline decoration-2 underline-offset-4" href={profileUrl} rel="noopener noreferrer" target="_blank">Professional profile</a>
          </p>
        )}
        <p className="rise mt-8 text-sm text-ink-soft" style={v({ "--i": 4 })}>This contact is for employers and recruiters.</p>
      </Reveal>
    </section>
  );
}
