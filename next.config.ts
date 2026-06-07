import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: "/personal-website",   // repo name on GitHub
  assetPrefix: "/personal-website/",
};

export default nextConfig;
