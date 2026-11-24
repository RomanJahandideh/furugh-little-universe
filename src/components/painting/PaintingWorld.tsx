"use client";

import { useState, type CSSProperties } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { ContactSection, Footer, PageHeader } from "@/components/common/Chrome";
import { ArtImage } from "@/components/gallery/ArtImage";
import { ArchOutline, Divider } from "@/components/ornament/Ornaments";
import { paintingGroups } from "@/data/paintings";
import { paintingVideos } from "@/data/videos";
import type { PaintingPhoto } from "@/lib/paintings";
import { LoopVideo } from "./LoopVideo";
import { PaintingLightbox } from "./PaintingLightbox";

const v = (o: Record<string, string | number>) => o as CSSProperties;

export function PaintingWorld({ paintings }: { paintings: PaintingPhoto[] }) {
  const [asked, setAsked] = useState<PaintingPhoto | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  const studio = paintings.filter((p) => p.group === "studio");
  const lead = studio[0];
  const process = paintingVideos.filter((x) => x.kind === "process");
  const spaces = paintingVideos.filter((x) => x.kind === "space");
  const openPhoto = (p: PaintingPhoto) => setOpen(paintings.indexOf(p));
  const ask = (p: PaintingPhoto) => {
    setAsked(p);
    setOpen(null);
    window.setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  return (
    <main id="main" className="overflow-x-clip">
      <PageHeader
        kicker="Path one"
        title="Decorative Painting"
        intro="Gold leaf, hand-painted birds and blossoms, murals, and carved ornament finished by hand, on walls, ceilings and domes."
      />

      {/* ---------- At work ---------- */}
      {lead && (
        <section aria-labelledby="studio-title" className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
          <Reveal className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            <button type="button" onClick={() => openPhoto(lead)} className="group relative mx-auto block w-full max-w-[460px]" aria-label={`Open photo: ${lead.title}`}>
              <span className="arch block aspect-[4/5] overflow-hidden bg-sand">
                <ArtImage art={lead} sizes="(min-width: 768px) 460px, 92vw" priority decorative className="h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </span>
              <ArchOutline />
            </button>
            <div>
              <p className="rise label text-gold">At work</p>
              <h2 id="studio-title" className="rise font-display h-section mt-3" style={v({ "--i": 1 })}>
                The hands behind the ornament
              </h2>
              <Divider className="rise mt-5 w-44" />
              <p className="rise mt-6 max-w-lg text-[1.1rem] leading-relaxed text-ink-soft" style={v({ "--i": 2 })}>
                From the scaffold to the step stool, every leaf of gold, every blossom and every carved scroll is finished by hand. Here is Forough at work, followed by a selection of finished pieces.
              </p>
              <ul className="mt-8 grid grid-cols-4 gap-2 sm:gap-3">
                {studio.slice(1).map((p, i) => (
                  <li key={p.id} className="rise" style={v({ "--i": i + 3 })}>
                    <button type="button" onClick={() => openPhoto(p)} className="group block w-full overflow-hidden rounded-t-full bg-sand" aria-label={`Open photo: ${p.title}`}>
                      <ArtImage art={p} sizes="(min-width: 768px) 140px, 22vw" decorative className="aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-110" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>
      )}

      {/* ---------- Process videos ---------- */}
      <section aria-labelledby="process-title" className="lapis px-3 py-3 sm:px-6 sm:py-6">
        <Reveal className="gilded-frame mx-auto max-w-7xl px-5 py-14 sm:px-10 sm:py-20">
          <div className="text-center">
            <p className="rise label text-gold-light">Process</p>
            <h2 id="process-title" className="rise font-display h-section mt-3" style={v({ "--i": 1 })}>
              Watch the work take shape
            </h2>
            <Divider className="rise mx-auto mt-5 w-44" />
          </div>
          <ul className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0">
            {process.map((x, i) => (
              <li key={x.id} className="rise w-[72vw] shrink-0 snap-center sm:w-auto" style={v({ "--i": i + 2 })}>
                <LoopVideo video={x} className="aspect-[9/16] rounded-t-[999px] border border-[#e2c378]/60" />
                <p className="font-display mt-4 text-2xl">{x.title}</p>
                <p className="mt-1 text-[0.95rem] text-[#e9dfcb]">{x.caption}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ---------- Collections ---------- */}
      {paintingGroups
        .filter((g) => g.id !== "studio")
        .map((g, gi) => {
          const items = paintings.filter((p) => p.group === g.id);
          if (!items.length) return null;
          return (
            <section key={g.id} aria-labelledby={`g-${g.id}`} className={`py-16 sm:py-24 ${gi % 2 ? "bg-panel" : ""}`}>
              <div className="mx-auto max-w-7xl px-4 sm:px-8">
                <Reveal className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="rise label text-gold">{String(gi + 1).padStart(2, "0")}</p>
                    <h2 id={`g-${g.id}`} className="rise font-display h-section mt-2" style={v({ "--i": 1 })}>{g.title}</h2>
                  </div>
                  <p className="rise max-w-sm text-ink-soft" style={v({ "--i": 2 })}>{g.intro}</p>
                </Reveal>
                <ul className="columns-2 gap-4 sm:gap-6 lg:columns-3">
                  {items.map((p, i) => (
                    <Reveal as="li" key={p.id} className="mb-4 break-inside-avoid sm:mb-6">
                      <button type="button" onClick={() => openPhoto(p)} className="rise group block w-full text-left" style={v({ "--i": i % 3 })} aria-label={`Open photo: ${p.title}`}>
                        <span className="paper-panel block overflow-hidden p-1.5 sm:p-2">
                          <span className="block overflow-hidden">
                            <ArtImage art={p} sizes="(min-width: 1024px) 31vw, 46vw" decorative className="transition-transform duration-700 group-hover:scale-[1.04]" />
                          </span>
                        </span>
                        <span className="font-display mt-2 block text-lg leading-tight sm:text-xl">{p.title}</span>
                        {p.caption && <span className="mt-0.5 block text-sm text-ink-soft">{p.caption}</span>}
                      </button>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}

      {/* ---------- Finished spaces videos ---------- */}
      <section aria-labelledby="spaces-title" className="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-8 sm:pb-24">
        <Reveal className="text-center">
          <p className="rise label text-gold">Finished spaces</p>
          <h2 id="spaces-title" className="rise font-display h-section mt-3" style={v({ "--i": 1 })}>
            Step inside
          </h2>
          <Divider className="rise mx-auto mt-5 w-44" />
        </Reveal>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {spaces.map((x, i) => (
            <Reveal key={x.id} className={i === 0 ? "lg:col-span-2" : ""}>
              <figure className="rise">
                <div className="paper-panel p-2">
                  <LoopVideo video={x} className="aspect-video" />
                </div>
                <figcaption className="mt-3">
                  <span className="font-display text-xl">{x.title}</span>
                  <span className="ml-2 text-ink-soft">{x.caption}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

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
