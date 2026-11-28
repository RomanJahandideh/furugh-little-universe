import type { Metadata } from "next";
import { NailStudio } from "@/components/nails/NailStudio";
import { certificate, nailBrand } from "@/data/nails";
import { siteConfig } from "@/data/site-config";
import { getArtworks } from "@/lib/artworks";
import { absoluteUrl } from "@/lib/paths";

const title = "Forough | Nail Artist & Nail Technician in Greater Vancouver";
const description =
  "Explore Forough Mahmoudpour's nail artistry portfolio: sculpted gel extensions, Russian manicure, hand painted nail art, French and ombré designs, and three years of practical experience in nail care, in Greater Vancouver, BC.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/nails/") },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/nails/"),
    images: [{ url: absoluteUrl("/og/nails.png"), width: 1200, height: 630, alt: "A collage of Forough's nail art" }],
  },
};

/** Person data only: no salon or LocalBusiness is claimed. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  alternateName: "Forough",
  jobTitle: "Nail Technician and Nail Artist",
  url: absoluteUrl("/nails/"),
  image: absoluteUrl("/og/nails.png"),
  address: { "@type": "PostalAddress", addressLocality: "Vancouver", addressRegion: "BC", addressCountry: "CA" },
  areaServed: nailBrand.area,
  knowsAbout: ["Sculpted gel nail extensions", "Gel nails", "Russian manicure", "Hand painted nail art", "French manicure", "Ombré nails", "Gel fill", "Nail rebalancing", "Gel removal", "Nail repair"],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: certificate.title,
    credentialCategory: "Vocational certificate",
    recognizedBy: { "@type": "Organization", name: certificate.issuer },
  },
};

export default function NailsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NailStudio artworks={getArtworks()} />
    </>
  );
}
