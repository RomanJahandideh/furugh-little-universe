import type { Metadata } from "next";
import { PaintingWorld } from "@/components/painting/PaintingWorld";
import { getPaintings } from "@/lib/paintings";
import { absoluteUrl } from "@/lib/paths";

const description =
  "Decorative wall painting by Forough Mahmoudpour: hand-painted murals and ornament for walls and interiors. Based in Surrey, BC.";

export const metadata: Metadata = {
  title: "Decorative Painting | Forough Mahmoudpour",
  description,
  alternates: { canonical: absoluteUrl("/decorative-painting/") },
  openGraph: {
    title: "Decorative Painting | Forough Mahmoudpour",
    description,
    url: absoluteUrl("/decorative-painting/"),
    images: [{ url: absoluteUrl("/og/home.png"), width: 1200, height: 630, alt: "Forough Mahmoudpour" }],
  },
};

export default function DecorativePaintingPage() {
  return <PaintingWorld paintings={getPaintings()} />;
}
