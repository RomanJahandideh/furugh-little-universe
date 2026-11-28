"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ArtImage } from "@/components/gallery/ArtImage";
import { PullUp } from "@/components/mechanics/PullUp";
import { serviceGroups, services, type NailService } from "@/data/nails";
import type { GalleryArtwork } from "@/lib/artworks";
import { RebalanceFigure, ShapeRow } from "./Figures";
import { Check } from "./parts";

/**
 * Services in four groups. Each row opens in place (one at a time) with the
 * full description, skills, benefits, photos of real work and an enquiry button.
 */
export function ServiceList({ art, shapeCounts, onEnquire }: {
  art: (id: string) => GalleryArtwork | undefined;
  shapeCounts: Record<string, number>;
  onEnquire: (service: string) => void;
}) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="mt-16 space-y-20">
      {serviceGroups.map((g) => (
        <div key={g.id} className="grid gap-6 lg:grid-cols-12">
          <h3 className="label text-burgundy lg:col-span-3 lg:pt-7">{g.title}</h3>
          <ul className="border-t border-espresso/20 lg:col-span-9">
            {services.filter((s) => s.group === g.id).map((s) => {
              return <ServiceRow key={s.id} s={s} n={services.indexOf(s) + 1} open={open === s.id} onToggle={() => setOpen(open === s.id ? null : s.id)} art={art} shapeCounts={shapeCounts} onEnquire={onEnquire} />;
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ServiceRow({ s, n, open, onToggle, art, shapeCounts, onEnquire }: {
  s: NailService;
  n: number;
  open: boolean;
  onToggle: () => void;
  art: (id: string) => GalleryArtwork | undefined;
  shapeCounts: Record<string, number>;
  onEnquire: (service: string) => void;
}) {
  const photos = (s.photos ?? []).map(art).filter((a): a is GalleryArtwork => !!a);
  const thumb = photos[0];
  return (
    <li className="border-b border-espresso/20">
      <h4>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`svc-${s.id}`}
          onClick={onToggle}
          className="group grid w-full grid-cols-[2.2rem_1fr_auto] items-center gap-4 py-6 text-left sm:grid-cols-[3rem_1fr_5.5rem_auto] sm:py-7"
        >
          <span className="label text-burgundy">{String(n).padStart(2, "0")}</span>
          <span>
            <span className="font-editorial block text-[clamp(1.7rem,3.2vw,2.5rem)] transition-colors group-hover:text-burgundy">{s.name}</span>
            <span className="mt-2 block max-w-2xl text-[0.98rem] leading-relaxed text-espresso/70">{s.intro}</span>
          </span>
          <span aria-hidden className="hidden h-20 w-[5.5rem] overflow-hidden sm:block">
            {thumb && <ArtImage art={thumb} sizes="88px" decorative className="h-full object-cover transition-transform duration-700 group-hover:scale-110" />}
          </span>
          <span aria-hidden className={`grid h-11 w-11 place-items-center rounded-full border border-espresso/30 text-xl transition-transform duration-300 ${open ? "rotate-45 bg-espresso text-ivory" : ""}`}>+</span>
        </button>
      </h4>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`svc-${s.id}`}
            role="region"
            aria-label={s.name}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="overflow-hidden"
          >
            <div className="grid gap-10 pb-12 pt-2 sm:pl-[4rem] lg:grid-cols-2">
              <div>
                {s.descriptor && <p className="font-editorial text-2xl italic text-burgundy">{s.descriptor}</p>}
                {s.detail.map((p) => (
                  <p key={p.slice(0, 20)} className="mt-4 leading-relaxed text-espresso/85">{p}</p>
                ))}
                {s.note && <p className="mt-5 border-l-2 border-burgundy pl-4 text-sm leading-relaxed text-espresso/75">{s.note}</p>}
                <button type="button" onClick={() => onEnquire(s.name)} className="btn mt-7 bg-espresso text-ivory hover:bg-burgundy">
                  Enquire about this service <span aria-hidden>&rarr;</span>
                </button>
              </div>
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="label text-burgundy">Technical expertise</p>
                  <ul className="mt-3 space-y-2 text-[0.95rem]">
                    {s.skills.map((x) => <li key={x} className="flex gap-2.5"><Check className="mt-1 text-burgundy" />{x}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="label text-burgundy">Client benefits</p>
                  <ul className="mt-3 space-y-2 text-[0.95rem]">
                    {s.benefits.map((x) => <li key={x} className="flex gap-2.5"><Check className="mt-1 text-burgundy" />{x}</li>)}
                  </ul>
                  {s.extra && (
                    <>
                      <p className="label mt-7 text-burgundy">{s.extra.title}</p>
                      <p className="mt-3 text-[0.95rem] leading-relaxed">{s.extra.items.join(" · ")}</p>
                    </>
                  )}
                </div>
              </div>
              {s.figure === "shapes" && <div className="lg:col-span-2"><ShapeRow counts={shapeCounts} /></div>}
              {s.figure === "rebalance" && <div className="lg:col-span-2"><RebalanceFigure /></div>}
              {photos.length > 0 && (
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-2">
                  {photos.map((p) => (
                    <li key={p.id}>
                      <PullUp steps={4} className="bg-nude">
                        <ArtImage art={p} sizes="(min-width: 640px) 22vw, 45vw" className="aspect-[4/5] object-cover" />
                      </PullUp>
                      <p className="mt-2 text-sm text-espresso/70">{p.title}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
