import Link from 'next/link'

export default function ContactCTA() {
  return (
    <section className="border-t border-border/60 py-20 md:py-28">
      <div className="container-page">
        <p className="label mb-4">04 · contact</p>
        <h2 className="font-sans text-3xl font-semibold tracking-tight md:text-5xl">
          Working on something interesting?
          <span className="block text-muted">Tell me about it.</span>
        </h2>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="mailto:harshitsingh@iitb.ac.in"
            className="rounded-md bg-accent px-5 py-2.5 font-mono text-2xs text-bg no-underline transition-opacity hover:opacity-90"
          >
            harshitsingh@iitb.ac.in
          </a>
          <Link
            href="https://github.com/harshitsinghbhandari"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-border px-5 py-2.5 font-mono text-2xs text-text no-underline transition-colors hover:border-white/20"
          >
            github ↗
          </Link>
          <Link
            href="https://linkedin.com/in/harshitsinghbhandari"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-border px-5 py-2.5 font-mono text-2xs text-text no-underline transition-colors hover:border-white/20"
          >
            linkedin ↗
          </Link>
        </div>
      </div>
    </section>
  )
}
