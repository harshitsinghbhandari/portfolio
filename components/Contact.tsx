import Reveal from './Reveal'

const socials = [
  { label: 'github', href: 'https://github.com/harshitsinghbhandari' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/harshitsinghbhandari/' },
  { label: 'x', href: 'https://x.com/HSBhandari955' },
]

export default function Contact() {
  return (
    <section id="contact" className="container-page py-24 md:py-40">
      <Reveal>
        <p className="label mb-8"><span className="accent-dot" />CONTACT</p>
        <p className="max-w-[60ch] font-display text-section text-text">
          Open to internships in agent infrastructure, local-first AI, and OS-level systems.
        </p>
        <a
          href="mailto:harshitsingh@iitb.ac.in"
          className="mt-8 inline-block font-display text-title text-accent no-underline hover:underline underline-offset-4"
        >
          harshitsingh@iitb.ac.in →
        </a>
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="font-mono text-2xs uppercase tracking-[0.14em] text-muted no-underline transition-colors hover:text-text">
                {s.label} →
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-10 font-mono text-2xs text-subtle">Based in Mumbai.</p>
      </Reveal>
    </section>
  )
}
