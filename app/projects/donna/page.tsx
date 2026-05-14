import type { Metadata } from 'next'
import Link from 'next/link'
import DonnaHero from '@/components/donna/DonnaHero'
import DonnaArchitecture from '@/components/donna/DonnaArchitecture'
import DonnaFeatures from '@/components/donna/DonnaFeatures'

export const metadata: Metadata = {
  title: 'Donna — a local-first macOS assistant',
  description:
    'Donna turns 2am idea dumps into structured briefings. Voice, screen, and memory — local-first, no cloud account, no app store.',
  openGraph: {
    title: 'Donna — local-first macOS assistant',
    description:
      'Voice + screen + memory, compiled into briefings. Local-first by design.',
    type: 'article',
  },
}

export default function DonnaPage() {
  return (
    <>
      <DonnaHero />
      <DonnaArchitecture />
      <DonnaFeatures />

      <section className="border-t border-border/60 py-20 md:py-28">
        <div className="container-page mx-auto max-w-prose text-center">
          <p className="label mb-6">04 · philosophy</p>
          <p className="font-sans text-2xl leading-snug tracking-tight text-text md:text-3xl">
            &ldquo;Boring pipelines, durable logs, composable layers.
            <span className="block text-muted">
              It&apos;s boring, which is exactly why it works.&rdquo;
            </span>
          </p>
        </div>
      </section>

      <section className="border-t border-border/60 py-20 md:py-28">
        <div className="container-page text-center">
          <h2 className="font-sans text-3xl font-semibold tracking-tight md:text-4xl">
            Read the build log.
          </h2>
          <p className="mt-4 text-muted">
            How Donna came together — and the bugs that almost broke it.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/writing/donna-briefing-cli"
              className="rounded-md bg-accent px-5 py-2.5 font-mono text-2xs text-bg no-underline transition-opacity hover:opacity-90"
            >
              Read the post →
            </Link>
            <Link
              href="https://github.com/harshitsinghbhandari/donna"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-border px-5 py-2.5 font-mono text-2xs text-text no-underline transition-colors hover:border-white/20"
            >
              View on GitHub ↗
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
