import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/writing'

const BASE = 'https://theharshitsingh.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${BASE}/writing/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/writing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...posts,
  ]
}
