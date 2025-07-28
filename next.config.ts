import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "n0orltazpm.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
