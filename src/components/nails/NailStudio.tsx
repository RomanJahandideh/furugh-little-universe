"use client";

import Link from "next/link";
import { useCallback, useMemo, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Footer } from "@/components/common/Chrome";
import { ArtImage } from "@/components/gallery/ArtImage";
import { LiftText, PullUp } from "@/components/mechanics/PullUp";
import { clientStages, craftStages, experienceAreas, faqs, hygiene, nailBrand, type EnquiryType } from "@/data/nails";
import { portrait } from "@/data/portrait";
import { siteConfig } from "@/data/site-config";
import type { GalleryArtwork } from "@/lib/artworks";
import { asset } from "@/lib/paths";
import { CertificateCard } from "./Certificate";
import { NailEnquiryForm, type EnquiryPreset } from "./NailEnquiryForm";
import { NailGallery } from "./NailGallery";
import { NailSection, ReadingProgress, SectionHead } from "./parts";
import { ServiceList } from "./ServiceList";

const v = (o: Record<string, string | number>) => o as CSSProperties;

const INDEX = [
  ["qualifications", "Certificate"],
  ["about", "About"],
  ["services", "Services"],
  ["craft", "The craft"],
  ["portfolio", "Portfolio"],
  ["care", "Hygiene"],
  ["experience", "Experience"],
  ["inquire", "Enquire"],
] as const;

export function NailStudio({ artworks }: { artworks: GalleryArtwork[] }) {
  const byId = useMemo(() => new Map(artworks.map((a) => [a.id, a])), [artworks]);
  const art = useCallback((id: string) => byId.get(id), [byId]);
  const shapeCounts = useMemo(() => {
    const out: Record<string, number> = {};
    for (const a of artworks) if (a.shape) out[a.shape] = (out[a.shape] ?? 0) + 1;
    return out;
  }, [artworks]);

  const [preset, setPreset] = useState<EnquiryPreset>({ type: "Appointment enquiry" });
  const enquire = (p: EnquiryPreset) => {
    setPreset(p);
    window.setTimeout(() => document.getElementById("inquire")?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  };
  const ask = (type: EnquiryType) => () => enquire({ type });

  return (
    <main id="main" className="overflow-x-clip">
      <ReadingProgress />
      <Hero art={art} count={artworks.length} />

      {/* ---------- 02 Qualifications ---------- */}
      <NailSection tone="espresso" id="qualifications">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-12 lg:gap-x-14 lg:gap-y-8">
          <SectionHead id="qualifications" n="02" label="Certification" title="Professional Training. Genuine Expertise." light className="lg:col-span-5 lg:row-start-1 lg:self-end" />
          <div className="order-3 lg:order-none lg:col-span-5 lg:row-start-2">
            <div className="space-y-4 text-[1.04rem] leading-relaxed text-ivory/80">
              <p>My professional vocational certification in Nail Care and Correction Technology reflects my commitment to developing practical nail care skills through structured training and formal competency assessment.</p>
              <p>Combined with {nailBrand.yearsExperience} years of hands-on experience, this qualification forms part of my foundation in nail preparation, cosmetic nail enhancements, nail maintenance, and artistic nail design.</p>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:self-center">
            <PullUp steps={6}>
              <CertificateCard onRequest={ask("Professional credentials request")} />
            </PullUp>
          </div>
        </div>
      </NailSection>

      {/* ---------- 03 About ---------- */}
      <NailSection tone="nude" id="about">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <PullUp steps={7} className="bg-ivory">
              <img
                src={asset(`/images/profile/${portrait.about.name}-880.webp`)}
                srcSet={portrait.about.widths.map((w) => `${asset(`/images/profile/${portrait.about.name}-${w}.webp`)} ${w}w`).join(", ")}
                sizes="(min-width: 1024px) 38vw, 92vw"
                width={portrait.about.width}
                height={portrait.about.height}
                alt="Forough Mahmoudpour, nail artist, smiling at the camera."
                loading="lazy"
                className="block aspect-[4/5] h-auto w-full object-cover"
                style={{ backgroundImage: `url(${portrait.about.blur})`, backgroundSize: "cover" }}
              />
            </PullUp>
            <ul className="mt-3 grid grid-cols-3 gap-3">
              {["img-2577", "img-0938", "img-7117"].map((id) => {
                const a = art(id);
                return a ? (
                  <li key={id}>
                    <PullUp steps={4} className="bg-ivory">
                      <ArtImage art={a} sizes="13vw" className="aspect-square object-cover" />
                    </PullUp>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
            <SectionHead id="about" n="03" label="About the artist" title="The Artist Behind the Details" />
            <div className="mt-8 space-y-5 text-[1.06rem] leading-relaxed text-espresso/85">
              <p>
                My name is Forough Mahmoudpour, and I am a professionally trained Nail Technician and Nail Artist with {nailBrand.yearsExperience} years of practical experience in nail care, gel enhancements, precision manicures, and creative nail design.
              </p>
              <p>My passion for nail artistry comes from the relationship between beauty, craftsmanship, and individual expression. I see every set of nails as an opportunity to combine technical skill with artistic creativity.</p>
              <p>My expertise includes sculpted nail extensions using professional nail forms, gel application, Russian manicure techniques, detailed hand painted nail art, gel maintenance, structural rebalancing, nail repair, and customized French and ombré designs.</p>
              <p>I believe professional nail artistry begins with careful preparation and a responsible approach to nail care. From the first consultation to the final details, I focus on precision, cleanliness, comfort, and designs that reflect each client&rsquo;s personal style.</p>
              <p>Currently based in {siteConfig.contact.city ?? nailBrand.area}, I am continuing to develop my professional career within the {nailBrand.area} beauty industry.</p>
            </div>
            <blockquote className="mt-12 border-l border-burgundy pl-6">
              <p className="font-editorial text-[clamp(1.7rem,3vw,2.4rem)] italic leading-tight text-burgundy">
                &ldquo;Beautiful nails should reflect the person wearing them, not simply follow a trend.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </NailSection>

      {/* ---------- 04 Services ---------- */}
      <NailSection tone="ivory" id="services">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="grid gap-8 lg:grid-cols-12">
            <SectionHead id="services" n="04" label="Services" title="Professional Nail Services" className="lg:col-span-7" />
            <p className="self-end text-[1.06rem] leading-relaxed text-espresso/75 lg:col-span-4 lg:col-start-9">
              Eleven services in four groups. Open any one for the full description, the techniques involved, and photos of real work where they exist.
            </p>
          </div>
          <ServiceList art={art} shapeCounts={shapeCounts} onEnquire={(service) => enquire({ type: "Appointment enquiry", service })} />
        </div>
      </NailSection>

      <Craft art={art} />

      {/* ---------- 06 Portfolio ---------- */}
      <NailSection tone="ivory" id="portfolio">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <SectionHead
            id="portfolio"
            n="06"
            label="Portfolio"
            title={<>A Collection of <em className="text-burgundy">Small Masterpieces</em></>}
            intro="A curated collection of nail enhancements, artistic compositions, delicate details and personalized designs. Every photo here is Forough's own work. Open any set for its details."
          />
          <NailGallery artworks={artworks} onEnquire={(a) => enquire({ type: "Appointment enquiry", design: `"${a.title}" (No. ${String(a.number).padStart(2, "0")})` })} />
        </div>
      </NailSection>

      {/* ---------- 07 Hygiene ---------- */}
      <NailSection tone="burgundy" id="care">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="grid gap-10 lg:grid-cols-12">
            <SectionHead id="care" n="07" label="Hygiene & standards" title="Beauty Begins with Care." light className="lg:col-span-6" />
            <div className="space-y-4 text-[1.04rem] leading-relaxed text-ivory/80 lg:col-span-5 lg:col-start-8 lg:pt-14">
              <p>Cleanliness, hygiene, and responsible nail care are essential parts of professional nail artistry.</p>
              <p>My approach prioritizes a clean working environment, carefully prepared tools, thoughtful product application, and respect for the condition of each client&rsquo;s natural nails. A beautiful result also means a comfortable, responsible experience.</p>
            </div>
          </div>
          <ol className="mt-16 grid gap-px bg-ivory/15 sm:grid-cols-2 lg:grid-cols-4">
            {hygiene.map((h, i) => (
              <li key={h.title} className="bg-burgundy p-6 sm:p-7">
                <PullUp steps={3}>
                  <span className="label text-champagne">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-editorial mt-4 block text-[1.7rem] leading-tight">{h.title}</span>
                  <span className="mt-3 block text-[0.95rem] leading-relaxed text-ivory/75">{h.text}</span>
                </PullUp>
              </li>
            ))}
          </ol>
          <p className="font-editorial mt-16 max-w-4xl text-[clamp(1.8rem,3.6vw,3rem)] italic leading-tight text-champagne">
            Precision in technique. Responsibility in care. Attention to every detail.
          </p>
        </div>
      </NailSection>

      {/* ---------- 08 Experience ---------- */}
      <NailSection tone="nude" id="experience">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHead id="experience" n="08" label="Experience" title="Three Years of Developing My Craft" />
              <p aria-hidden className="mt-8 flex items-end gap-4">
                <span className="font-editorial text-[clamp(8rem,18vw,14rem)] leading-[0.8] text-burgundy">{nailBrand.yearsExperience}</span>
                <span className="font-editorial pb-3 text-[1.8rem] italic leading-tight text-espresso">years of<br />practice</span>
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 lg:pt-14">
              <div className="space-y-4 text-[1.04rem] leading-relaxed text-espresso/85">
                <p>Over the past three years, I have developed practical experience in professional nail care, sculpted gel extensions, precision manicure techniques, personalized nail art, enhancement maintenance, and cosmetic nail repair.</p>
                <p>That experience has strengthened my understanding of nail preparation, product application, structural balance, visual consistency, and individual client preferences. I continue to refine my technique while exploring contemporary nail design and new opportunities in the beauty industry.</p>
              </div>
              <p className="label mt-10 text-burgundy">Areas of experience</p>
              <ul className="mt-4 grid border-t border-espresso/20 sm:grid-cols-2 sm:gap-x-8">
                {experienceAreas.map((x) => (
                  <li key={x} className="border-b border-espresso/20 py-3 text-[0.98rem]">{x}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-20 bg-espresso px-6 py-12 text-ivory sm:px-12 sm:py-16">
            <p className="label text-champagne">For salons and studios</p>
            <h3 className="font-editorial mt-4 text-[clamp(2.2rem,5vw,4rem)]">
              <LiftText>Let&rsquo;s Create Something Beautiful Together.</LiftText>
            </h3>
            <p className="mt-5 max-w-2xl leading-relaxed text-ivory/80">
              I am interested in connecting with professional nail salons, beauty studios, and creative teams throughout {nailBrand.area}. I bring practical nail artistry experience, professional vocational training, attention to detail, and a genuine passion for carefully crafted results.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#portfolio" className="btn bg-ivory text-espresso hover:bg-champagne">View my portfolio</a>
              {nailBrand.resumeFile ? (
                <a href={asset(nailBrand.resumeFile)} download className="btn border border-ivory/60 hover:bg-ivory hover:text-espresso">Download my résumé</a>
              ) : (
                <button type="button" onClick={ask("Résumé request")} className="btn border border-ivory/60 hover:bg-ivory hover:text-espresso">Request my résumé</button>
              )}
              <button type="button" onClick={ask("Professional salon opportunity")} className="btn border border-ivory/60 hover:bg-ivory hover:text-espresso">Discuss professional opportunities</button>
            </div>
            <Link href="/nails/professional-profile/" className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-champagne underline-offset-4 hover:underline">
              Open my one-page professional profile <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </div>
      </NailSection>

      {/* ---------- 09 Client experience ---------- */}
      <NailSection tone="espresso" id="experience-journey" label="The client experience">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <SectionHead n="09" label="The client experience" title="From Inspiration to the Final Detail" light />
          <ol className="relative mt-16 grid gap-10 lg:grid-cols-5 lg:gap-6">
            <span aria-hidden className="absolute bottom-0 left-[0.45rem] top-0 w-px bg-champagne/30 lg:left-0 lg:right-0 lg:top-[0.45rem] lg:h-px lg:w-auto" />
            {clientStages.map((s) => {
              const a = s.photo ? art(s.photo) : undefined;
              return (
                <li key={s.n} className="relative pl-10 lg:pl-0 lg:pt-10">
                  <span aria-hidden className="absolute left-0 top-1 h-[0.95rem] w-[0.95rem] rounded-full border border-champagne bg-espresso lg:top-0" />
                  <PullUp steps={3}>
                    <span className="label text-champagne">Stage {s.n}</span>
                    <span className="font-editorial mt-3 block text-[1.9rem] leading-tight">{s.title}</span>
                    <span className="mt-3 block text-[0.95rem] leading-relaxed text-ivory/75">{s.text}</span>
                  </PullUp>
                  {a && (
                    <PullUp steps={4} className="mt-5 bg-black/20">
                      <ArtImage art={a} sizes="(min-width: 1024px) 18vw, 80vw" className="aspect-[4/3] object-cover" />
                    </PullUp>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </NailSection>

      {/* ---------- 10 + 12 Enquiry & contact ---------- */}
      <NailSection tone="ivory" id="inquire">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead id="inquire" n="10" label="Enquiries" title="Your Next Nail Design Starts Here." />
            <p className="mt-6 text-[1.04rem] leading-relaxed text-espresso/80">
              Whether you are looking for an elegant manicure, customized gel extensions, or a personalized artistic design, share your inspiration and preferred service to begin the conversation. Salon owners and recruiters are welcome to write here too.
            </p>
            <div className="mt-12 border-t border-espresso/20 pt-8">
              <h3 className="font-editorial text-[2.2rem]">Let&rsquo;s Connect.</h3>
              <p className="mt-3 text-espresso/75">For nail design enquiries, collaborations, salon opportunities, or more about my qualifications, please get in touch.</p>
              <dl className="mt-6 space-y-4 text-[0.98rem]">
                {siteConfig.contact.email && (
                  <div><dt className="label text-espresso/60">Email</dt><dd><a className="hover:underline" href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a></dd></div>
                )}
                {siteConfig.contact.phone && (
                  <div><dt className="label text-espresso/60">Phone</dt><dd><a className="hover:underline" href={`tel:${siteConfig.contact.phone.replace(/[^\d+]/g, "")}`}>{siteConfig.contact.phone}</a></dd></div>
                )}
                {siteConfig.contact.city && (
                  <div><dt className="label text-espresso/60">Location</dt><dd>{siteConfig.contact.city}, Canada &middot; {nailBrand.area}</dd></div>
                )}
                {siteConfig.nails.instagramUrl && (
                  <div><dt className="label text-espresso/60">Instagram</dt><dd><a className="hover:underline" href={siteConfig.nails.instagramUrl} target="_blank" rel="noopener noreferrer">{siteConfig.nails.instagramHandle ?? "Instagram"}</a></dd></div>
                )}
                <div><dt className="label text-espresso/60">Website</dt><dd>furugh.com</dd></div>
              </dl>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            {preset.design && (
              <p className="mb-6 border-l-2 border-burgundy pl-4 text-sm">
                You&rsquo;re asking about the design <strong>{preset.design}</strong>.{" "}
                <button type="button" className="min-h-11 underline underline-offset-4" onClick={() => setPreset({ type: preset.type })}>Clear</button>
              </p>
            )}
            <NailEnquiryForm preset={preset} />
          </div>
        </div>
      </NailSection>

      {/* ---------- 11 FAQ ---------- */}
      <NailSection tone="nude" id="faq">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-12">
          <SectionHead id="faq" n="11" label="Questions" title="Frequently Asked Questions" className="lg:col-span-4" />
          <div className="border-t border-espresso/25 lg:col-span-7 lg:col-start-6">
            {[...faqs, { q: "Where are you based?", a: `I am based in ${siteConfig.contact.city ?? nailBrand.area}, in ${nailBrand.area}. Please contact me directly about professional opportunities and service availability.` }].map((f) => (
              <details key={f.q} className="group border-b border-espresso/25">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 font-editorial text-[1.55rem] leading-tight [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-espresso/30 font-sans text-lg transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-2xl pb-6 leading-relaxed text-espresso/80">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </NailSection>

      <SignOff />
      <Footer />
    </main>
  );
}

/* ---------------- 01 Hero ---------------- */
function Hero({ art, count }: { art: (id: string) => GalleryArtwork | undefined; count: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBig = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "10%"]);
  const ySmall = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-22%"]);
  const big = art("img-7903");
  const small = art("img-0114");

  return (
    <NailSection tone="ivory" label="Forough, nail artist" className="relative">
      <div ref={ref} className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-[calc(var(--nav-h)+env(safe-area-inset-top)+2.5rem)] sm:px-8 lg:min-h-[100svh] lg:grid-cols-12 lg:items-center lg:gap-8 lg:pb-12 lg:pt-[calc(var(--nav-h)+2rem)]">
        <div className="lg:col-span-6">
          <p className="hero-in label text-burgundy">Professional Nail Artist &middot; {nailBrand.area}</p>
          <h1 className="hero-in font-editorial mt-6 text-[clamp(3.6rem,10vw,8.2rem)] leading-[0.9]" style={v({ "--d": "0.15s" })}>
            Beauty Is in the <em className="text-burgundy">Details.</em>
          </h1>
          <p className="hero-in mt-7 max-w-lg text-[1.08rem] leading-relaxed text-espresso/80" style={v({ "--d": "0.35s" })}>
            I combine professional nail care, technical precision, and artistic creativity to create refined nail enhancements and personalized designs. With {nailBrand.yearsExperience} years of practical experience and professional vocational training, my approach focuses on beautiful results, thoughtful preparation, and exceptional attention to detail.
          </p>
          <div className="hero-in mt-9 flex flex-wrap gap-3" style={v({ "--d": "0.5s" })}>
            <a href="#portfolio" className="btn bg-espresso text-ivory hover:bg-burgundy">Explore my work <span aria-hidden>&darr;</span></a>
            <a href="#services" className="btn border border-espresso text-espresso hover:bg-espresso hover:text-ivory">Discover my services</a>
          </div>
          <p className="hero-in mt-9 flex flex-wrap gap-x-4 gap-y-1 text-sm text-espresso/70" style={v({ "--d": "0.65s" })}>
            <span>{nailBrand.yearsExperience} Years of Experience</span><span aria-hidden className="text-champagne">&middot;</span>
            <span>Professionally Trained</span><span aria-hidden className="text-champagne">&middot;</span>
            <span>Detail Focused</span>
          </p>
        </div>

        <div className="relative lg:col-span-6 lg:col-start-7">
          {big && (
            <motion.div style={{ y: yBig }} className="hero-in ml-auto w-[86%] sm:w-[72%] lg:w-[78%]">
              <div className="overflow-hidden bg-nude">
                <ArtImage art={big} sizes="(min-width: 1024px) 38vw, 86vw" priority className="push-in aspect-[4/5] object-cover" />
              </div>
              <p className="mt-2 text-right text-sm text-espresso/60">{big.title}, hand painted</p>
            </motion.div>
          )}
          {small && (
            <motion.div style={{ y: ySmall }} className="hero-in absolute -bottom-6 left-0 w-[44%] border-[6px] border-ivory sm:w-[36%] lg:-left-6 lg:bottom-10">
              <ArtImage art={small} sizes="(min-width: 1024px) 18vw, 44vw" priority className="aspect-square object-cover" />
            </motion.div>
          )}
        </div>
      </div>

      <nav aria-label="On this page" className="mx-auto max-w-7xl px-5 pb-10 pt-6 sm:px-8">
        <div className="flex items-center gap-6 border-t border-espresso/20 pt-5">
          <a href="#about" className="label hidden items-center gap-3 text-espresso/70 sm:flex">
            <span aria-hidden className="scroll-cue block h-8 w-px bg-espresso/40" /> Scroll
          </a>
          <ul className="no-scrollbar flex flex-1 gap-5 overflow-x-auto text-sm sm:justify-end">
            {INDEX.map(([id, t], i) => (
              <li key={id} className="shrink-0">
                <a href={`#${id}`} className="inline-flex min-h-11 items-center gap-1.5 hover:text-burgundy">
                  <span className="label text-burgundy">{String(i + 2).padStart(2, "0")}</span> {t}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="sr-only">{count} portfolio photos below.</p>
      </nav>
    </NailSection>
  );
}

/* ---------------- 05 The craft: six stages, the active one highlighted ---------------- */
function Craft({ art }: { art: (id: string) => GalleryArtwork | undefined }) {
  return (
    <NailSection tone="espresso" id="craft">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-8 lg:grid-cols-12">
          <SectionHead id="craft" n="05" label="Technical expertise" title="The Craft Behind Every Set" light className="lg:col-span-7" />
          <p className="self-end leading-relaxed text-ivory/75 lg:col-span-4 lg:col-start-9">
            Professional nail artistry is far more than colour. Every set moves through six stages, from preparation and architecture to artistry and the final finish.
          </p>
        </div>
        <ol className="mt-16 border-t border-ivory/20">
          {craftStages.map((s) => {
            const a = s.photo ? art(s.photo) : undefined;
            return (
              <li key={s.n} className="grid gap-6 border-b border-ivory/20 py-10 md:grid-cols-12 md:items-center md:gap-8">
                <span aria-hidden className="font-editorial text-[4.5rem] italic leading-none text-champagne md:col-span-2 md:text-[6rem]">{s.n}</span>
                <div className="md:col-span-6">
                  <h3 className="font-editorial text-[clamp(2.2rem,4vw,3.4rem)]"><LiftText>{s.title}</LiftText></h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-ivory/75">{s.text}</p>
                </div>
                <div className="md:col-span-3 md:col-start-10">
                  {a && (
                    <PullUp steps={5} className="bg-black/20">
                      <ArtImage art={a} sizes="(min-width: 768px) 22vw, 92vw" className="aspect-[4/3] object-cover" />
                    </PullUp>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </NailSection>
  );
}

/* ---------------- Brand sign-off ---------------- */
function SignOff() {
  return (
    <NailSection tone="espresso" label="Forough, Nail Artistry">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <p className="font-editorial text-[clamp(3.4rem,11vw,9rem)] leading-none tracking-[0.04em]">{nailBrand.name}</p>
        <p className="label mt-4 text-champagne">{nailBrand.descriptor}</p>
        <div className="mt-12 grid gap-10 border-t border-ivory/20 pt-8 md:grid-cols-3">
          <p className="font-editorial text-[1.8rem] italic leading-tight text-champagne">{nailBrand.closing}</p>
          <nav aria-label="Nail artistry links" className="flex flex-col gap-2 text-sm">
            <a href="#portfolio" className="min-h-8 hover:text-champagne">Portfolio</a>
            <a href="#services" className="min-h-8 hover:text-champagne">Services</a>
            <Link href="/nails/professional-profile/" className="min-h-8 hover:text-champagne">Professional opportunities</Link>
            <a href="#inquire" className="min-h-8 hover:text-champagne">Contact</a>
          </nav>
          <p id="privacy" className="text-sm leading-relaxed text-ivory/70">
            <span className="label mb-2 block text-champagne">Privacy</span>
            Messages sent through the forms on this site go to Forough&rsquo;s email through FormSubmit and are used only to reply to you. This site has no booking or payment system and uses no tracking cookies.
          </p>
        </div>
      </div>
    </NailSection>
  );
}
