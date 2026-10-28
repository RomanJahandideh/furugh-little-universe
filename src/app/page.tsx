import { Landing } from "@/components/landing/Landing";
import { getArtworks } from "@/lib/artworks";

export default function HomePage() {
  const peeks = getArtworks()
    .filter((a) => a.featured)
    .slice(0, 3);
  return <Landing peeks={peeks} />;
}
