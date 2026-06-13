import Link from 'next/link'
import { formatPostDate, getAllPosts } from '@/lib/writing'

export default function NotesPreview() {
  const posts = getAllPosts().slice(0, 3)
  if (posts.length === 0) return null

  return (
    <section id="writing" className="relative px-6 py-32 md:px-10 md:py-48">
      <p className="label mb-6">WRITING</p>
      <h2 className="font-display text-section -ml-[1vw] mb-16">NOTES</h2>

      <ul className="border-t border-border">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-border">
            <Link
              href={`/writing/${post.slug}`}
              className="group grid grid-cols-1 gap-3 px-2 py-10 no-underline md:grid-cols-[180px_1fr] md:items-baseline md:gap-10 md:py-14"
            >
              <span className="font-mono text-2xs text-muted">
                {formatPostDate(post.date)}
              </span>
              <div>
                <h3 className="font-display text-[clamp(28px,3.5vw,56px)] leading-[1.04] tracking-[-0.03em] text-text transition-colors group-hover:text-accent">
                  {post.title}
                </h3>
                {post.description && (
                  <p className="mt-4 max-w-2xl text-base leading-[1.6] text-muted">
                    {post.description}
                  </p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <Link
          href="/writing"
          className="font-mono text-2xs text-muted no-underline transition-colors hover:text-accent"
        >
          → all writing
        </Link>
      </div>
    </section>
  )
}
