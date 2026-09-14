import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow local images from public directory
    unoptimized: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
