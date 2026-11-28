import { Cormorant_Garamond } from "next/font/google";
import type { ReactNode } from "react";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

/** The nail section gets its own editorial serif on top of the site fonts. */
export default function NailsLayout({ children }: { children: ReactNode }) {
  return <div className={cormorant.variable}>{children}</div>;
}
