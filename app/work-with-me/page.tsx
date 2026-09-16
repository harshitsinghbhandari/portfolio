import type { Metadata } from 'next'
import { SITE_DESCRIPTION } from '@/lib/person'

export const metadata: Metadata = {
  title: 'Work With Me',
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/work-with-me' },
  openGraph: {
    title: 'Work With Me',
    description: SITE_DESCRIPTION,
    url: '/work-with-me',
  },
}

const areas = [
  {
    title: 'Find where AI actually helps',
    description:
      'Identify workflows where agents can meaningfully reduce manual work. Evaluate feasibility, expected benefits, implementation complexity, operating cost, and where agents do not make sense.',
  },
  {
    title: 'Design the right approach',
    description:
      'Design an AI agent strategy around existing business and engineering workflows, including system design and human-agent collaboration.',
  },
  {
    title: 'Build and integrate',
    description:
      'Build and deploy production agents connected to existing tools, systems, data, and processes.',
  },
  {
    title: 'Make adoption work',
    description:
      'Train teams to work effectively with agents, avoid unreliable automation and unnecessary complexity, and measure whether the system saves time, reduces cost, or improves outcomes.',
  },
]

const engagements = [
  { name: 'Architecture / Technical Review', price: 'From $1,500' },
  { name: 'Implementation Engagement', price: 'From $5,000' },
  { name: 'Ongoing Advisory', price: 'Custom' },
]

const clients = [
  'Engineering-heavy teams in any industry that are ready to use AI agents for real operational work, not demos or hype.',
  'Companies willing to rethink repetitive workflows, reduce redundancy, and give agents proper functions inside the systems they already run.',
]

const process = [
  'Understand the technical problem',
  'Inspect the existing system',
  'Identify architecture / reliability issues',
  'Recommend or implement changes',
  'Leave behind maintainable engineering work',
]

const linkClass =
  'text-accent underline decoration-accent/35 underline-offset-[0.2em] transition-colors hover:text-text hover:decoration-text/45'

export default function WorkWithMePage() {
  return (
    <div className="container-page pb-24 pt-12 md:pt-16">
      <section>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-text md:text-5xl">
          Work With Me
        </h1>
        <p className="mt-7 max-w-2xl text-[17px] leading-[1.75] text-text/85">
          I build infrastructure for AI agents, with a focus on making long-running agent
          work persistent, observable, and recoverable.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-3 text-sm">
          <a
            href="https://cal.com/harshitsinghbhandari/30min"
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkClass} inline-flex min-h-11 items-center font-medium`}
          >
            Book a Call
          </a>
          <span className="text-subtle">or</span>
          <a
            href="mailto:harshit@hsbhandari.com"
            className={`${linkClass} inline-flex min-h-11 items-center font-medium`}
          >
            write to harshit@hsbhandari.com
          </a>
        </div>
      </section>

      <section className="mt-16 border-t border-border pt-10 md:mt-20" aria-labelledby="help-heading">
        <h2 id="help-heading" className="label">
          What I help with
        </h2>
        <div className="mt-7 divide-y divide-border border-y border-border">
          {areas.map((area) => (
            <article key={area.title} className="grid gap-3 py-6 sm:grid-cols-[13rem_1fr] sm:gap-8">
              <h3 className="font-semibold tracking-tight text-text">{area.title}</h3>
              <p className="text-[15px] leading-[1.7] text-muted">{area.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 md:mt-20" aria-labelledby="engagements-heading">
        <h2 id="engagements-heading" className="label">
          Engagements / Pricing
        </h2>
        <div className="mt-7 divide-y divide-border border-y border-border">
          {engagements.map((engagement) => (
            <div
              key={engagement.name}
              className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <h3 className="text-lg font-semibold tracking-tight text-text">
                {engagement.name}
              </h3>
              <p className="shrink-0 text-xs font-medium uppercase tracking-[0.06em] text-muted">
                {engagement.price}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 md:mt-20" aria-labelledby="proof-heading">
        <h2 id="proof-heading" className="label">
          Proof
        </h2>
        <div className="mt-7 divide-y divide-border">
          <article className="pb-8">
            <h3 className="text-lg font-semibold tracking-tight text-text">
              <a
                href="https://github.com/Untrivial-ai/agent-orchestrator"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Agent Orchestrator
              </a>
            </h3>
            <p className="mt-3 text-[15px] leading-[1.7] text-muted">
              Agent Orchestrator is a desktop workspace for planning, running, and
              supervising multiple coding agents in parallel.
            </p>
          </article>
          <article className="py-8">
            <h3 className="text-lg font-semibold tracking-tight text-text">
              <a href="/explanations" className={linkClass}>
                Technical explanations / videos
              </a>
            </h3>
            <p className="mt-3 text-[15px] leading-[1.7] text-muted">
              I occasionally publish technical explanations of systems I build, design
              decisions, and ideas around AI agents and infrastructure.
            </p>
          </article>
          <article className="pt-8">
            <h3 className="text-lg font-semibold tracking-tight text-text">
              <a
                href="https://agentlab.in"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                AgentLab
              </a>
            </h3>
            <p className="mt-3 text-[15px] leading-[1.7] text-muted">
              AgentLab is the umbrella for the projects I build for the AI agents I use.
            </p>
          </article>
        </div>
      </section>

      <section className="mt-16 border-t border-border pt-10 md:mt-20" aria-labelledby="clients-heading">
        <h2 id="clients-heading" className="label">
          Who This Is For
        </h2>
        <ul className="mt-7 space-y-3 text-[15px] leading-[1.7] text-text/85">
          {clients.map((client) => (
            <li key={client} className="flex gap-4">
              <span aria-hidden="true" className="text-accent">
                +
              </span>
              {client}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 md:mt-20" aria-labelledby="process-heading">
        <h2 id="process-heading" className="label">
          How Engagements Work
        </h2>
        <ol className="mt-7 divide-y divide-border border-y border-border">
          {process.map((step, index) => (
            <li key={step} className="grid grid-cols-[2rem_1fr] gap-3 py-4 text-[15px] leading-[1.7] text-text/85">
              <span className="text-xs font-medium text-subtle">{String(index + 1).padStart(2, '0')}</span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16 border-t border-border pt-10 md:mt-20" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="text-2xl font-semibold tracking-tight text-text">
          Work With Me
        </h2>
        <div className="mt-5 flex flex-wrap items-center gap-x-3 text-sm">
          <a
            href="https://cal.com/harshitsinghbhandari/30min"
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkClass} inline-flex min-h-11 items-center font-medium`}
          >
            Book a Call
          </a>
          <span className="text-subtle">or</span>
          <a
            href="mailto:harshit@hsbhandari.com"
            className={`${linkClass} inline-flex min-h-11 items-center font-medium`}
          >
            write to harshit@hsbhandari.com
          </a>
        </div>
      </section>
    </div>
  )
}
