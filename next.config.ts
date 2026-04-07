import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Add allowed quality values
    qualities: [70, 75, 90], // Add 90 to the list
    // Your other image config...
  },
};

export default nextConfig;
