import manifest from "@/data/painting-images.json";
import { paintingDetails, type PaintingWork } from "@/data/paintings";
import { asset } from "./paths";

export interface PaintingPhoto extends PaintingWork {
  width: number;
  height: number;
  blur: string;
  src: string;
  srcSet: string;
}

type ManifestEntry = { width: number; height: number; blur: string };
const images = manifest as Record<string, ManifestEntry>;
const src = (id: string, w: number) => asset(`/images/paintings/${id}-${w}.webp`);

/**
 * Only photos that have details in paintings.ts are shown, so a folder of
 * candidates can be processed without every image going live.
 */
export function getPaintings(): PaintingPhoto[] {
  return paintingDetails
    .filter((d) => images[d.id])
    .sort((a, b) => a.order - b.order)
    .map((d) => {
      const img = images[d.id];
      return {
        ...d,
        width: img.width,
        height: img.height,
        blur: img.blur,
        src: src(d.id, 960),
        srcSet: [480, 960, 1600].map((w) => `${src(d.id, w)} ${w}w`).join(", "),
      };
    });
}
