import type { NextConfig } from "next";

// GitHub Pages serves this project at the custom-domain root.  Retain the
// project-path build only when an explicitly named preview needs it.
const isGitHubProjectPath = process.env.DEPLOY_TARGET === 'github-project-pages';

const nextConfig: NextConfig = {
  output: 'export',
  ...(isGitHubProjectPath && {
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
