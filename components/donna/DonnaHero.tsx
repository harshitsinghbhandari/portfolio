'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function DonnaHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-accent/15 blur-[160px]"
      />

      <div className="container-page relative pt-24 pb-16 md:pt-32 md:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="label mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          flagship · 2am cli
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="font-sans text-[clamp(48px,9vw,108px)] font-semibold leading-[0.95] tracking-[-0.035em]"
        >
          Donna
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 max-w-2xl text-[clamp(18px,2vw,24px)] leading-snug text-muted"
        >
          A local-first macOS assistant. Listens, watches, remembers — and
          compiles 2am idea dumps into structured briefings.{' '}
          <span className="text-text">No cloud account. No app store.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <Link
            href="https://github.com/harshitsinghbhandari/donna"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-accent px-5 py-2.5 font-mono text-2xs text-bg no-underline transition-opacity hover:opacity-90"
          >
            Install
          </Link>
          <Link
            href="/writing/donna-briefing-cli"
            className="rounded-md border border-border px-5 py-2.5 font-mono text-2xs text-text no-underline transition-colors hover:border-white/20"
          >
            Read the build log
          </Link>
        </motion.div>

        {/* Terminal frame */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 overflow-hidden rounded-xl border border-border bg-surface shadow-glow"
        >
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="label ml-3">donna · briefing</span>
          </div>
          <pre className="overflow-x-auto px-6 py-6 font-mono text-[13px] leading-[1.75] text-text/85">
{`$ donna brief
→ pulling #ideas from discord (16 new messages)
→ summarizing with gemini-3.1-pro-preview
→ writing briefing to #briefings

# 2026-05-14 · briefing
## what you're chewing on
- repo-mapper: semantic index for composio agent-orchestrator
- discord-archive: promote-memory MCP command
- donna: terminal demo on the portfolio

## next move
ship terminal demo first — it unblocks the whole hero.
the repo-mapper RFC can wait until the weekend.

done · briefing posted to #briefings`}
          </pre>
        </motion.div>
      </div>
    </section>
  )
}
