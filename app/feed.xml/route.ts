import { getAllPosts } from '@/lib/writing'
import { SITE_URL } from '@/lib/person'

export const dynamic = 'force-static'

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const posts = getAllPosts()
  const lastBuildDate = posts.length
    ? new Date(posts[0].date).toUTCString()
    : new Date().toUTCString()

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/writing/${post.slug}`
      const categories = post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join('\n')
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
      <author>harshitsingh@iitb.ac.in (Harshit Singh)</author>
${categories}
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Harshit Singh · Writing</title>
    <link>${SITE_URL}/writing</link>
    <description>Notes on agents, personal software, and the systems that hold them up. By Harshit Singh Bhandari.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
