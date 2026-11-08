import { SalesProfile } from "@/components/profile/SalesProfile";
import { getArtworks } from "@/lib/artworks";

export default function HomePage() {
  const peeks = getArtworks()
    .filter((a) => a.featured)
    .slice(0, 4);
  return <SalesProfile peeks={peeks} />;
}
