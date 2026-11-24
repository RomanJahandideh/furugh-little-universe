"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { Corner, Divider, Vine } from "@/components/ornament/Ornaments";
import { siteConfig } from "@/data/site-config";
import { ContactForm } from "./ContactForm";

/** Four gilded rosettes in the corners of a framed area. */
export function FrameCorners({ size = "w-16 sm:w-24" }: { size?: string }) {
  return (
    <>
      <Corner className={`absolute left-1 top-1 ${size}`} />
      <Corner className={`absolute right-1 top-1 ${size} -scale-x-100`} />
      <Corner className={`absolute bottom-1 left-1 ${size} -scale-y-100`} />
      <Corner className={`absolute bottom-1 right-1 ${size} -scale-100`} />
    </>
  );
}

/** Lapis title band with a gilded frame, used at the top of each world. */
export function PageHeader({ kicker, title, intro, children }: { kicker: string; title: string; intro: string; children?: ReactNode }) {
  return (
    <header className="lapis relative overflow-hidden px-3 pb-3 pt-[calc(var(--nav-h)+env(safe-area-inset-top)+0.75rem)] sm:px-6 sm:pb-6">
      <Reveal className="gilded-frame relative mx-auto max-w-7xl px-6 py-14 text-center sm:px-12 sm:py-20">
        <FrameCorners size="w-14 sm:w-20" />
        <Vine aria-hidden className="sway pointer-events-none absolute -bottom-2 left-6 hidden w-[34%] opacity-70 md:block" length={420} />
        <Vine aria-hidden className="sway pointer-events-none absolute -bottom-2 right-6 hidden w-[34%] -scale-x-100 opacity-70 md:block" length={420} />
        <p className="rise label text-gold-light">{kicker}</p>
        <h1 className="rise font-display h-section mx-auto mt-4 max-w-3xl" style={{ "--i": 1 } as React.CSSProperties}>
          {title}
        </h1>
        <Divider className="rise mx-auto mt-5 w-48" />
        <p className="rise mx-auto mt-5 max-w-xl text-[1.08rem] text-[#e9dfcb]" style={{ "--i": 2 } as React.CSSProperties}>
          {intro}
        </p>
        {children}
      </Reveal>
    </header>
  );
}

/** Lapis contact block with the email form. */
export function ContactSection({ id = "contact", title, intro, subject, initialMessage, aside }: {
  id?: string;
  title: string;
  intro: string;
  subject: string;
  initialMessage?: string;
  aside?: ReactNode;
}) {
  const { email, phone, city } = siteConfig.contact;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 px-3 pb-3 sm:px-6 sm:pb-6">
      <Reveal className="lapis gilded-frame relative mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:px-12 sm:py-16 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
        <FrameCorners size="w-12 sm:w-16" />
        <div>
          <p className="rise label text-gold-light">Contact</p>
          <h2 id={`${id}-title`} className="rise font-display h-section mt-4" style={{ "--i": 1 } as React.CSSProperties}>
            {title}
          </h2>
          <p className="rise mt-4 max-w-md text-[#e9dfcb]" style={{ "--i": 2 } as React.CSSProperties}>
            {intro}
          </p>
          {aside}
          <ul className="rise mt-7 space-y-3" style={{ "--i": 3 } as React.CSSProperties}>
            {email && (
              <li>
                <span className="label block text-gold-light/80">Email</span>
                <a href={`mailto:${email}`} className="font-medium hover:underline">{email}</a>
              </li>
            )}
            {phone && (
              <li>
                <span className="label block text-gold-light/80">Phone</span>
                <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="font-medium hover:underline">{phone}</a>
              </li>
            )}
            {city && (
              <li>
                <span className="label block text-gold-light/80">Based in</span>
                <span className="font-medium">{city}, Canada</span>
              </li>
            )}
          </ul>
        </div>
        <div className="rise" style={{ "--i": 2 } as React.CSSProperties}>
          <ContactForm dark subject={subject} initialMessage={initialMessage} />
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="px-4 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] text-center sm:px-8">
      <Divider className="mx-auto w-40" />
      <p className="font-display mt-4 text-2xl">Forough Mahmoudpour</p>
      <p className="mt-1 text-sm text-ink-soft">Decorative painting &middot; Nail artistry &middot; Surrey, BC</p>
      <nav aria-label="Footer" className="mt-4 flex justify-center gap-6 text-sm">
        <Link href="/" className="text-ink-soft hover:text-ink">Home</Link>
        <Link href="/decorative-painting/" className="text-ink-soft hover:text-ink">Decorative painting</Link>
        <Link href="/nails/" className="text-ink-soft hover:text-ink">Nail artistry</Link>
      </nav>
      <p className="mt-6 text-xs text-ink-soft">&copy; {new Date().getFullYear()} Forough Mahmoudpour</p>
    </footer>
  );
}
