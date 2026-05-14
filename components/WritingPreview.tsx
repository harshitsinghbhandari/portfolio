import Link from 'next/link'
import { formatPostDate, getAllPosts } from '@/lib/writing'

export default function WritingPreview() {
  const posts = getAllPosts().slice(0, 3)

  return (
    <section className="border-t border-border/60 py-20 md:py-28">
      <div className="container-page">
        <header className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="label mb-3">02 · writing</p>
            <h2 className="font-sans text-3xl font-semibold tracking-tight md:text-4xl">
              Notes from the build.
            </h2>
          </div>
          <Link
            href="/writing"
            className="font-mono text-2xs text-muted no-underline transition-colors hover:text-text"
          >
            all posts →
          </Link>
        </header>

        {posts.length === 0 ? (
          <p className="text-muted">No posts yet.</p>
        ) : (
          <ul className="divide-y divide-border border-y border-border">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/writing/${post.slug}`}
                  className="group block py-6 no-underline transition-colors hover:bg-white/[0.015] md:py-8"
                >
                  <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
                    <p className="label md:w-44 md:shrink-0">
                      {formatPostDate(post.date)}
                    </p>
                    <div className="flex-1">
                      <h3 className="font-sans text-lg font-semibold tracking-tight text-text transition-colors group-hover:text-accent md:text-xl">
                        {post.title}
                      </h3>
                      <p className="mt-1 text-[14px] leading-relaxed text-muted">
                        {post.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
