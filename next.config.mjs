/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'theharshitsingh.com' }],
        destination: 'https://hsbhandari.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.theharshitsingh.com' }],
        destination: 'https://hsbhandari.com/:path*',
        permanent: true,
      },
      {
        source:
          '/:path((?!explanations|tools|static|_next|favicon\\.svg|hsb\\.jpg|robots\\.txt|sitemap\\.xml|manifest\\.webmanifest|llms\\.txt|opengraph-image|apple-icon).+)',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
