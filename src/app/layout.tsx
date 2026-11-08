import type { Metadata, Viewport } from "next";
import { DM_Sans, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "motion/react";
import { SiteNav } from "@/components/navigation/SiteNav";
import { absoluteUrl, BASE_PATH } from "@/lib/paths";
import "./globals.css";

const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"], display: "swap" });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], display: "swap" });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["500"], display: "swap" });

const description =
  "Furugh is a retail sales associate with about three years of shop-floor experience and a Bachelor's in Psychology focused on customer behaviour, looking for sales roles in Canada.";

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: { default: "Furugh | Retail Sales Associate", template: "%s" },
  description,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    siteName: "Furugh",
    title: "Furugh | Retail Sales Associate",
    description,
    images: [{ url: absoluteUrl("/og/home.png"), width: 1200, height: 630, alt: "Furugh, retail sales associate" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F6F3EE",
};

// Runs before first paint: enables reveal animations, and shows the WELCOME
// screen only on the homepage, once per browser session.
const boot = `(function(d){d.classList.add('js');try{var p=location.pathname.replace(/\\/+$/,'');var home=p===${JSON.stringify(BASE_PATH)};if(home&&!sessionStorage.getItem('furugh-welcomed')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('show-welcome')}catch(e){}})(document.documentElement)`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${interTight.variable} ${dmSans.variable} ${jetbrains.variable}`} suppressHydrationWarning>
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
        <MotionConfig reducedMotion="user">
          <SiteNav />
          {children}
        </MotionConfig>
      </body>
    </html>
  );
}
