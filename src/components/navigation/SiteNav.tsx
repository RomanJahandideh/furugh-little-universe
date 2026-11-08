"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SECTIONS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

/** Simple store-style header: name, a few section links, and the nail art door. */
export function SiteNav() {
  const pathname = usePathname() ?? "/";
  const onNails = pathname.startsWith("/nails");
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Over the hero photo the header starts transparent with white text.
  const light = !onNails && !solid && !open;
  const links = onNails
    ? [
        { href: "/", label: "Sales profile" },
        { href: "#gallery", label: "Gallery" },
        { href: "#inquire", label: "Contact" },
      ]
    : SECTIONS;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,color] duration-300 ${
        light ? "text-white" : "bg-paper/92 text-ink shadow-[0_1px_0_var(--line)] backdrop-blur-md"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <nav aria-label="Main" className="mx-auto flex h-[var(--nav-h)] max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">
        <Link href="/" className="flex min-h-11 items-center font-display text-[1.35rem] font-bold tracking-[-0.03em]">
          Furugh
          <span className={light ? "text-white/70" : "text-accent"}>.</span>
        </Link>

        <ul className="hidden items-center gap-7 text-[0.95rem] font-medium md:flex">
          {links.map((l) => (
            <li key={l.href}>
              {l.href.startsWith("#") ? (
                <a href={l.href} className="opacity-80 transition-opacity hover:opacity-100">{l.label}</a>
              ) : (
                <Link href={l.href} className="opacity-80 transition-opacity hover:opacity-100">{l.label}</Link>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {onNails ? (
            <Link href="/" className={`btn !min-h-10 !px-4 text-sm ${light ? "btn-light" : "btn-dark"}`}>
              <span aria-hidden>&larr;</span> Profile
            </Link>
          ) : (
            <Link href="/nails/" className={`btn !min-h-10 !px-4 text-sm ${light ? "btn-light" : "btn-dark"}`}>
              My nail art <span aria-hidden>&rarr;</span>
            </Link>
          )}
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span aria-hidden className="relative block h-3 w-5">
              <span className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="border-t border-line bg-paper px-4 pb-5 pt-2 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              {l.href.startsWith("#") ? (
                <a href={l.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center border-b border-line font-display text-xl">{l.label}</a>
              ) : (
                <Link href={l.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center border-b border-line font-display text-xl">{l.label}</Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
