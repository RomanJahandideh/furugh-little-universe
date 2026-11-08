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
import { Welcome } from "./Welcome";

const v = (o: Record<string, string | number>) => o as CSSProperties;
const srcset = (p: { name: string; widths: number[] }) =>
  p.widths.map((w) => `${asset(`/images/profile/${p.name}-${w}.webp`)} ${w}w`).join(", ");

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

/* ---------- Hero: cinematic photo ---------- */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const { email, city } = siteConfig.retail;

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
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,11,9,0.88)_0%,rgba(14,11,9,0.45)_38%,rgba(14,11,9,0)_62%)] md:bg-[linear-gradient(to_right,rgba(14,11,9,0.82)_0%,rgba(14,11,9,0.5)_34%,rgba(14,11,9,0)_60%)]" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/35 to-transparent" />

      <motion.div style={{ opacity: fade }} className="relative mx-auto flex h-full max-w-7xl items-end px-4 pb-10 sm:px-8 md:items-center md:pb-0">
        <Reveal className="max-w-xl text-white">
          <p className="rise label text-white/75">
            {P.role}
            {city ? ` · ${city}` : " · Canada"}
          </p>
          <h1 className="rise font-display h-hero mt-3" style={v({ "--i": 1 })}>
            Furugh
          </h1>
          <p className="rise mt-4 max-w-md text-[1.2rem] leading-snug text-white/90 sm:text-[1.35rem]" style={v({ "--i": 2 })}>
            {P.headline}
          </p>
          <div className="rise mt-7 flex flex-wrap gap-3" style={v({ "--i": 3 })}>
            {email ? (
              <a href={`mailto:${email}`} className="btn btn-primary">Get in touch</a>
            ) : (
              <a href="#contact" className="btn btn-primary">Get in touch</a>
            )}
            <a href="#experience" className="btn btn-ghost-light">See experience</a>
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

/* ---------- Experience: one card per store "department" ---------- */
function Experience() {
  return (
    <section id="experience" aria-labelledby="exp-title" className="border-y border-line bg-panel">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-28">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Aisle n="02" label="Experience" />
            <h2 id="exp-title" className="rise font-display h-section mt-5 max-w-2xl" style={v({ "--i": 1 })}>
              Three kinds of store. One way of working.
            </h2>
          </div>
          <p className="rise max-w-sm text-ink-soft" style={v({ "--i": 2 })}>
            About three years of retail sales, from practical home projects to personal style to a busy hypermarket.
          </p>
        </Reveal>
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {P.experience.map((e, i) => (
            <Reveal as="li" key={e.dept}>
              <article className="rise flex h-full flex-col rounded-[18px] border border-line bg-paper p-6 sm:p-7" style={v({ "--i": i })}>
                <div className="flex items-center justify-between">
                  <span className="label text-ink-soft">Dept. {String(i + 1).padStart(2, "0")}</span>
                  <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-accent" />
                </div>
                <h3 className="font-display h-card mt-6">{e.dept}</h3>
                <p className="mt-1 text-[0.95rem] font-medium">{e.where}</p>
                <p className="mt-4 text-ink-soft">{e.summary}</p>
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
            {E.school && (
              <p className="rise mt-2 font-medium" style={v({ "--i": 2 })}>
                {E.school}
              </p>
            )}
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

/* ---------- Skills as price tags ---------- */
function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="mx-auto max-w-7xl px-4 pb-20 sm:px-8 sm:pb-28">
      <Reveal className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          <Aisle n="04" label="Skills" />
          <h2 id="skills-title" className="rise font-display h-section mt-5" style={v({ "--i": 1 })}>
            What I bring to the floor.
          </h2>
        </div>
        <ul className="flex flex-wrap content-start gap-2.5 lg:pt-12">
          {P.skills.map((s, i) => (
            <li key={s} className="rise tag" style={v({ "--i": i })}>
              {s}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

/* ---------- Looking for (Canada) + receipt summary ---------- */
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
            className="rise mx-auto max-w-sm bg-[#fbf9f5] px-6 pb-10 pt-8 font-mono text-[0.88rem] text-ink"
            style={v({
              rotate: "-1.2deg",
              maskImage: "conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / 16px 100%",
              WebkitMaskImage: "conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / 16px 100%",
            })}
          >
            <p className="text-center font-sans text-base font-bold uppercase tracking-[0.2em]">Furugh</p>
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
            <p className="text-center">Thank you for stopping by!</p>
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

/* ---------- Contact ---------- */
function Contact() {
  const { email, resumePath, profileUrl, phone } = siteConfig.retail;
  return (
    <section id="contact" aria-labelledby="contact-title" className="px-4 pb-20 sm:px-8 sm:pb-28">
      <Reveal className="on-color mx-auto max-w-7xl rounded-[24px] bg-accent px-6 py-14 text-white sm:px-12 sm:py-20">
        <Aisle n="07" label="Contact" light />
        <h2 id="contact-title" className="rise font-display h-section mt-5 max-w-3xl" style={v({ "--i": 1 })}>
          Hiring for your store? Let&rsquo;s talk.
        </h2>
        <p className="rise mt-5 max-w-xl text-[1.1rem] text-white/85" style={v({ "--i": 2 })}>
          I&rsquo;d love to hear about your team and the role.
        </p>
        <div className="rise mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={v({ "--i": 3 })}>
          {email ? (
            <a className="btn btn-light" href={`mailto:${email}?subject=${encodeURIComponent("Sales associate role")}`}>Email Furugh</a>
          ) : (
            <span className="btn btn-light" aria-disabled="true" title="Email not added yet">
              Email <span className="text-xs font-normal">(coming soon)</span>
            </span>
          )}
          {phone && <a className="btn btn-ghost-light" href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</a>}
          {resumePath ? (
            <a className="btn btn-ghost-light" href={asset(resumePath)} download>Download résumé</a>
          ) : (
            <span className="btn btn-ghost-light" aria-disabled="true" title="Résumé not added yet">
              Résumé <span className="text-xs font-normal">(PDF coming soon)</span>
            </span>
          )}
          {profileUrl && (
            <a className="btn btn-ghost-light" href={profileUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          )}
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Furugh &middot; Retail Sales Associate</p>
        <p className="flex gap-5">
          <Link href="/" className="hover:text-ink">Sales profile</Link>
          <Link href="/nails/" className="hover:text-ink">Nail art</Link>
        </p>
      </div>
    </footer>
  );
}
