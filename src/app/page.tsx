import { Landing } from "@/components/landing/Landing";
import { getArtworks } from "@/lib/artworks";
import { getPaintings } from "@/lib/paintings";

export default function HomePage() {
  const nails = getArtworks();
  const featuredNails = nails.filter((a) => a.featured);
  const paintings = getPaintings();
  return (
    <Landing
      nailDoor={nails.find((a) => a.id === "img-1486") ?? featuredNails[0]}
      paintingDoor={paintings.find((p) => p.id === "img-6646") ?? paintings[0]}
      nailPicks={featuredNails.filter((a) => a.id !== "img-1486")}
      paintingPicks={paintings.filter((p) => p.featured && p.group !== "studio")}
    />
  );
}
