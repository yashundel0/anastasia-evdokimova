/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/anastasia-evdokimova',
  assetPrefix: '/anastasia-evdokimova/',
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
