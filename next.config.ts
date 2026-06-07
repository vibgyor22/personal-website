import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // basePath and assetPrefix are injected automatically by actions/configure-pages@v5
};

export default nextConfig;
