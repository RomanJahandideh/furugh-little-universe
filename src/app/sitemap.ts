import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/paths";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/decorative-painting/", "/nails/", "/nails/professional-profile/"].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
