import type { Metadata } from "next";
import { ProfessionalProfile } from "@/components/nails/ProfessionalProfile";
import { getArtworks } from "@/lib/artworks";
import { absoluteUrl } from "@/lib/paths";

const title = "Professional Profile | Forough, Nail Technician & Nail Artist";
const description =
  "A one-page professional profile for salon owners and recruiters: Forough Mahmoudpour, nail technician and nail artist with three years of practical experience and a vocational certificate in Nail Care and Correction Technology.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/nails/professional-profile/") },
  openGraph: { title, description, url: absoluteUrl("/nails/professional-profile/"), images: [{ url: absoluteUrl("/og/nails.png"), width: 1200, height: 630, alt: "A collage of Forough's nail art" }] },
};

export default function ProfessionalProfilePage() {
  return <ProfessionalProfile artworks={getArtworks()} />;
}
