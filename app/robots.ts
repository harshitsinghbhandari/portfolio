import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://theharshitsingh.com/sitemap.xml',
    host: 'https://theharshitsingh.com',
  }
}
