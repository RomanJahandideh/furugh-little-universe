import type { NextConfig } from "next";

// GitHub Pages serves the site from /<repo-name>/. The deploy workflow sets
// NEXT_PUBLIC_BASE_PATH; locally it is empty so `npm run dev` works at "/".
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
