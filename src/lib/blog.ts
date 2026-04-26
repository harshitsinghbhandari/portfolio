import { parse as parseYaml } from 'yaml'

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  content: string
  draft: boolean
}

interface RawFrontmatter {
  title?: string
  date?: string
  description?: string
  tags?: string[]
  draft?: boolean
}

function parseFrontmatter(raw: string): { data: RawFrontmatter; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }
  // Strip leading h1 if it duplicates the frontmatter title
  let content = match[2].trim()
  const data = parseYaml(match[1]) as RawFrontmatter
  if (data.title) {
    content = content.replace(/^# .+\n*/, '')
  }
  return { data, content }
}

const modules = import.meta.glob('/content/blogs/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const posts: BlogPost[] = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '')
    const { data, content } = parseFrontmatter(raw)
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? '1970-01-01',
      description: data.description ?? '',
      tags: data.tags ?? [],
      content,
      draft: data.draft ?? false,
    }
  })
  .filter((post) => import.meta.env.DEV || !post.draft)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export function getAllPosts(): BlogPost[] {
  return posts
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}
