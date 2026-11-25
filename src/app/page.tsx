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
    />
  );
}
