import { Landing } from "@/components/landing/Landing";
import { getPaintings } from "@/lib/paintings";

export default function HomePage() {
  const paintings = getPaintings();
  const works = paintings.filter((p) => p.group !== "studio");
  // Selected work: featured pieces first, skipping the ones already in the Elevator.
  const floorIds = ["img-e5618", "img-8277", "img-9549", "img-0938", "img-e8289"];
  const picks = [...works.filter((p) => p.featured), ...works.filter((p) => !p.featured)].filter((p) => !floorIds.includes(p.id)).slice(0, 6);
  return (
    <Landing
      paintingPicks={picks}
      floors={floorIds.map((id) => paintings.find((p) => p.id === id)).filter((p) => p !== undefined)}
    />
  );
}
