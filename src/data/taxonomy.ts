/**
 * Categories, moods and color families for the nail gallery.
 * Edit labels freely; ids are what artworks.ts refers to.
 */

export const categories = [
  { id: "minimal", label: "Minimal & Clean" },
  { id: "french", label: "French Tips" },
  { id: "chrome", label: "Chrome & Metallic" },
  { id: "floral", label: "Floral & Botanical" },
  { id: "abstract", label: "Abstract & Artistic" },
  { id: "cute", label: "Cute & Playful" },
  { id: "glam", label: "Glam & Sparkle" },
  { id: "bold", label: "Bold & Colorful" },
  { id: "seasonal", label: "Seasonal & Themed" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export const categoryLabel = (id: string) =>
  categories.find((c) => c.id === id)?.label ?? id;

/** The "What's your nail mood?" cards. Each mood matches one or more categories. */
export const moods = [
  { id: "minimal", label: "Feeling Minimal?", icon: "smile", accent: "var(--mint)", match: ["minimal"] },
  { id: "classic", label: "Classic, But Not Boring?", icon: "star", accent: "var(--butter)", match: ["french"] },
  { id: "shiny", label: "Something Shiny?", icon: "sparkle", accent: "var(--lilac)", match: ["chrome", "glam"] },
  { id: "flower", label: "Flower Power?", icon: "flower", accent: "var(--pink)", match: ["floral"] },
  { id: "cute", label: "Tiny Doodles?", icon: "heart", accent: "var(--coral)", match: ["cute"] },
  { id: "bold", label: "Make It Bold!", icon: "bolt", accent: "var(--butter)", match: ["bold", "abstract"] },
  { id: "seasonal", label: "Dressed for the Season?", icon: "snow", accent: "var(--mint)", match: ["seasonal"] },
] as const satisfies ReadonlyArray<{
  id: string;
  label: string;
  icon: string;
  accent: string;
  match: readonly CategoryId[];
}>;

export type MoodId = (typeof moods)[number]["id"];

/** Color families for the paint-blob playground. `swatch` is only for the blob. */
export const colorFamilies = [
  { id: "nude", label: "Nude", swatch: "#E9C9B4" },
  { id: "white", label: "Milky white", swatch: "#F4F1EA" },
  { id: "pink", label: "Pink", swatch: "#F2559B" },
  { id: "red", label: "Red & wine", swatch: "#B3172B" },
  { id: "orange", label: "Orange", swatch: "#EE6A1F" },
  { id: "yellow", label: "Yellow", swatch: "#F3DD6B" },
  { id: "green", label: "Green & mint", swatch: "#2E8B57" },
  { id: "blue", label: "Blue", swatch: "#8DB4EA" },
  { id: "lilac", label: "Lilac", swatch: "#C8B6F0" },
  { id: "brown", label: "Brown & leopard", swatch: "#8A5A3B" },
  { id: "black", label: "Black", swatch: "#1E1E1E" },
  { id: "gold", label: "Gold", swatch: "#C9A646" },
  { id: "silver", label: "Silver", swatch: "#B9BFC7" },
] as const;

export type ColorId = (typeof colorFamilies)[number]["id"];

export const colorLabel = (id: string) =>
  colorFamilies.find((c) => c.id === id)?.label ?? id;
