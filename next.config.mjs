/** @type {import('next').NextConfig} */

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  output: 'export',

  ...(isGitHubPages && {
    basePath: '/anastasia-evdokimova',
    assetPrefix: '/anastasia-evdokimova/',
  }),

  images: {
    unoptimized: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
