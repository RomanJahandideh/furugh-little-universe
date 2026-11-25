import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { MotionConfig } from "motion/react";
import { SiteNav } from "@/components/navigation/SiteNav";
import { absoluteUrl } from "@/lib/paths";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], display: "swap" });

const description =
  "Forough Mahmoudpour: decorative wall painting and nail artistry. Choose a path to see her murals and ornament, or her hand-painted nail designs. Based in Vancouver, BC.";

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: { default: "Forough Mahmoudpour | Decorative Painting & Nail Artistry", template: "%s" },
  description,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    siteName: "Forough Mahmoudpour",
    title: "Forough Mahmoudpour | Decorative Painting & Nail Artistry",
    description,
    images: [{ url: absoluteUrl("/og/home.png"), width: 1200, height: 630, alt: "Forough Mahmoudpour, decorative painter and nail artist" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F7F6F3",
};

// Runs before first paint so reveal animations only hide content when JS works.
const boot = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`} suppressHydrationWarning>
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
