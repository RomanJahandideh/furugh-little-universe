import { Landing } from "@/components/landing/Landing";
import { getArtworks } from "@/lib/artworks";
import { getPaintings } from "@/lib/paintings";

export default function HomePage() {
  const paintings = getPaintings();
  const nails = getArtworks();
  const works = paintings.filter((p) => p.group !== "studio");
  // Selected work: featured pieces first, skipping the ones already in the Elevator.
  const floorIds = ["img-e5618", "img-8277", "img-9549", "img-0938", "img-e8289"];
  const picks = [...works.filter((p) => p.featured), ...works.filter((p) => !p.featured)].filter((p) => !floorIds.includes(p.id)).slice(0, 6);
  return (
    <Landing
      nailPicks={["img-4898", "img-1003", "img-7897", "img-2577", "img-0938", "img-5950"].map((id) => nails.find((a) => a.id === id)).filter((a) => a !== undefined)}
      paintingPicks={picks}
      floors={floorIds.map((id) => paintings.find((p) => p.id === id)).filter((p) => p !== undefined)}
    />
  );
}
