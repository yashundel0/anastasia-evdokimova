/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/anastasia-evdokimova',
  trailingSlash: true,

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },
}

export default nextConfig
