import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    boardList: {
      revalidate: 30,
      expire: 300,
    },
  },
};

export default nextConfig;
