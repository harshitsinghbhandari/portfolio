import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, personLd, feedAlternates } from '@/lib/person'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Who Harshit Singh Bhandari is: systems and AI infrastructure engineer, IEOR undergrad at IIT Bombay, release owner of Agent Orchestrator.',
  alternates: { canonical: '/about', types: feedAlternates },
}

const aboutLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/about#profilepage`,
  url: `${SITE_URL}/about`,
  name: 'About Harshit Singh',
  mainEntity: personLd,
}

const footerLinks = [
  { label: 'GitHub', href: 'https://github.com/harshitsinghbhandari' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/harshitsinghbhandari/' },
  { label: 'X', href: 'https://x.com/the_hsbhandari' },
]

export default function AboutPage() {
  return (
    <div className="container-page pb-24 pt-12 md:pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutLd) }}
      />

      <section>
        <h1 className="text-4xl font-bold tracking-tight text-text md:text-5xl">About</h1>

        <div className="mt-8 space-y-5 text-[16px] leading-[1.75] text-text/85">
          <p>
            Harshit Singh Bhandari is a systems and AI infrastructure engineer and a
            third-year Industrial Engineering &amp; Operations Research undergraduate at
            IIT Bombay. Harshit Singh works at the intersection of OS-level systems and
            AI infrastructure, building the low-level execution environments and safety
            rails that let autonomous agents run reliably.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="mb-4 text-lg font-semibold tracking-tight text-text">
          Agent Orchestrator
        </h2>
        <div className="space-y-5 text-[16px] leading-[1.75] text-text/85">
          <p>
            Harshit Singh is the release owner and migration lead of{' '}
            <Link
              href="/work/agent-orchestrator"
              className="text-accent no-underline hover:underline underline-offset-4"
            >
              Agent Orchestrator
            </Link>
            , an 8,000+ star open-source orchestrator for parallel coding agents. He works
            on backend reliability, backward compatibility, and end-to-end correctness on
            a ground-up rewrite.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="mb-4 text-lg font-semibold tracking-tight text-text">
          Personal software
        </h2>
        <div className="space-y-5 text-[16px] leading-[1.75] text-text/85">
          <p>
            Harshit Singh is betting that the best software is forward-deployed to a
            user of one: the user&apos;s opinions shape the UX, an engineer&apos;s
            opinions shape the internals. His side projects are where that bet gets
            tested.
          </p>
          <p>
            <Link
              href="/work/donna"
              className="text-accent no-underline hover:underline underline-offset-4"
            >
              Donna
            </Link>{' '}
            is a macOS assistant that builds retrievable memory from screen and
            messages. Capture and preprocessing run on the machine, and screenshots
            never leave it; the intelligence runs on cloud AI APIs.{' '}
            <Link
              href="/work/aegis"
              className="text-accent no-underline hover:underline underline-offset-4"
            >
              Aegis
            </Link>{' '}
            is a biometric-secured macOS agent that gates real OS actions behind risk
            tiers. The through-line is giving agents native, secure OS capability,
            built for one user at a time.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="mb-4 text-lg font-semibold tracking-tight text-text">Writing</h2>
        <div className="space-y-5 text-[16px] leading-[1.75] text-text/85">
          <p>
            Harshit Singh writes about agents, personal software, and the systems that
            hold them up at{' '}
            <Link
              href="/writing"
              className="text-accent no-underline hover:underline underline-offset-4"
            >
              /writing
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="mb-4 text-lg font-semibold tracking-tight text-text">Contact</h2>
        <div className="space-y-5 text-[16px] leading-[1.75] text-text/85">
          <p>
            Reach Harshit Singh Bhandari by email at{' '}
            <a
              href="mailto:harshitsingh@iitb.ac.in"
              className="text-accent no-underline hover:underline underline-offset-4"
            >
              harshitsingh@iitb.ac.in
            </a>
            , or elsewhere:
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            {footerLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline transition-colors hover:text-text"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
