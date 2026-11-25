import { Landing } from "@/components/landing/Landing";
import { getArtworks } from "@/lib/artworks";
import { getPaintings } from "@/lib/paintings";

export default function HomePage() {
  const nails = getArtworks();
  const featuredNails = nails.filter((a) => a.featured);
  const paintings = getPaintings();
  return (
    <Landing
      nailPicks={featuredNails}
      paintingPicks={paintings.filter((p) => p.featured && p.group !== "studio")}
      floors={["img-e5618", "img-8277", "img-9549", "img-0938", "img-e8289"].map((id) => paintings.find((p) => p.id === id)).filter((p) => p !== undefined)}
    />
  );
}
