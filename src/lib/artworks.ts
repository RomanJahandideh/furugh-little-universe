import manifest from "@/data/artwork-images.json";
import { artworkDetails, type NailArtwork } from "@/data/artworks";
import { asset } from "./paths";

export const IMAGE_WIDTHS = [480, 960, 1600] as const;

export interface GalleryArtwork extends NailArtwork {
  number: number;
  width: number;
  height: number;
  blur: string;
  src: string;
  srcSet: string;
  full: string;
}

type ManifestEntry = { width: number; height: number; blur: string };
const images = manifest as Record<string, ManifestEntry>;

function srcFor(id: string, w: number) {
  return asset(`/images/nails/${id}-${w}.webp`);
}

/**
 * Every processed photo becomes an artwork. Details come from artworks.ts;
 * a photo without details still shows up (as "Untitled") at the end.
 */
export function getArtworks(): GalleryArtwork[] {
  const details = new Map(artworkDetails.map((a) => [a.id, a]));
  return Object.entries(images)
    .map(([id, img]) => {
      const d: NailArtwork = details.get(id) ?? {
        id,
        title: "Untitled design",
        alt: "Nail art by Furugh",
        categories: [],
        colors: [],
        featured: false,
        order: 9999,
      };
      return {
        ...d,
        number: 0,
        width: img.width,
        height: img.height,
        blur: img.blur,
        src: srcFor(id, 960),
        srcSet: IMAGE_WIDTHS.map((w) => `${srcFor(id, w)} ${w}w`).join(", "),
        full: srcFor(id, 1600),
      };
    })
    .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id))
    .map((a, i) => ({ ...a, number: i + 1 }));
}
