import type { Metadata, Viewport } from "next";
import { Caveat, DM_Sans, Fraunces } from "next/font/google";
import { MotionConfig } from "motion/react";
import { SiteNav } from "@/components/navigation/SiteNav";
import { absoluteUrl } from "@/lib/paths";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: "Furugh | Personal Portfolio",
    template: "%s",
  },
  description:
    "Furugh Does Things: a people-first retail sales professional and a nail artist with a sketchbook full of tiny masterpieces.",
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    siteName: "Furugh's Little Universe",
    title: "Furugh | Personal Portfolio",
    description: "One person. Two worlds. Meet the sales pro, or explore the nail art.",
    images: [{ url: absoluteUrl("/og/home.png"), width: 1200, height: 630, alt: "Furugh's Little Universe" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FAFAF7",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable} ${caveat.variable}`} suppressHydrationWarning>
      <head>
        {/* Reveal animations only hide content once JS is known to be running. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        <MotionConfig reducedMotion="user">
          <SiteNav />
          {children}
        </MotionConfig>
      </body>
    </html>
  );
}
