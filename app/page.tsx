import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Socials from '@/components/Socials'
import PostList from '@/components/PostList'

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
    'https://x.com/HSBhandari955',
  ],
}

const link = 'text-accent no-underline hover:underline underline-offset-4'

export default function HomePage() {
  return (
    <div className="container-page pb-24 pt-10 md:pt-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />

      <section className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full sm:h-32 sm:w-32">
          <Image
            src="/hsb.jpg"
            alt="Harshit Singh"
            fill
            sizes="128px"
            className="object-cover"
            priority
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text md:text-4xl">
            Hi, I&apos;m Harshit Singh.
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted md:text-base">
            Agent infrastructure · local-first AI · OS-level systems · building in public
          </p>
          <div className="mt-5">
            <Socials />
          </div>
        </div>
      </section>

      <div className="mt-14 space-y-5 text-[16px] leading-[1.75] text-text/85">
        <p>
          I keep{' '}
          <Link href="/work/agent-orchestrator" className={link}>
            Agent Orchestrator
          </Link>{' '}
          shipping and coherent: an open-source system for running many coding agents in
          parallel on your codebase, at around 7,600 stars. I am its release owner and a top
          contributor. I hold the npm publish token and own end-to-end correctness on a
          ground-up rewrite while live installs keep working.
        </p>
        <p>
          Outside of that I build local-first AI: agents with native OS capability that keep
          your data on your machine.{' '}
          <Link href="/work/donna" className={link}>
            Donna
          </Link>{' '}
          watches my screen and messages, builds a private searchable memory, and answers on
          demand, all on device.{' '}
          <Link href="/work/aegis" className={link}>
            Aegis
          </Link>{' '}
          gates real OS actions behind risk tiers and biometric confirmation. I would rather
          write the execution environment and the safety rails than one more wrapper.
        </p>
        <p>
          I am a third-year IEOR student at IIT Bombay. I am open to internships in agent
          infrastructure, local-first AI, and OS-level systems. I write here because thinking
          in public is the honest way to work things out.
        </p>
      </div>

      <section className="mt-20">
        <div className="mb-6 flex items-baseline justify-between">
          <p className="label">Recent posts</p>
          <Link
            href="/writing"
            className="text-sm text-muted no-underline transition-colors hover:text-text"
          >
            View all →
          </Link>
        </div>
        <PostList limit={5} />
      </section>
    </div>
  )
}
