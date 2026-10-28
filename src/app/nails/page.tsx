import type { Metadata } from "next";
import { NailsExperience } from "@/components/gallery/NailsExperience";
import { getArtworks } from "@/lib/artworks";
import { absoluteUrl } from "@/lib/paths";

const description =
  "Tiny canvases, big personalities. Explore Furugh's original nail art by mood or by color: minimal, French, chrome, floral, cute and bold designs.";

export const metadata: Metadata = {
  title: "Furugh | Nail Art Portfolio",
  description,
  alternates: { canonical: absoluteUrl("/nails/") },
  openGraph: {
    title: "Furugh | Nail Art Portfolio",
    description,
    url: absoluteUrl("/nails/"),
    images: [{ url: absoluteUrl("/og/nails.png"), width: 1200, height: 630, alt: "A collage of Furugh's nail art" }],
  },
};

export default function NailsPage() {
  return <NailsExperience artworks={getArtworks()} />;
}
