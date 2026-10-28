import type { CSSProperties } from "react";
import type { GalleryArtwork } from "@/lib/artworks";

/**
 * Responsive, color-true photo: WebP srcset with real dimensions (no layout
 * shift) and a tiny blurred preview painted underneath while it loads.
 */
export function ArtImage({
  art,
  sizes,
  priority = false,
  className = "",
  style,
  decorative = false,
  fill = true,
}: {
  art: GalleryArtwork;
  sizes: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  decorative?: boolean;
  /** Stretch to the container width (default). Off = natural size within max bounds. */
  fill?: boolean;
}) {
  return (
    <img
      src={art.src}
      srcSet={art.srcSet}
      sizes={sizes}
      width={art.width}
      height={art.height}
      alt={decorative ? "" : art.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={`block bg-cover bg-center ${fill ? "h-auto w-full" : ""} ${className}`}
      style={{ backgroundImage: `url(${art.blur})`, ...style }}
    />
  );
}
