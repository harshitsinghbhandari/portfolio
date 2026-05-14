/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/blogs', destination: '/writing', permanent: true },
      { source: '/blogs/:slug', destination: '/writing/:slug', permanent: true },
    ]
  },
}

export default nextConfig
