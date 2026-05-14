import Link from 'next/link'
import { flagshipProjects } from '@/lib/projects'

export default function FlagshipGrid() {
  return (
    <section id="work" className="border-t border-border/60 py-20 md:py-28">
      <div className="container-page">
        <header className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="label mb-3">01 · flagship systems</p>
            <h2 className="font-sans text-3xl font-semibold tracking-tight md:text-4xl">
              Things I&apos;ve shipped.
            </h2>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {flagshipProjects.map((p) => {
            const external = !p.bespoke
            const Wrapper = ({ children }: { children: React.ReactNode }) =>
              external ? (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-ring group block h-full rounded-lg border border-border bg-surface p-8 no-underline"
                >
                  {children}
                </a>
              ) : (
                <Link
                  href={p.href}
                  className="glow-ring group block h-full rounded-lg border border-border bg-surface p-8 no-underline"
                >
                  {children}
                </Link>
              )

            return (
              <Wrapper key={p.slug}>
                <div className="flex items-center justify-between">
                  {p.badge && (
                    <span className="label rounded-sm border border-border px-2 py-0.5">
                      {p.badge}
                    </span>
                  )}
                  <span className="font-mono text-2xs text-subtle transition-colors group-hover:text-accent">
                    {external ? '↗' : '→'}
                  </span>
                </div>
                <h3 className="mt-6 font-sans text-xl font-semibold tracking-tight text-text md:text-2xl">
                  {p.name}
                </h3>
                <p className="mt-2 text-[15px] leading-snug text-muted">
                  {p.tagline}
                </p>
                <p className="mt-5 text-[14px] leading-relaxed text-text/70">
                  {p.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-2xs text-subtle"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Wrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
