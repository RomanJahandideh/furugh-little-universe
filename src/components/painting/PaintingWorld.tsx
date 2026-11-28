"use client";

import { useState, type CSSProperties } from "react";
import { ContactSection, Footer } from "@/components/common/Chrome";
import { ArtImage } from "@/components/gallery/ArtImage";
import { LiftText, PullUp } from "@/components/mechanics/PullUp";
import { VerbCycle } from "@/components/stage/Cursor";
import { Stage, type StageName } from "@/components/stage/Stage";
import { paintingGroups } from "@/data/paintings";
import { siteConfig } from "@/data/site-config";
import { asset } from "@/lib/paths";
import { paintingVideos } from "@/data/videos";
import type { PaintingPhoto } from "@/lib/paintings";
import { LoopVideo } from "./LoopVideo";
import { PaintingLightbox } from "./PaintingLightbox";
import { ProcessVideos } from "./ProcessVideos";

const v = (o: Record<string, string | number>) => o as CSSProperties;
const CHAPTER_TONES: StageName[] = ["teal", "plum", "slate", "olive"];

export function PaintingWorld({ paintings }: { paintings: PaintingPhoto[] }) {
  const [asked, setAsked] = useState<PaintingPhoto | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  const studio = paintings.filter((p) => p.group === "studio");
  const lead = studio[0];
  const spaces = paintingVideos.filter((x) => x.kind === "space");
  const chapters = paintingGroups.filter((g) => g.id !== "studio" && paintings.some((p) => p.group === g.id));
  const openPhoto = (p: PaintingPhoto) => setOpen(paintings.indexOf(p));
  const ask = (p: PaintingPhoto) => {
    setAsked(p);
    setOpen(null);
    window.setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  return (
    <main id="main" className="overflow-x-clip">
      {/* ---------- Opening: giant title, Forough at work ---------- */}
      <Stage tone="oxblood" aria-labelledby="painting-title" className="relative overflow-hidden">
        <span aria-hidden className="font-black pointer-events-none absolute -right-[4vw] top-[34svh] select-none text-[42vw] text-gold/90 md:top-[8svh] md:text-[26vw]">
          01
        </span>
        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-[calc(var(--nav-h)+env(safe-area-inset-top)+2.5rem)] sm:px-8 sm:pb-28 md:pt-[calc(var(--nav-h)+4rem)]">
          <p className="hero-in label text-gold">Path one</p>
          <h1 id="painting-title" className="hero-in font-black mt-3 max-w-4xl text-[clamp(3.2rem,12vw,8.5rem)] uppercase text-gold" style={v({ "--d": "0.15s" })}>
            Decorative Painting
          </h1>
          <p className="hero-in font-black mt-6 flex items-end gap-3 text-[2rem] uppercase text-gold md:text-[2.8rem]" style={v({ "--d": "0.35s" })}>
            <span aria-hidden className="pb-1 text-xl">&darr;</span>
            <VerbCycle words={["Scroll", "Lift", "Hoist", "Raise", "Climb"]} />
          </p>
          {siteConfig.resumes.painting && (
            <a href={asset(siteConfig.resumes.painting)} download className="btn mt-8 bg-gold text-char hover:brightness-105">Download my painting CV (PDF)</a>
          )}

          {lead && (
            <div className="mt-14 grid items-end gap-10 md:mt-20 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
              <button type="button" onClick={() => openPhoto(lead)} data-cursor="Open the piece" className="group block w-full text-left" aria-label={`Open photo: ${lead.title}`}>
                <PullUp steps={7} className="bg-black/20">
                  <ArtImage art={lead} sizes="(min-width: 768px) 50vw, 92vw" priority decorative className="aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-[1.03] md:aspect-[5/4]" />
                </PullUp>
              </button>
              <div>
                <p className="label text-gold">At work</p>
                <h2 className="font-display mt-3 text-[clamp(2rem,4vw,3rem)] leading-[1.05]">The hands behind the ornament</h2>
                <p className="mt-5 max-w-lg text-[1.08rem] leading-relaxed text-paper/80">
                  Gold leaf, hand-painted birds and blossoms, murals and carved ornament, finished by hand on walls, ceilings and domes. From the scaffold to the step stool, here is Forough at work.
                </p>
                <ul className="mt-8 grid grid-cols-4 gap-2 sm:gap-3">
                  {studio.slice(1).map((p) => (
                    <li key={p.id}>
                      <button type="button" onClick={() => openPhoto(p)} data-cursor="Open" className="group block w-full" aria-label={`Open photo: ${p.title}`}>
                        <PullUp steps={4} className="bg-black/20">
                          <ArtImage art={p} sizes="(min-width: 768px) 140px, 22vw" decorative className="aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-110" />
                        </PullUp>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </Stage>

      <ProcessVideos />

      {/* ---------- Chapters: pinned sideways title + counter, photos winched up beside it ---------- */}
      {chapters.map((g, gi) => {
        const items = paintings.filter((p) => p.group === g.id);
        return (
          <Stage key={g.id} tone={CHAPTER_TONES[gi % CHAPTER_TONES.length]} aria-labelledby={`g-${g.id}`}>
            <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-8 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-14 md:py-28">
              <div className="md:sticky md:top-[calc(var(--nav-h)+1.5rem)] md:flex md:h-[calc(100svh-var(--nav-h)-3rem)] md:flex-col md:justify-between">
                <h2 id={`g-${g.id}`} className="font-black text-[clamp(2.8rem,11vw,4rem)] text-gold md:vertical md:text-[clamp(4rem,11vh,7.5rem)]">
                  <LiftText>{g.title}</LiftText>
                </h2>
                <div className="mt-4 md:mt-0">
                  <p className="max-w-[15rem] text-paper/75">{g.intro}</p>
                  <p className="label mt-4 text-gold">
                    {String(gi + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
                  </p>
                </div>
              </div>
              <ul className="grid gap-x-5 gap-y-12 sm:grid-cols-2">
                {items.map((p, i) => (
                  <li key={p.id} className={i % 3 === 0 ? "sm:col-span-2" : ""}>
                    <button type="button" onClick={() => openPhoto(p)} data-cursor="Open the piece" className="group block w-full text-left" aria-label={`Open photo: ${p.title}`}>
                      <PullUp className="bg-black/20">
                        <ArtImage
                          art={p}
                          sizes={i % 3 === 0 ? "(min-width: 768px) 60vw, 92vw" : "(min-width: 768px) 30vw, 92vw"}
                          decorative
                          className={`object-cover transition-transform duration-700 group-hover:scale-[1.03] ${i % 3 === 0 ? "aspect-[16/10]" : "aspect-[4/5]"}`}
                        />
                      </PullUp>
                      <span className="mt-3 flex items-baseline justify-between gap-3">
                        <span className="font-display text-xl leading-tight sm:text-2xl">{p.title}</span>
                        <span className="label shrink-0 text-gold">{String(i + 1).padStart(2, "0")}</span>
                      </span>
                      {p.caption && <span className="mt-1 block text-sm text-paper/65">{p.caption}</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Stage>
        );
      })}

      {/* ---------- Finished spaces videos ---------- */}
      <Stage tone="char" aria-labelledby="spaces-title">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <p className="label text-gold">Finished spaces</p>
          <h2 id="spaces-title" className="font-black mt-3 text-[clamp(2.6rem,7vw,5rem)] text-gold">
            <LiftText>Step inside</LiftText>
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {spaces.map((x, i) => (
              <figure key={x.id} className={i === 0 ? "lg:col-span-2" : ""}>
                <PullUp steps={5}>
                  <LoopVideo video={x} className="aspect-video" />
                </PullUp>
                <figcaption className="mt-3">
                  <span className="font-display text-xl">{x.title}</span>
                  <span className="ml-2 text-paper/65">{x.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Stage>

      <ContactSection
        title="Planning a painted wall or ceiling?"
        intro="Tell Forough about the space, the size and the feeling you’re after. Your message goes straight to her inbox."
        subject={asked ? `Decorative painting inquiry: ${asked.title}` : "Decorative painting inquiry"}
        initialMessage={asked ? `Hi Forough, I'd love something like "${asked.title}".` : ""}
      />
      <Footer />

      <PaintingLightbox list={paintings} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} onAsk={ask} />
    </main>
  );
}
