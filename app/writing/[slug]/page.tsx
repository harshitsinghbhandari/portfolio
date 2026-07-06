import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { formatPostDate, getAllSlugs, getPostBySlug } from '@/lib/writing'

interface PostPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: PostPageProps): Metadata {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/writing/${params.slug}` },
    authors: [{ name: 'Harshit Singh', url: 'https://theharshitsingh.com' }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `/writing/${params.slug}`,
      publishedTime: post.date,
      modifiedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: 'Harshit Singh', url: 'https://theharshitsingh.com' },
    url: `https://theharshitsingh.com/writing/${post.slug}`,
    image: `https://theharshitsingh.com/writing/${post.slug}/opengraph-image`,
    keywords: post.tags.join(', '),
  }

  return (
    <article className="container-page pt-24 pb-24 md:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <div className="mx-auto w-full max-w-[920px] lg:max-w-[980px]">
        <Link
          href="/writing"
          className="label inline-flex items-center gap-2 no-underline transition-colors hover:text-text"
        >
          <span aria-hidden="true">←</span> back to writing
        </Link>

        <header className="mt-10 mb-12">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="label">{formatPostDate(post.date)}</span>
            {post.readingTime && (
              <>
                <span className="label">·</span>
                <span className="label">{post.readingTime}</span>
              </>
            )}
          </div>
          <h1 className="mt-5 font-display text-section text-text">
            {post.title}
          </h1>
          <p className="mt-4 max-w-[760px] text-lg leading-relaxed text-muted">
            {post.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-2xs text-subtle"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="hairline mt-10" />
        </header>

        <div className="prose-writing">
          <MDXRemote
            source={post.content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>

        <div className="hairline mt-20" />
        <div className="mt-10">
          <Link
            href="/writing"
            className="label inline-flex items-center gap-2 no-underline transition-colors hover:text-text"
          >
            <span aria-hidden="true">←</span> more writing
          </Link>
        </div>
      </div>
    </article>
  )
}
