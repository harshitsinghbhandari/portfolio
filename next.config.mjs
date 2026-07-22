/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source:
          '/:path((?!tools|static|_next|favicon\\.svg|hsb\\.jpg|robots\\.txt|sitemap\\.xml|manifest\\.webmanifest|llms\\.txt|opengraph-image|apple-icon).+)',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
