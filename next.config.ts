import type { NextConfig } from "next";

const isGitHubPages = process.env.DEPLOY_TARGET !== 'fly';

const nextConfig: NextConfig = {
  output: 'export',
  ...(isGitHubPages && {
    basePath: '/jbw',
    assetPrefix: '/jbw/',
  }),
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
