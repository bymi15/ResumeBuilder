import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
};

if (process.env.NODE_ENV === "development") {
  setupDevPlatform();
}

export default nextConfig;
