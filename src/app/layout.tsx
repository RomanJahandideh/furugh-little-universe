import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { MotionConfig } from "motion/react";
import { LanguageProvider } from "@/i18n/Language";
import { SiteNav } from "@/components/navigation/SiteNav";
import { CursorBadge } from "@/components/stage/Cursor";
import { StageController } from "@/components/stage/Stage";
import { absoluteUrl } from "@/lib/paths";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], display: "swap" });

const description =
  "Forough Mahmoudpour: nail technician and nail artist in Vancouver, BC. Also decorative painting for walls, ceilings and domes, and a FOODSAFE Level 1 certified prep cook.";

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: { default: "Forough Mahmoudpour | Nail Technician, Decorative Painter & Prep Cook", template: "%s" },
  description,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    siteName: "Forough Mahmoudpour",
    title: "Forough Mahmoudpour | Nail Technician, Decorative Painter & Prep Cook",
    description,
    images: [{ url: absoluteUrl("/og/home.png"), width: 1200, height: 630, alt: "Forough Mahmoudpour, nail technician" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1D4447",
};

// Runs before first paint so reveal animations only hide content when JS works.
const boot = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        <LanguageProvider>
        <MotionConfig reducedMotion="user">
          <SiteNav />
          <StageController />
          <CursorBadge />
          {children}
        </MotionConfig>
        </LanguageProvider>
      </body>
    </html>
  );
}
