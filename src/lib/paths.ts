import { siteConfig } from "@/data/site-config";

/** Prefix for files in /public when the site lives under a sub-path (GitHub Pages). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Absolute public URL for canonical links and social images. */
export function absoluteUrl(path = "/"): string {
  return `${siteConfig.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
