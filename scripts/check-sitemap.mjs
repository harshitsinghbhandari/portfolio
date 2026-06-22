// Verifies every published post appears in the served sitemap.
// Usage: SITE_URL=http://localhost:3000 node scripts/check-sitemap.mjs
//        (defaults to production)
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const SITE_URL = process.env.SITE_URL ?? 'https://theharshitsingh.com'
const WRITING_DIR = path.join(process.cwd(), 'content', 'writing')

const slugs = fs
  .readdirSync(WRITING_DIR)
  .filter((f) => f.endsWith('.mdx'))
  .filter((f) => matter(fs.readFileSync(path.join(WRITING_DIR, f), 'utf8')).data.draft !== true)
  .map((f) => f.replace(/\.mdx$/, ''))

const res = await fetch(`${SITE_URL}/sitemap.xml`)
if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`)
const xml = await res.text()

const missing = slugs.filter((slug) => !xml.includes(`/writing/${slug}`))
if (missing.length) {
  console.error('Missing from sitemap:\n' + missing.map((s) => `  ${s}`).join('\n'))
  process.exit(1)
}
console.log(`OK: all ${slugs.length} published posts are in the sitemap.`)
