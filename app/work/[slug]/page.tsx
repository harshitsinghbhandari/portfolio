import type { Metadata } from 'next'
import Link from 'next/link'
import path from 'node:path'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getDocBySlug, getSlugs, formatDocDate } from '@/lib/content'

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
    alternates: { canonical: `/work/${params.slug}` },
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
  const stack = doc.stack as string | undefined
  const repo = doc.repo as string | undefined

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: doc.title,
    description: doc.description,
    datePublished: doc.date,
    dateModified: doc.date,
    author: { '@type': 'Person', name: 'Harshit Singh', url: 'https://theharshitsingh.com' },
    url: `https://theharshitsingh.com/work/${doc.slug}`,
    image: `https://theharshitsingh.com/work/${doc.slug}/opengraph-image`,
  }

  return (
    <article className="container-page pt-24 pb-24 md:pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="mx-auto w-full max-w-[920px] lg:max-w-[980px]">
        <Link href="/#work" className="label inline-flex items-center gap-2 no-underline transition-colors hover:text-text">
          <span aria-hidden="true">←</span> back to work
        </Link>
        <header className="mt-10 mb-12">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {category && <span className="label">{category}</span>}
            {status && (<><span className="label">·</span><span className="label">{status}</span></>)}
          </div>
          <h1 className="mt-5 font-display text-section text-text">{doc.title}</h1>
          <p className="mt-4 max-w-[760px] text-lg leading-relaxed text-muted">{doc.description}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1 font-mono text-2xs text-subtle">
            {role && <span>ROLE: {role}</span>}
            {stack && <span>STACK: {stack}</span>}
            {repo && (
              <a href={repo} target="_blank" rel="noopener noreferrer" className="text-accent no-underline hover:underline underline-offset-4">
                REPO →
              </a>
            )}
          </div>
          <div className="hairline mt-10" />
        </header>
        <div className="prose-writing">
          <MDXRemote source={doc.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </div>
      </div>
    </article>
  )
}
