import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  readingTime?: string
  draft?: boolean
}

export interface Post extends PostMeta {
  content: string
}

const WRITING_DIR = path.join(process.cwd(), 'content', 'writing')

function readPostFile(slug: string): Post | null {
  const filePath = path.join(WRITING_DIR, `${slug}.mdx`)
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

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(WRITING_DIR)) return []
  const files = fs.readdirSync(WRITING_DIR).filter((f) => f.endsWith('.mdx'))
  const posts = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const post = readPostFile(slug)
      if (!post) return null
      const { content: _content, ...meta } = post
      return meta
    })
    .filter((p): p is PostMeta => p !== null)
    .filter((p) => process.env.NODE_ENV === 'development' || !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return posts
}

export function getPostBySlug(slug: string): Post | null {
  return readPostFile(slug)
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug)
}

export function formatPostDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
