import type { Metadata } from 'next'
import Link from 'next/link'
import path from 'node:path'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getDocBySlug, getSlugs, formatDocDate } from '@/lib/content'
import { SITE_URL, personRef, feedAlternates } from '@/lib/person'

const WORK_DIR = path.join(process.cwd(), 'content', 'work')

interface WorkPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return getSlugs(WORK_DIR).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: WorkPageProps): Metadata {
  const doc = getDocBySlug(WORK_DIR, params.slug)
  if (!doc) return {}
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/work/${params.slug}`, types: feedAlternates },
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: 'article',
      url: `/work/${params.slug}`,
    },
    twitter: { card: 'summary_large_image', title: doc.title, description: doc.description },
  }
}

export default function WorkPage({ params }: WorkPageProps) {
  const doc = getDocBySlug(WORK_DIR, params.slug)
  if (!doc) notFound()
  const category = doc.category as string | undefined
  const status = doc.status as string | undefined
  const role = doc.role as string | undefined
  const repo = doc.repo as string | undefined

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: doc.title,
    description: doc.description,
    datePublished: doc.date,
    dateModified: doc.date,
    author: personRef,
    url: `${SITE_URL}/work/${doc.slug}`,
    image: `${SITE_URL}/work/${doc.slug}/opengraph-image`,
  }

  return (
    <article className="container-page pb-24 pt-10 md:pt-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Link href="/" className="text-sm text-muted no-underline transition-colors hover:text-text">
        ← Home
      </Link>
      <header className="mb-10 mt-8">
        <h1 className="font-mono text-2xl font-bold leading-snug tracking-tight text-text md:text-3xl">
          {doc.title}
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">{doc.description}</p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-subtle">
          {category && <span>{category}</span>}
          {status && <span>{status}</span>}
          {role && <span>{role}</span>}
          {repo && (
            <a href={repo} target="_blank" rel="noopener noreferrer" className="text-accent no-underline hover:underline underline-offset-4">
              repo →
            </a>
          )}
        </div>
      </header>
      <div className="prose-writing">
        <MDXRemote source={doc.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </div>
    </article>
  )
}
