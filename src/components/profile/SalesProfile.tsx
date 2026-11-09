"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { ArtImage } from "@/components/gallery/ArtImage";
import { portrait } from "@/data/portrait";
import { profile as P } from "@/data/profile";
import { siteConfig } from "@/data/site-config";
import type { GalleryArtwork } from "@/lib/artworks";
import { asset } from "@/lib/paths";
import { ContactForm } from "./ContactForm";
import { Welcome } from "./Welcome";

const v = (o: Record<string, string | number>) => o as CSSProperties;
const srcset = (p: { name: string; widths: number[] }) =>
  p.widths.map((w) => `${asset(`/images/profile/${p.name}-${w}.webp`)} ${w}w`).join(", ");
const R = siteConfig.retail;

export function SalesProfile({ peeks }: { peeks: GalleryArtwork[] }) {
  return (
    <>
      <Welcome />
      <main id="main" className="overflow-x-clip">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <LookingFor />
        <NailTeaser peeks={peeks} />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

function Aisle({ n, label, light = false }: { n: string; label: string; light?: boolean }) {
  return (
    <p className={`aisle rise ${light ? "!text-white/70" : ""}`}>
      <b>{n}</b> {label}
    </p>
  );
}

function ResumeButton({ className }: { className: string }) {
  if (!R.resumePath) return null;
  return (
    <a href={asset(R.resumePath)} download className={className}>
      Download résumé <span aria-hidden>&darr;</span>
    </a>
  );
}

/* ---------- Hero: cinematic photo ---------- */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-[86svh] min-h-[560px] overflow-hidden bg-[#2a211b] md:h-[94svh]">
      <motion.div style={{ y }} className="absolute inset-0">
        <picture>
          <source media="(min-width: 768px)" srcSet={srcset(portrait.wide)} sizes="100vw" />
          <img
            id="hero-photo"
            src={asset(`/images/profile/${portrait.tall.name}-960.webp`)}
            srcSet={srcset(portrait.tall)}
            sizes="100vw"
            width={portrait.tall.width}
            height={portrait.tall.height}
            alt={portrait.alt}
            fetchPriority="high"
            className="push-in h-full w-full object-cover object-[50%_30%] md:object-[70%_40%]"
            style={{ backgroundImage: `url(${portrait.tall.blur})`, backgroundSize: "cover" }}
          />
        </picture>
      </motion.div>
      {/* Cinematic shading: bottom on phones, left side on larger screens. */}
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,11,9,0.9)_0%,rgba(14,11,9,0.5)_40%,rgba(14,11,9,0)_64%)] md:bg-[linear-gradient(to_right,rgba(14,11,9,0.82)_0%,rgba(14,11,9,0.5)_36%,rgba(14,11,9,0)_62%)]" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/35 to-transparent" />

      <motion.div style={{ opacity: fade }} className="relative mx-auto flex h-full max-w-7xl items-end px-4 pb-10 sm:px-8 md:items-center md:pb-0">
        <Reveal className="max-w-xl text-white">
          <p className="rise label text-white/75">
            {P.role}
            {R.city ? ` · ${R.city}` : ""}
          </p>
          <h1 className="rise font-display h-hero mt-3" style={v({ "--i": 1 })}>
            Forough
            <span className="mt-1 block text-[0.42em] font-medium tracking-[-0.02em] text-white/85">Mahmoudpour</span>
          </h1>
          <p className="rise mt-4 max-w-md text-[1.15rem] leading-snug text-white/90 sm:text-[1.3rem]" style={v({ "--i": 2 })}>
            {P.headline}
          </p>
          <div className="rise mt-7 flex flex-wrap gap-3" style={v({ "--i": 3 })}>
            <a href="#contact" className="btn btn-primary">Get in touch</a>
            <ResumeButton className="btn btn-ghost-light" />
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
}

/* ---------- About + welcome ---------- */
function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-28">
      <Reveal className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div>
          <Aisle n="01" label="About" />
          <h2 id="about-title" className="rise font-display h-section mt-5" style={v({ "--i": 1 })}>
            Hello, and welcome.
          </h2>
          <p className="rise mt-6 max-w-2xl text-[1.2rem] leading-relaxed text-ink-soft sm:text-[1.3rem]" style={v({ "--i": 2 })}>
            {P.welcome}
          </p>
          <p className="rise label mt-6 text-ink-soft" style={v({ "--i": 3 })}>{P.roles}</p>
        </div>
        <dl className="grid grid-cols-2 gap-3 self-end">
          {P.glance.map((g, i) => (
            <div key={g.label} className="rise card p-5" style={v({ "--i": i + 2 })}>
              <dt className="sr-only">{g.label}</dt>
              <dd>
                <span className="block font-display text-[1.9rem] leading-none">{g.value}</span>
                <span className="mt-2 block text-[0.92rem] text-ink-soft">{g.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

/* ---------- Experience (from the résumé) ---------- */
function Experience() {
  return (
    <section id="experience" aria-labelledby="exp-title" className="border-y border-line bg-panel">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-28">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Aisle n="02" label="Experience" />
            <h2 id="exp-title" className="rise font-display h-section mt-5 max-w-2xl" style={v({ "--i": 1 })}>
              Sales floor, checkout and stockroom.
            </h2>
          </div>
          <ResumeButton className="rise btn btn-outline self-start md:self-auto" />
        </Reveal>
        <ol className="mt-12 grid gap-4 lg:grid-cols-3">
          {P.experience.map((e, i) => (
            <Reveal as="li" key={e.company}>
              <article className="rise flex h-full flex-col rounded-[18px] border border-line bg-paper p-6 sm:p-7" style={v({ "--i": i })}>
                <div className="flex items-center justify-between gap-3">
                  <span className="label text-ink-soft">{e.dates}</span>
                  <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
                </div>
                <h3 className="font-display h-card mt-6">{e.title}</h3>
                <p className="mt-1 font-medium">
                  {e.company} <span className="font-normal text-ink-soft">&middot; {e.place}</span>
                </p>
                <ul className="mt-5 space-y-2.5 border-t border-line pt-5 text-[0.98rem]">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-ink" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Education ---------- */
function Education() {
  const E = P.education;
  return (
    <section id="education" aria-labelledby="edu-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-28">
      <Reveal className="overflow-hidden rounded-[24px] bg-sage">
        <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:p-14">
          <div>
            <Aisle n="03" label="Education" />
            <h2 id="edu-title" className="rise font-display h-section mt-5" style={v({ "--i": 1 })}>
              {E.degree}
            </h2>
            <p className="rise mt-3 font-medium" style={v({ "--i": 2 })}>
              {E.school} <span className="font-normal text-ink-soft">&middot; {E.place}</span>
            </p>
            <p className="rise mt-6 text-[1.1rem] leading-relaxed" style={v({ "--i": 2 })}>
              {E.focus}
            </p>
          </div>
          <div>
            <p className="rise label">What it means on the shop floor</p>
            <ul className="mt-4 space-y-3">
              {E.onTheFloor.map((o, i) => (
                <li key={o.title} className="rise rounded-[16px] bg-white/70 p-5" style={v({ "--i": i + 1 })}>
                  <h3 className="font-display text-[1.25rem]">{o.title}</h3>
                  <p className="mt-1 text-ink-soft">{o.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- Skills (price tags) + languages ---------- */
function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="mx-auto max-w-7xl px-4 pb-20 sm:px-8 sm:pb-28">
      <Reveal>
        <Aisle n="04" label="Skills" />
        <h2 id="skills-title" className="rise font-display h-section mt-5" style={v({ "--i": 1 })}>
          What I bring to the floor.
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
        {P.skillGroups.map((g, gi) => (
          <Reveal key={g.name}>
            <h3 className="rise font-display text-[1.35rem]" style={v({ "--i": gi % 2 })}>{g.name}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s, i) => (
                <li key={s} className="rise tag" style={v({ "--i": i })}>
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-12 rounded-[18px] border border-line bg-panel p-6 sm:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="rise font-display text-[1.35rem]">Languages</h3>
            <p className="rise mt-1 text-ink-soft">A real asset in Metro Vancouver&rsquo;s diverse communities.</p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {P.languages.map((l, i) => (
              <li key={l} className="rise rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper" style={v({ "--i": i })}>
                {l}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- Next role + receipt summary ---------- */
function LookingFor() {
  const L = P.lookingFor;
  return (
    <section aria-labelledby="looking-title" className="bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <Aisle n="05" label="Next role" light />
          <h2 id="looking-title" className="rise font-display h-section mt-5" style={v({ "--i": 1 })}>
            {L.title}
          </h2>
          <p className="rise mt-6 max-w-xl text-[1.15rem] text-paper/75" style={v({ "--i": 2 })}>
            {L.body}
          </p>
          <ul className="rise mt-7 flex flex-wrap gap-2" style={v({ "--i": 3 })}>
            {L.roles.map((r) => (
              <li key={r} className="rounded-full border border-white/25 px-4 py-2 text-sm font-medium">
                {r}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal>
          <div
            className="rise mx-auto max-w-sm bg-[#fbf9f5] px-6 pb-10 pt-8 font-mono text-[0.86rem] text-ink"
            style={v({
              rotate: "-1.2deg",
              maskImage: "conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / 16px 100%",
              WebkitMaskImage: "conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / 16px 100%",
            })}
          >
            <p className="text-center font-sans text-base font-bold uppercase tracking-[0.18em]">Forough Mahmoudpour</p>
            <p className="mt-1 text-center text-xs text-ink-soft">Summary for hiring managers</p>
            <p aria-hidden className="my-4 overflow-hidden whitespace-nowrap text-ink-soft">- - - - - - - - - - - - - - - - - - - - - - - -</p>
            <ul className="space-y-2.5">
              {P.receipt.map((r) => (
                <li key={r} className="flex gap-3">
                  <span aria-hidden>&#10003;</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            <p aria-hidden className="my-4 overflow-hidden whitespace-nowrap text-ink-soft">- - - - - - - - - - - - - - - - - - - - - - - -</p>
            {R.resumePath ? (
              <a href={asset(R.resumePath)} download className="block text-center font-semibold underline underline-offset-4">
                Download full résumé (PDF)
              </a>
            ) : (
              <p className="text-center">Thank you for stopping by!</p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Nail art door ---------- */
function NailTeaser({ peeks }: { peeks: GalleryArtwork[] }) {
  return (
    <section aria-labelledby="nails-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-28">
      <Reveal className="grid items-center gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <Aisle n="06" label="Off the clock" />
          <h2 id="nails-title" className="rise font-display h-section mt-5" style={v({ "--i": 1 })}>
            I&rsquo;m also a nail artist.
          </h2>
          <p className="rise mt-5 max-w-md text-[1.1rem] text-ink-soft" style={v({ "--i": 2 })}>
            The same eye for detail, on a much smaller canvas. Browse 60 original designs.
          </p>
          <Link href="/nails/" className="rise btn btn-dark mt-7" style={v({ "--i": 3 })}>
            See my nail art <span aria-hidden>&rarr;</span>
          </Link>
        </div>
        <Link href="/nails/" aria-label="See my nail art" className="grid grid-cols-4 gap-2 sm:gap-3">
          {peeks.map((a, i) => (
            <span key={a.id} className={`rise block self-start overflow-hidden rounded-[14px] ${i % 2 ? "mt-8" : ""}`} style={v({ "--i": i + 1 })}>
              <ArtImage art={a} sizes="(min-width: 1024px) 14vw, 24vw" decorative className="aspect-[3/4] object-cover transition-transform duration-700 hover:scale-105" />
            </span>
          ))}
        </Link>
      </Reveal>
    </section>
  );
}

/* ---------- Contact: form that emails Forough ---------- */
function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="px-4 pb-20 sm:px-8 sm:pb-28">
      <Reveal className="mx-auto grid max-w-7xl gap-10 rounded-[24px] bg-accent px-6 py-12 text-white sm:px-12 sm:py-16 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <Aisle n="07" label="Contact" light />
          <h2 id="contact-title" className="rise font-display h-section mt-5" style={v({ "--i": 1 })}>
            Hiring for your store? Let&rsquo;s talk.
          </h2>
          <p className="rise mt-5 max-w-md text-[1.1rem] text-white/85" style={v({ "--i": 2 })}>
            Send a message here and it goes straight to my inbox. Or reach me directly:
          </p>
          <ul className="rise mt-6 space-y-3 text-[1.05rem]" style={v({ "--i": 3 })}>
            {R.email && (
              <li>
                <span className="label block text-white/65">Email</span>
                <a href={`mailto:${R.email}`} className="font-semibold underline-offset-4 hover:underline">{R.email}</a>
              </li>
            )}
            {R.phone && (
              <li>
                <span className="label block text-white/65">Phone</span>
                <a href={`tel:${R.phone.replace(/[^\d+]/g, "")}`} className="font-semibold underline-offset-4 hover:underline">{R.phone}</a>
              </li>
            )}
            {R.city && (
              <li>
                <span className="label block text-white/65">Location</span>
                <span className="font-semibold">{R.city}, Canada</span>
              </li>
            )}
          </ul>
          <ResumeButton className="rise btn btn-light mt-7" />
        </div>
        <div className="rise" style={v({ "--i": 2 })}>
          <ContactForm dark subject="New message from your website (sales profile)" />
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Forough Mahmoudpour &middot; Retail Sales Associate &middot; Surrey, BC</p>
        <p className="flex gap-5">
          <Link href="/" className="hover:text-ink">Sales profile</Link>
          <Link href="/nails/" className="hover:text-ink">Nail art</Link>
          {R.resumePath && <a href={asset(R.resumePath)} download className="hover:text-ink">Résumé (PDF)</a>}
        </p>
      </div>
    </footer>
  );
}
