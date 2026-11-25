"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { siteConfig } from "@/data/site-config";
import { ContactForm } from "./ContactForm";

/** Plain page title block at the top of each section of the site. */
export function PageHeader({ kicker, title, intro }: { kicker: string; title: string; intro: string }) {
  return (
    <header className="mx-auto max-w-7xl px-5 pb-10 pt-[calc(var(--nav-h)+env(safe-area-inset-top)+3.5rem)] sm:px-8 sm:pb-14 sm:pt-[calc(var(--nav-h)+5rem)]">
      <Reveal>
        <p className="rise label text-ink-soft">{kicker}</p>
        <h1 className="rise font-display h-hero mt-4" style={{ "--i": 1 } as React.CSSProperties}>
          {title}
        </h1>
        <p className="rise mt-6 max-w-xl text-[1.1rem] text-ink-soft" style={{ "--i": 2 } as React.CSSProperties}>
          {intro}
        </p>
      </Reveal>
    </header>
  );
}

/** Contact block with the email form. */
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
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 border-t border-line">
      <Reveal className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
        <div>
          <p className="rise label text-ink-soft">Contact</p>
          <h2 id={`${id}-title`} className="rise font-display h-section mt-4" style={{ "--i": 1 } as React.CSSProperties}>
            {title}
          </h2>
          <p className="rise mt-5 max-w-md text-ink-soft" style={{ "--i": 2 } as React.CSSProperties}>
            {intro}
          </p>
          {aside}
          <dl className="rise mt-10 space-y-4 text-[0.98rem]" style={{ "--i": 3 } as React.CSSProperties}>
            {email && (
              <div>
                <dt className="label text-ink-soft">Email</dt>
                <dd><a href={`mailto:${email}`} className="hover:underline">{email}</a></dd>
              </div>
            )}
            {phone && (
              <div>
                <dt className="label text-ink-soft">Phone</dt>
                <dd><a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="hover:underline">{phone}</a></dd>
              </div>
            )}
            {city && (
              <div>
                <dt className="label text-ink-soft">Based in</dt>
                <dd>{city}, Canada</dd>
              </div>
            )}
          </dl>
        </div>
        <div className="rise" style={{ "--i": 2 } as React.CSSProperties}>
          <ContactForm subject={subject} initialMessage={initialMessage} />
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line px-5 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Forough Mahmoudpour &middot; Surrey, BC</p>
        <nav aria-label="Footer" className="flex gap-6">
          <Link href="/" className="hover:text-ink">Home</Link>
          <Link href="/decorative-painting/" className="hover:text-ink">Decorative painting</Link>
          <Link href="/nails/" className="hover:text-ink">Nail artistry</Link>
        </nav>
      </div>
    </footer>
  );
}
