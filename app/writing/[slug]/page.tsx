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
    <article className="container-page pb-24 pt-10 md:pt-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <Link
        href="/writing"
        className="text-sm text-muted no-underline transition-colors hover:text-text"
      >
        ← Writing
      </Link>

      <header className="mb-10 mt-8">
        <h1 className="font-mono text-2xl font-bold leading-snug tracking-tight text-text md:text-3xl">
          {post.title}
        </h1>
        <p className="mt-4 font-mono text-xs text-subtle">
          {formatPostDate(post.date)}
          {post.readingTime ? ` · ${post.readingTime}` : ''}
        </p>
      </header>

      <div className="prose-writing">
        <MDXRemote
          source={post.content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      <div className="hairline mt-16" />
      <div className="mt-8">
        <Link
          href="/writing"
          className="text-sm text-muted no-underline transition-colors hover:text-text"
        >
          ← More writing
        </Link>
      </div>
    </article>
  )
}
