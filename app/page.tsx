import type { Metadata } from 'next'
import Link from 'next/link'
import PostList from '@/components/PostList'
import { PROJECTS } from '@/lib/work'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Harshit Singh',
  url: 'https://theharshitsingh.com',
  image: 'https://theharshitsingh.com/hsb.jpg',
  email: 'mailto:harshitsingh@iitb.ac.in',
  jobTitle: 'Systems and AI infrastructure engineer',
  affiliation: {
    '@type': 'CollegeOrUniversity',
    name: 'Indian Institute of Technology Bombay',
  },
  sameAs: [
    'https://github.com/harshitsinghbhandari',
    'https://www.linkedin.com/in/harshitsinghbhandari/',
    'https://x.com/the_hsbhandari',
  ],
}

const projects = PROJECTS.filter((p) => p.kind === 'case')

export default function HomePage() {
  return (
    <div className="container-page pb-24 pt-12 md:pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />

      <section>
        <h1 className="text-4xl font-bold tracking-tight text-text md:text-5xl">
          Harshit Singh
        </h1>
        <p className="mt-3 text-muted">Systems &amp; AI infrastructure · IIT Bombay</p>

        <div className="mt-8 space-y-5 text-[16px] leading-[1.75] text-text/85">
          <p>
            I keep{' '}
            <Link
              href="/work/agent-orchestrator"
              className="text-accent no-underline hover:underline underline-offset-4"
            >
              Agent Orchestrator
            </Link>
            , an 8,000+ star system for running many coding agents in parallel, shipping
            and coherent. I work on backend reliability and backward compatibility, and on
            making sure what we ship integrates correctly and reaches end users.
          </p>
          <p>
            The rest of my time goes to local-first AI: agents with native OS capability
            that keep your data on your machine, and the safety rails that make them
            trustworthy. I would rather write the execution environment than one more
            wrapper. Third-year IEOR at IIT Bombay, open to internships in agent
            infrastructure and OS-level systems.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-text">Writing</h2>
          <Link
            href="/writing"
            className="text-sm text-muted no-underline transition-colors hover:text-text"
          >
            View all →
          </Link>
        </div>
        <PostList limit={5} />
      </section>

      <section className="mt-16">
        <h2 className="mb-4 text-lg font-semibold tracking-tight text-text">Projects</h2>
        <ul className="divide-y divide-border border-t border-border">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link href={p.href} className="group block py-5 no-underline">
                <h3 className="font-medium text-text transition-colors group-hover:text-accent">
                  {p.name}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
                  {p.whatItIs}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
