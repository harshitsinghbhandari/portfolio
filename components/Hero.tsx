import Link from 'next/link'
import Reveal from './Reveal'

export default function Hero() {
  return (
    <section className="container-page flex min-h-[88svh] flex-col justify-center pt-24 pb-16">
      <Reveal>
        <p className="label mb-6">
          <span className="accent-dot" />
          Systems &amp; AI infrastructure · IIT Bombay
        </p>
        <h1 className="font-display text-hero max-w-[16ch]">
          I keep a 7,600-star multi-agent system shipping and coherent. I write the
          low-level execution environments and safety rails that make autonomous agents
          reliable.
        </h1>
        <p className="mt-8 max-w-[62ch] font-sans text-base leading-relaxed text-muted md:text-lg">
          Third-year IEOR at IIT Bombay. Local-first AI and ambient intelligence: agents
          with native OS capability, without the cloud. Open to internships in agent
          infrastructure and OS-level systems.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-2xs uppercase tracking-[0.14em]">
          <a href="https://github.com/AgentWrapper/agent-orchestrator" target="_blank" rel="noopener noreferrer" className="text-accent no-underline hover:underline underline-offset-4">Agent Orchestrator →</a>
          <a href="https://github.com/harshitsinghbhandari" target="_blank" rel="noopener noreferrer" className="text-muted no-underline transition-colors hover:text-text">GitHub →</a>
          <Link href="/writing" className="text-muted no-underline transition-colors hover:text-text">Writing →</Link>
        </div>
      </Reveal>
    </section>
  )
}
