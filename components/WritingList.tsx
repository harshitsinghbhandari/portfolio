import Link from 'next/link'
import Reveal from './Reveal'
import { formatPostDate, getAllPosts } from '@/lib/writing'

export default function WritingList() {
  const posts = getAllPosts().slice(0, 4)
  if (posts.length === 0) return null
  return (
    <section id="writing" className="container-page py-24 md:py-32">
      <p className="label mb-10">WRITING</p>
      <ul className="border-t border-border">
        {posts.map((post, i) => (
          <li key={post.slug} className="border-b border-border">
            <Reveal delay={i * 0.04}>
              <Link
                href={`/writing/${post.slug}`}
                className="group grid grid-cols-1 gap-2 py-8 no-underline md:grid-cols-[160px_1fr] md:items-baseline md:gap-8"
              >
                <span className="font-mono text-2xs text-subtle">{formatPostDate(post.date)}</span>
                <div className="max-w-[68ch]">
                  <h3 className="font-display text-title text-text transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="mt-2 font-sans text-base leading-relaxed text-muted">{post.description}</p>
                  )}
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Link href="/writing" className="font-mono text-2xs uppercase tracking-[0.14em] text-accent no-underline hover:underline underline-offset-4">
          all writing →
        </Link>
      </div>
    </section>
  )
}
