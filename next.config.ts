import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // WHY: Railway needs the standalone output for efficient Docker-less deployment
};

export default nextConfig;
