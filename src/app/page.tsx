import { Landing } from "@/components/landing/Landing";
import { getArtworks } from "@/lib/artworks";
import { getPaintings } from "@/lib/paintings";

export default function HomePage() {
  const nails = getArtworks();
  const featured = nails.filter((a) => a.featured);
  const paintings = getPaintings().filter((p) => p.featured);
  return (
    <Landing
      nailDoor={nails.find((a) => a.id === "img-1486") ?? featured[0]}
      nailPicks={featured.filter((a) => a.id !== "img-1486")}
      paintingPicks={paintings}
    />
  );
}
