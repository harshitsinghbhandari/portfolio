import type { Metadata } from 'next'
import PostList from '@/components/PostList'
import { feedAlternates } from '@/lib/person'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Notes on building agents, local-first AI, and the systems that hold them up.',
  alternates: { canonical: '/writing', types: feedAlternates },
}

export default function WritingIndexPage() {
  return (
    <div className="container-page pb-24 pt-10 md:pt-14">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-text">Writing</h1>
        <p className="mt-3 text-muted">
          Notes on agents, local-first AI, and the systems that hold them up. Mostly
          debugging stories.
        </p>
      </header>
      <PostList />
    </div>
  )
}
