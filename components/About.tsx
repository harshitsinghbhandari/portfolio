import Reveal from './Reveal'

export default function About() {
  return (
    <section id="about" className="container-page py-24 md:py-32">
      <Reveal>
        <p className="label mb-8">ABOUT</p>
        <div className="max-w-[68ch] font-display text-title leading-[1.3] text-text/90">
          I build the infrastructure that gives agents context and lets them execute
          safely. I would rather write the low-level execution environment and the safety
          rails than one more wrapper. My focus is local-first AI: voice, screen, and
          memory that stay on the machine.
        </div>
        <p className="mt-8 max-w-[62ch] font-sans text-base leading-relaxed text-muted">
          Third-year IEOR at IIT Bombay, class of 2028. Top human contributor and release
          owner on Agent Orchestrator. Building Donna and Aegis on the side.
        </p>
        <p className="mt-6 font-mono text-2xs uppercase tracking-[0.14em] text-subtle">
          NOW: agent reliability, local-first execution, OS-level safety rails.
        </p>
      </Reveal>
    </section>
  )
}
