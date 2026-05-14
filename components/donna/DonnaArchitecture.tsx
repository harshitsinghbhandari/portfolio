'use client'

import { motion } from 'framer-motion'

const stages = [
  {
    num: '01',
    title: 'Capture',
    body: 'Voice prompts, screen frames, Discord drops. High-frequency, lossy by design.',
  },
  {
    num: '02',
    title: 'Durable log',
    body: 'Discord channels become the append-only source of truth. Nothing else writes them.',
  },
  {
    num: '03',
    title: 'Compile',
    body: 'Gemini reads the log and emits structured markdown briefings — frontmatter + body.',
  },
  {
    num: '04',
    title: 'Consume',
    body: 'Hermes (and you) read the briefings. Every claim cites a Discord message id.',
  },
]

export default function DonnaArchitecture() {
  return (
    <section className="border-t border-border/60 py-20 md:py-28">
      <div className="container-page">
        <header className="mb-14 max-w-2xl">
          <p className="label mb-3">02 · architecture</p>
          <h2 className="font-sans text-3xl font-semibold tracking-tight md:text-4xl">
            One pipeline. Four layers.
          </h2>
          <p className="mt-4 text-muted">
            The same shape Donna shares with Study Buddy, Moodle, and
            discord-archive: capture → log → compile → consume. Each layer is
            its own tool. The interfaces between them are just files and text.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
          {stages.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="bg-surface p-6 md:p-8"
            >
              <p className="label mb-4">{s.num}</p>
              <h3 className="font-sans text-lg font-semibold tracking-tight text-text">
                {s.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>

        <pre className="mt-10 overflow-x-auto rounded-lg border border-border bg-surface p-6 font-mono text-[13px] leading-[1.75] text-text/80">
{`voice · screen · discord  →  channels  →  gemini  →  briefings.md  →  hermes
   capture (lossy)         durable log    compile      artifacts      consume`}
        </pre>
      </div>
    </section>
  )
}
