'use client'

import { motion } from 'framer-motion'

const features = [
  {
    icon: 'voice',
    title: 'Voice',
    body: 'Whisper-grade transcription, on-device. Hold a hotkey, talk, release. The transcript lands in your local archive — no API call, no cloud bucket.',
  },
  {
    icon: 'screen',
    title: 'Screen',
    body: 'Delta-based screenshot streaming. Donna only sees what changed. Optional OCR pipes the diff into the same archive that holds voice and chat.',
  },
  {
    icon: 'text',
    title: 'Text',
    body: 'A Discord channel per signal — #ideas, #screen-summaries, #email-summaries, #moodle-info. Donna treats Discord as the durable append-only log.',
  },
  {
    icon: 'briefing',
    title: 'Briefing',
    body: 'Gemini compiles every channel into a single markdown briefing on demand. Frontmatter, citations, memory-type tags. Drop it into any agent as context.',
  },
]

const Icon = ({ name }: { name: string }) => {
  const common = 'h-5 w-5'
  switch (name) {
    case 'voice':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="9" y="3" width="6" height="12" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3" strokeLinecap="round" />
        </svg>
      )
    case 'screen':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8M12 17v4" strokeLinecap="round" />
        </svg>
      )
    case 'text':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 6h16M4 12h10M4 18h16" strokeLinecap="round" />
        </svg>
      )
    case 'briefing':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 4h11l3 3v13H5z" />
          <path d="M9 12h6M9 16h4" strokeLinecap="round" />
        </svg>
      )
    default:
      return null
  }
}

export default function DonnaFeatures() {
  return (
    <section className="border-t border-border/60 py-20 md:py-28">
      <div className="container-page">
        <header className="mb-14 max-w-2xl">
          <p className="label mb-3">03 · capabilities</p>
          <h2 className="font-sans text-3xl font-semibold tracking-tight md:text-4xl">
            Four inputs. One brain.
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="glow-ring rounded-lg border border-border bg-surface p-7"
            >
              <div className="flex items-center gap-3 text-accent">
                <Icon name={f.icon} />
                <h3 className="font-sans text-lg font-semibold tracking-tight text-text">
                  {f.title}
                </h3>
              </div>
              <p className="mt-4 text-[14.5px] leading-relaxed text-text/75">
                {f.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
