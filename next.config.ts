import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",        // static HTML export for GitHub Pages
  trailingSlash: true,     // needed for GH Pages routing
  images: { unoptimized: true }, // no server-side image optimisation in static export
};

export default nextConfig;
