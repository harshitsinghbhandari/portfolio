import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, formatPostDate } from '@/lib/writing'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Notes on building agents, local-first AI, and the systems that hold them up.',
  alternates: { canonical: '/writing' },
}

export default function WritingIndexPage() {
  const posts = getAllPosts()

  return (
    <div className="container-page pt-24 pb-20 md:pt-32">
      <header className="mb-16 md:mb-20">
        <p className="label mb-4">writing</p>
        <h1 className="font-sans text-4xl font-semibold tracking-tight md:text-5xl">
          Notes on building.
        </h1>
        <p className="mt-4 max-w-prose text-muted">
          Long-form notes on agents, local-first AI, and the systems that hold
          them up. Mostly debugging stories.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted">No posts yet.</p>
      ) : (
        <ul className="divide-y divide-border border-y border-border">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/writing/${post.slug}`}
                className="group block py-8 no-underline transition-colors hover:bg-white/[0.015] md:py-10"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                  <div className="flex-1">
                    <p className="label mb-2">{formatPostDate(post.date)}</p>
                    <h2 className="font-sans text-xl font-semibold tracking-tight text-text transition-colors group-hover:text-accent md:text-2xl">
                      {post.title}
                    </h2>
                    <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-muted">
                      {post.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-2xs text-subtle"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {post.readingTime && (
                    <span className="font-mono text-2xs text-subtle md:ml-8">
                      {post.readingTime}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
