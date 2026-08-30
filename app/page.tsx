import type { Metadata } from 'next'
import { SITE_DESCRIPTION, SITE_URL, PERSON_ID, personLd } from '@/lib/person'

export const metadata: Metadata = {
  description: SITE_DESCRIPTION,
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
      description: SITE_DESCRIPTION,
      publisher: { '@id': PERSON_ID },
    },
  ],
}

const externalLinkClass =
  'text-accent underline decoration-accent/35 underline-offset-[0.2em] transition-colors hover:text-text hover:decoration-text/45'

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
            I build infrastructure for AI agents, with a focus on making long-running agent
            work persistent, observable, and recoverable.
          </p>
          <p>
            I currently work on{' '}
            <a
              href="https://github.com/Untrivial-ai/agent-orchestrator"
              target="_blank"
              rel="noopener noreferrer"
              className={externalLinkClass}
            >
              Agent Orchestrator
            </a>{' '}
            at{' '}
            <a
              href="https://github.com/Untrivial-ai"
              target="_blank"
              rel="noopener noreferrer"
              className={externalLinkClass}
            >
              Untrivial
            </a>{' '}
            and explore new ideas through{' '}
            <a
              href="https://github.com/agentlab-in"
              target="_blank"
              rel="noopener noreferrer"
              className={externalLinkClass}
            >
              AgentLab
            </a>
            . Outside of that, I study Industrial Engineering and Operations Research at{' '}
            <a
              href="https://www.iitb.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className={externalLinkClass}
            >
              IIT Bombay
            </a>
            .
          </p>
        </div>
      </section>

      <section className="mt-16 md:mt-20" aria-labelledby="explanations-heading">
        <h2 id="explanations-heading" className="label">
          Explanations
        </h2>
        <p className="mt-5 text-[15px] leading-[1.7] text-muted">
          I occasionally publish technical explanations of systems I build, design
          decisions, and ideas around AI agents and infrastructure.
        </p>
        <a href="/explanations" className={`${externalLinkClass} mt-4 inline-block text-sm`}>
          View explanations →
        </a>
      </section>

      <section className="mt-16 md:mt-20" aria-labelledby="selected-work-heading">
        <h2 id="selected-work-heading" className="label">
          Selected Work
        </h2>
        <div className="mt-7 divide-y divide-border">
          <article className="pb-9">
            <h3 className="text-lg font-semibold tracking-tight text-text">
              <a
                href="https://github.com/Untrivial-ai/agent-orchestrator"
                target="_blank"
                rel="noopener noreferrer"
                className={externalLinkClass}
              >
                Agent Orchestrator
              </a>
            </h3>
            <div className="mt-3 space-y-3 text-[15px] leading-[1.7] text-muted">
              <p>
                Agent Orchestrator is a desktop workspace for planning, running, and
                supervising multiple coding agents in parallel.
              </p>
              <p>
                Earlier, I worked on rebuilding its backend and agent execution systems. I
                now work on its User Experience.
              </p>
            </div>
          </article>

          <article className="py-9">
            <h3 className="text-lg font-semibold tracking-tight text-text">
              <a
                href="https://github.com/harshitsinghbhandari/iitb"
                target="_blank"
                rel="noopener noreferrer"
                className={externalLinkClass}
              >
                IITB-CLI
              </a>
            </h3>
            <div className="mt-3 space-y-3 text-[15px] leading-[1.7] text-muted">
              <p>
                IITB-CLI is a simple command-line interface built on top of IIT Bombay’s
                legacy academic portal.
              </p>
              <p>
                I built it to make common academic workflows faster and easier to use
                without navigating through the portal’s dated interface.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="mt-16 md:mt-20" aria-labelledby="agentlab-heading">
        <h2 id="agentlab-heading" className="label">
          AgentLab
        </h2>
        <div className="mt-7 divide-y divide-border">
          <article className="pb-9">
            <h3 className="text-lg font-semibold tracking-tight text-text">
              <a
                href="https://sennight.agentlab.in"
                target="_blank"
                rel="noopener noreferrer"
                className={externalLinkClass}
              >
                Sennight
              </a>
            </h3>
            <div className="mt-3 space-y-3 text-[15px] leading-[1.7] text-muted">
              <p>
                Sennight is a flexible calendar agent that plans my week around time quotas
                instead of fixed schedules.
              </p>
              <p>
                I set how much time I want to spend on each area, report what I actually
                completed through Discord, and it redistributes the remaining work as the
                week changes.
              </p>
            </div>
          </article>

          <article className="py-9">
            <h3 className="text-lg font-semibold tracking-tight text-text">
              <a
                href="https://github.com/agentlab-in/pages"
                target="_blank"
                rel="noopener noreferrer"
                className={externalLinkClass}
              >
                Pages
              </a>
            </h3>
            <div className="mt-3 space-y-3 text-[15px] leading-[1.7] text-muted">
              <p>
                Pages is a one-command way to publish work created by AI agents as a
                shareable website.
              </p>
              <p>
                I built it because local files are awkward to revisit or share, while
                traditional hosting adds unnecessary deployment steps. With{' '}
                <code className="font-mono text-[0.925em] text-text">
                  {'alab pages put {folder}'}
                </code>
                , the folder is published and ready to share.
              </p>
            </div>
          </article>

          <article className="pt-9">
            <h3 className="text-lg font-semibold tracking-tight text-text">
              <a
                href="https://github.com/agentlab-in/hosted-ao"
                target="_blank"
                rel="noopener noreferrer"
                className={externalLinkClass}
              >
                Hosted AO
              </a>
            </h3>
            <div className="mt-3 space-y-3 text-[15px] leading-[1.7] text-muted">
              <p>Hosted AO extends Agent Orchestrator beyond a single machine.</p>
              <p>
                I built it to connect and manage multiple cloud or local-network machines
                from one place. A machine can be added using its IP address and then used to
                run Agent Orchestrator remotely.
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
