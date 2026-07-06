import Link from 'next/link'
import { getAllPosts } from '@/lib/writing'

function shortDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

export default function PostList({ limit }: { limit?: number }) {
  const posts = limit ? getAllPosts().slice(0, limit) : getAllPosts()
  if (posts.length === 0) return <p className="text-muted">No posts yet.</p>

  return (
    <ul className="divide-y divide-border border-t border-border">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/writing/${post.slug}`}
            className="group block py-5 no-underline"
          >
            <div className="flex items-baseline justify-between gap-6">
              <h3 className="font-medium text-text transition-colors group-hover:text-accent">
                {post.title}
              </h3>
              <span className="shrink-0 font-mono text-xs text-subtle">
                {shortDate(post.date)}
              </span>
            </div>
            {post.description && (
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
                {post.description}
              </p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
