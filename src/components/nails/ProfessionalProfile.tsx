"use client";

import Link from "next/link";
import { Footer } from "@/components/common/Chrome";
import { ArtImage } from "@/components/gallery/ArtImage";
import { PullUp } from "@/components/mechanics/PullUp";
import { competencies, nailBrand } from "@/data/nails";
import { siteConfig } from "@/data/site-config";
import type { GalleryArtwork } from "@/lib/artworks";
import { asset } from "@/lib/paths";
import { CertificateDocument, hasCertificate } from "./Certificate";
import { NailEnquiryForm } from "./NailEnquiryForm";
import { NailSection, ReadingProgress, SectionHead } from "./parts";

const HIGHLIGHTS = ["img-7903", "img-2577", "img-0938", "img-5950", "img-9522", "img-2608"];

/** /nails/professional-profile/: a digital résumé for salon owners and recruiters. */
export function ProfessionalProfile({ artworks }: { artworks: GalleryArtwork[] }) {
  const picks = HIGHLIGHTS.map((id) => artworks.find((a) => a.id === id)).filter((a): a is GalleryArtwork => !!a);
  const { email, phone, city } = siteConfig.contact;

  return (
    <main id="main" className="overflow-x-clip">
      <ReadingProgress />
      <NailSection tone="ivory" label="Professional profile">
        <div className="mx-auto max-w-7xl px-5 pb-20 pt-[calc(var(--nav-h)+env(safe-area-inset-top)+2.5rem)] sm:px-8 lg:pt-[calc(var(--nav-h)+4rem)]">
          <Link href="/nails/" className="label inline-flex min-h-11 items-center gap-2 text-burgundy hover:underline">
            <span aria-hidden>&larr;</span> Nail Artistry
          </Link>
          <div className="mt-6 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="hero-in label text-burgundy">Forough Mahmoudpour &middot; Professional profile</p>
              <h1 className="hero-in font-editorial mt-5 text-[clamp(3rem,7.5vw,6.2rem)]">
                Professional Nail Technician <em className="text-burgundy">&amp; Nail Artist</em>
              </h1>
              <div className="hero-in mt-8 max-w-2xl space-y-4 text-[1.06rem] leading-relaxed text-espresso/85" style={{ "--d": "0.3s" } as React.CSSProperties}>
                <p>
                  Professionally trained Nail Technician and Nail Artist with {nailBrand.yearsExperience} years of practical experience in nail care, sculpted gel nail extensions, Russian manicure, electric nail file techniques, gel maintenance, structural rebalancing, nail repair, and customized artistic nail designs.
                </p>
                <p>Committed to technical precision, responsible hygiene practices, attention to detail, and personalized client experiences.</p>
                <p>Based in {city ?? nailBrand.area}, and interested in professional opportunities within the {nailBrand.area} beauty industry.</p>
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#profile-contact" className="btn bg-espresso text-ivory hover:bg-burgundy">Discuss an opportunity</a>
                <Link href="/nails/#portfolio" className="btn border border-espresso hover:bg-espresso hover:text-ivory">Full portfolio</Link>
                {nailBrand.resumeFile && (
                  <a href={asset(nailBrand.resumeFile)} download className="btn border border-espresso hover:bg-espresso hover:text-ivory">Download résumé (PDF)</a>
                )}
              </div>
            </div>
            <aside className="lg:col-span-4 lg:col-start-9">
              <dl className="border-t border-espresso/20 text-[0.98rem]">
                {[
                  ["Experience", `${nailBrand.yearsExperience} years, practical`],
                  ["Training", "Vocational certificate, Nail Care and Correction Technology"],
                  ["Location", city ? `${city}, Canada` : nailBrand.area],
                  ["Email", email],
                  ["Phone", phone],
                ]
                  .filter(([, val]) => val)
                  .map(([k, val]) => (
                    <div key={k} className="border-b border-espresso/20 py-4">
                      <dt className="label text-espresso/60">{k}</dt>
                      <dd className="mt-1 font-medium">
                        {k === "Email" ? <a className="hover:underline" href={`mailto:${val}`}>{val}</a> : k === "Phone" ? <a className="hover:underline" href={`tel:${String(val).replace(/[^\d+]/g, "")}`}>{val}</a> : val}
                      </dd>
                    </div>
                  ))}
              </dl>
            </aside>
          </div>
        </div>
      </NailSection>

      <NailSection tone="nude" id="competencies">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <SectionHead id="competencies" n="01" label="Key competencies" title="What I Bring to a Salon" />
          <ul className="mt-12 grid border-t border-espresso/20 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4">
            {competencies.map((c) => (
              <li key={c} className="border-b border-espresso/20 py-4 text-[0.98rem]">{c}</li>
            ))}
          </ul>
        </div>
      </NailSection>

      <NailSection tone="ivory" id="highlights">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <SectionHead id="highlights" n="02" label="Portfolio highlights" title="Selected Work" intro="Six sets from the portfolio. Every photo is Forough's own work." />
          <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {picks.map((a) => (
              <li key={a.id}>
                <Link href="/nails/#portfolio" className="group block">
                  <PullUp steps={4} className="bg-nude">
                    <ArtImage art={a} sizes="(min-width: 1024px) 30vw, 46vw" className="aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  </PullUp>
                  <span className="mt-2 block text-[0.95rem] font-medium">{a.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </NailSection>

      {hasCertificate && (
      <NailSection tone="nude" id="certification">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead id="certification" n="03" label="Certification" title="Training & Assessment" />
            <p className="mt-6 leading-relaxed text-espresso/80">
              A vocational certificate in Nail Care and Correction Technology, combined with {nailBrand.yearsExperience} years of hands-on practice. An officially certified English translation is available on request.
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <CertificateDocument />
          </div>
        </div>
      </NailSection>
      )}

      <NailSection tone="ivory" id="profile-contact">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead id="profile-contact" n="04" label="Contact" title="Let’s Talk." intro="For salon positions, studio collaborations or the certified translation of my certificate, send a message below." />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <NailEnquiryForm preset={PROFILE_PRESET} idPrefix="pp" />
          </div>
        </div>
      </NailSection>
      <Footer />
    </main>
  );
}

const PROFILE_PRESET = { type: "Professional salon opportunity" as const };
