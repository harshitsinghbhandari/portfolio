import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/writing'
import { getWorkSlugs } from '@/lib/work'
import { SITE_URL } from '@/lib/person'

const BASE = SITE_URL

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${BASE}/writing/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const work = getWorkSlugs().map((slug) => ({
    url: `${BASE}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/writing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...posts,
    ...work,
  ]
}
