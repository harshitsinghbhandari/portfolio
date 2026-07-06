import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export interface DocMeta {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  readingTime?: string
  draft?: boolean
  [key: string]: unknown
}

export interface Doc extends DocMeta {
  content: string
}

function readDoc(dir: string, slug: string): Doc | null {
  const filePath = path.join(dir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  // The page header renders the title separately. Strip a leading h1
  // so we don't render it twice.
  const body = data.title
    ? content.replace(/^\s*#\s+.+\n+/, '')
    : content
  const date =
    data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : (data.date ?? '1970-01-01')
  return {
    ...data,
    slug,
    title: data.title ?? slug,
    date,
    description: data.description ?? '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    readingTime: data.readingTime,
    draft: data.draft === true,
    content: body,
  }
}

export function getAllDocs(dir: string): DocMeta[] {
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
  const docs = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const doc = readDoc(dir, slug)
      if (!doc) return null
      const { content: _content, ...meta } = doc
      return meta
    })
    .filter((p): p is DocMeta => p !== null)
    .filter((p) => process.env.NODE_ENV === 'development' || !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return docs
}

export function getDocBySlug(dir: string, slug: string): Doc | null {
  return readDoc(dir, slug)
}

export function getSlugs(dir: string): string[] {
  return getAllDocs(dir).map((p) => p.slug)
}

export function formatDocDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
