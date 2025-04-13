import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: "export",
  reactMaxHeadersLength: 64000,
  basePath: '/sci-fi-crawl'
};

export default nextConfig;
