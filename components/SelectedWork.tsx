import Link from 'next/link'
import Reveal from './Reveal'
import { PROJECTS, type Project } from '@/lib/work'

const linkLabel = (kind: Project['kind']) =>
  kind === 'case' ? 'case study →' : kind === 'demo' ? 'live demo →' : 'repo →'

function isExternal(href: string) {
  return href.startsWith('http')
}

export default function SelectedWork() {
  const featured = PROJECTS.filter((p) => p.featured)
  const also = PROJECTS.filter((p) => !p.featured)

  return (
    <section id="work" className="container-page py-24 md:py-32">
      <p className="label mb-10">SELECTED WORK</p>
      <div className="border-t border-border">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05}>
            <Link
              href={p.href}
              target={isExternal(p.href) ? '_blank' : undefined}
              rel={isExternal(p.href) ? 'noopener noreferrer' : undefined}
              className="group grid grid-cols-1 gap-4 border-b border-border py-10 no-underline md:grid-cols-[3rem_1fr] md:gap-8 md:py-12"
            >
              <span className="font-mono text-2xs text-subtle">{p.index}</span>
              <div className="max-w-[70ch]">
                <p className="label mb-3">{p.category}</p>
                <h3 className="font-display text-title text-text transition-colors group-hover:text-accent">
                  {p.name}
                </h3>
                <p className="mt-3 font-sans text-base leading-relaxed text-muted">{p.whatItIs}</p>
                <p className="mt-3 font-sans text-sm leading-relaxed text-subtle">{p.proof}</p>
                <p className="mt-4 font-display italic text-lg text-text/80">{p.idea}</p>
                <span className="mt-5 inline-block font-mono text-2xs uppercase tracking-[0.14em] text-accent">
                  {linkLabel(p.kind)}
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <ul className="mt-10 flex flex-col gap-3">
        {also.map((p) => (
          <li key={p.slug}>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-wrap items-baseline gap-x-3 font-mono text-2xs uppercase tracking-[0.12em] text-muted no-underline"
            >
              <span className="text-subtle">{p.name}</span>
              <span className="text-subtle/70 normal-case tracking-normal font-sans text-sm group-hover:text-muted">
                {p.whatItIs}
              </span>
              <span className="text-accent">repo →</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
