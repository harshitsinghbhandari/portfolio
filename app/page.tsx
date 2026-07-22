import type { Metadata } from 'next'
import { SITE_URL, PERSON_ID, personLd } from '@/lib/person'

export const metadata: Metadata = {
  description:
    'Harshit Singh (Harshit Singh Bhandari) builds systems, agents, and a bet that software should be personal. IEOR undergrad at IIT Bombay.',
  alternates: { canonical: '/' },
}

const homeLd = {
  '@context': 'https://schema.org',
  '@graph': [
    personLd,
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Harshit Singh',
      description:
        'Personal site of Harshit Singh Bhandari: systems, agents, and a bet that software should be personal.',
      publisher: { '@id': PERSON_ID },
    },
  ],
}

export default function HomePage() {
  return (
    <div className="container-page pb-24 pt-12 md:pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeLd) }}
      />
      <section>
        <h1 className="text-4xl font-bold tracking-tight text-text md:text-5xl">
          Harshit Singh
        </h1>
        <div className="mt-8 space-y-5 text-[16px] leading-[1.75] text-text/85">
          <p>
            Hi, I am Harshit Singh Bhandari. I am currently in my pre-final year at IIT
            Bombay. I am studying Industrial Engineering and Operations Research. I like to
            personalize OSS tools to how I want them.
          </p>
          <p>
            I also handle the release process on Agent Orchestrator (8,000+ stars). I
            believe I make good judgement calls given the data and conditions. I am
            exploring what to point that on.
          </p>
        </div>
      </section>
    </div>
  )
}
