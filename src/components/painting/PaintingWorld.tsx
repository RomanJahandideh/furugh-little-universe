"use client";

import { useState, type CSSProperties } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { ContactSection, Footer, PageHeader } from "@/components/common/Chrome";
import { ArtImage } from "@/components/gallery/ArtImage";
import { ArchOutline, Divider, Lotus } from "@/components/ornament/Ornaments";
import type { PaintingPhoto } from "@/lib/paintings";

const v = (o: Record<string, string | number>) => o as CSSProperties;

export function PaintingWorld({ paintings }: { paintings: PaintingPhoto[] }) {
  const [asked, setAsked] = useState<PaintingPhoto | null>(null);
  const lead = paintings.find((p) => p.withForough) ?? paintings[0];
  const rest = paintings.filter((p) => p !== lead);

  return (
    <main id="main" className="overflow-x-clip">
      <PageHeader
        kicker="Path one"
        title="Decorative Painting"
        intro="Hand-painted murals and ornament for walls and interiors."
      />

      <section aria-label="Portfolio" className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
        {lead ? (
          <>
            <Reveal className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
              <figure className="relative mx-auto w-full max-w-[520px]">
                <div className="arch aspect-[4/5] overflow-hidden bg-sand">
                  <ArtImage art={lead} sizes="(min-width: 768px) 520px, 92vw" priority className="h-full object-cover" />
                </div>
                <ArchOutline />
              </figure>
              <div>
                <p className="rise label text-gold">Featured</p>
                <h2 className="rise font-display h-section mt-3" style={v({ "--i": 1 })}>{lead.title}</h2>
                {lead.caption && <p className="rise mt-4 text-[1.1rem] text-ink-soft" style={v({ "--i": 2 })}>{lead.caption}</p>}
                <button type="button" className="rise btn btn-dark mt-7" style={v({ "--i": 3 })} onClick={() => ask(lead, setAsked)}>
                  Ask about a piece like this
                </button>
              </div>
            </Reveal>

            {rest.length > 0 && (
              <ul className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((p, i) => (
                  <Reveal as="li" key={p.id} className={p.withForough ? "sm:col-span-2 lg:col-span-2" : ""}>
                    <figure className="rise" style={v({ "--i": i % 3 })}>
                      <div className="paper-panel overflow-hidden p-2">
                        <ArtImage art={p} sizes={p.withForough ? "(min-width: 1024px) 64vw, 92vw" : "(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"} className="object-cover" />
                      </div>
                      <figcaption className="mt-3 flex items-baseline justify-between gap-3">
                        <span className="font-display text-xl">{p.title}</span>
                        <button type="button" className="text-sm font-semibold text-accent underline-offset-4 hover:underline" onClick={() => ask(p, setAsked)}>
                          Ask about this
                        </button>
                      </figcaption>
                      {p.caption && <p className="mt-1 text-ink-soft">{p.caption}</p>}
                    </figure>
                  </Reveal>
                ))}
              </ul>
            )}
          </>
        ) : (
          <Reveal className="paper-panel mx-auto max-w-2xl px-6 py-14 text-center sm:px-12">
            <Lotus className="mx-auto w-28" tone="gold" weight={1.4} />
            <h2 className="rise font-display h-card mt-6">Portfolio photos are on their way</h2>
            <Divider className="rise mx-auto mt-4 w-40" />
            <p className="rise mx-auto mt-5 max-w-md text-ink-soft" style={v({ "--i": 1 })}>
              Photos of Forough&rsquo;s decorative wall painting are being added. In the meantime, send a message to talk about your space.
            </p>
            <a href="#contact" className="rise btn btn-dark mt-7" style={v({ "--i": 2 })}>Get in touch</a>
          </Reveal>
        )}
      </section>

      <ContactSection
        title="Planning a painted wall?"
        intro="Tell Forough about the space, the size and the feeling you’re after. Your message goes straight to her inbox."
        subject={asked ? `Decorative painting inquiry: ${asked.title}` : "Decorative painting inquiry"}
        initialMessage={asked ? `Hi Forough, I'd love something like "${asked.title}".` : ""}
      />
      <Footer />
    </main>
  );
}

function ask(p: PaintingPhoto, set: (p: PaintingPhoto) => void) {
  set(p);
  requestAnimationFrame(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" }));
}
