import Link from 'next/link'
import { formatPostDate, getAllPosts } from '@/lib/writing'

export default function PostList({ limit }: { limit?: number }) {
  const posts = limit ? getAllPosts().slice(0, limit) : getAllPosts()
  if (posts.length === 0) return <p className="text-muted">No posts yet.</p>

  return (
    <ul className="divide-y divide-border border-y border-border">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/writing/${post.slug}`}
            className="group block py-7 no-underline"
          >
            <h3 className="text-lg font-semibold text-text transition-colors group-hover:text-accent">
              {post.title}
            </h3>
            <p className="mt-1.5 font-mono text-2xs normal-case tracking-normal text-subtle">
              {formatPostDate(post.date)}
              {post.readingTime ? ` · ${post.readingTime}` : ''}
            </p>
            {post.description && (
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                {post.description}
              </p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
