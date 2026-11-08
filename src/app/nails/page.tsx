import type { Metadata } from "next";
import { NailsExperience } from "@/components/gallery/NailsExperience";
import { getArtworks } from "@/lib/artworks";
import { absoluteUrl } from "@/lib/paths";

const description =
  "Original nail art by Furugh: 60 hand-painted designs, from minimal and French to chrome, floral and bold. Filter by style or color.";

export const metadata: Metadata = {
  title: "Furugh | Nail Art",
  description,
  alternates: { canonical: absoluteUrl("/nails/") },
  openGraph: {
    title: "Furugh | Nail Art",
    description,
    url: absoluteUrl("/nails/"),
    images: [{ url: absoluteUrl("/og/nails.png"), width: 1200, height: 630, alt: "A collage of Furugh's nail art" }],
  },
};

export default function NailsPage() {
  return <NailsExperience artworks={getArtworks()} />;
}
