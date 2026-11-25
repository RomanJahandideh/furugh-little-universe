"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const PATHS = [
  { href: "/decorative-painting/", key: "decorative-painting", label: "Decorative Painting" },
  { href: "/nails/", key: "nails", label: "Nail Artistry" },
];

/** Simple header: name, the two paths, and contact. */
export function SiteNav() {
  const pathname = usePathname() ?? "/";
  const current = PATHS.find((p) => pathname.startsWith(`/${p.key}`))?.key ?? null;
  const contactHref = current === "nails" ? "#inquire" : "#contact";
  // The home page opens on full-bleed photos, so the header starts white.
  const onHero = pathname === "/";
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,color] duration-300 ${
        solid || open ? "bg-paper/95 text-ink shadow-[0_1px_0_var(--line)] backdrop-blur-md" : onHero ? "text-white" : "text-ink"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <nav aria-label="Main" className="mx-auto flex h-[var(--nav-h)] max-w-7xl items-center justify-between gap-4 px-5 sm:px-9">
        <Link href="/" className="font-display flex min-h-11 items-center text-[1.5rem]">
          Forough
        </Link>

        <ul className="hidden items-center gap-8 text-[0.95rem] font-medium md:flex">
          {PATHS.map((p) => (
            <li key={p.key}>
              <Link
                href={p.href}
                aria-current={current === p.key ? "page" : undefined}
                className={`border-b py-1 transition-colors ${current === p.key ? "border-current" : "border-transparent opacity-80 hover:opacity-100"}`}
              >
                {p.label}
              </Link>
            </li>
          ))}
          <li>
            <a href={contactHref} className={`btn !min-h-10 !px-5 text-sm ${onHero && !solid ? "border border-white/80 text-white hover:bg-white hover:text-ink" : "btn-dark"}`}>
              Contact
            </a>
          </li>
        </ul>

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
      </nav>

      {open && (
        <ul id="mobile-menu" className="border-t border-line bg-paper px-5 pb-6 pt-2 md:hidden">
          <li>
            <Link href="/" onClick={() => setOpen(false)} className="font-display flex min-h-12 items-center border-b border-line text-2xl">Home</Link>
          </li>
          {PATHS.map((p) => (
            <li key={p.key}>
              <Link href={p.href} onClick={() => setOpen(false)} className="font-display flex min-h-12 items-center border-b border-line text-2xl">{p.label}</Link>
            </li>
          ))}
          <li>
            <a href={contactHref} onClick={() => setOpen(false)} className="font-display flex min-h-12 items-center text-2xl">Contact</a>
          </li>
        </ul>
      )}
    </header>
  );
}
