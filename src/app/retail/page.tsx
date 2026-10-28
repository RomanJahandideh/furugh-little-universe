import type { Metadata } from "next";
import { RetailStory } from "@/components/retail/RetailStory";
import { absoluteUrl } from "@/lib/paths";

const description =
  "Meet Furugh: a friendly, adaptable retail sales professional with experience in home improvement, fashion and hypermarket retail, looking for her next sales associate role.";

export const metadata: Metadata = {
  title: "Furugh | Retail Sales Professional",
  description,
  alternates: { canonical: absoluteUrl("/retail/") },
  openGraph: {
    title: "Furugh | Retail Sales Professional",
    description,
    url: absoluteUrl("/retail/"),
    images: [{ url: absoluteUrl("/og/retail.png"), width: 1200, height: 630, alt: "Meet Furugh, the people person" }],
  },
};

export default function RetailPage() {
  return <RetailStory />;
}
