import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { formatPostDate, getAllSlugs, getPostBySlug } from '@/lib/writing'
import { SITE_URL, personRef, feedAlternates } from '@/lib/person'

interface PostPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: PostPageProps): Metadata {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  const metaDescription =
    post.description.length > 155
      ? post.description.slice(0, 152).replace(/\s+\S*$/, '') + '…'
      : post.description
  return {
    title: post.title,
    description: metaDescription,
    alternates: { canonical: `/writing/${params.slug}`, types: feedAlternates },
    authors: [{ name: 'Harshit Singh', url: `${SITE_URL}/about` }],
    openGraph: {
      title: post.title,
      description: metaDescription,
      type: 'article',
      url: `/writing/${params.slug}`,
      publishedTime: post.date,
      modifiedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: metaDescription,
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
    author: personRef,
    url: `${SITE_URL}/writing/${post.slug}`,
    image: `${SITE_URL}/writing/${post.slug}/opengraph-image`,
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
          By{' '}
          <Link href="/about" className="text-subtle underline-offset-4 hover:text-text">
            Harshit Singh
          </Link>
          {' · '}
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
