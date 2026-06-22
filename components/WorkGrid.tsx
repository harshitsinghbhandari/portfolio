'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

type Tile = {
  index: string
  category: string
  name: string
  tagline: string
  href: string
  image?: string
  imageAlt: string
  fallbackGradient: string
}

const tiles: Tile[] = [
  {
    index: '01',
    category: 'AGENT INFRASTRUCTURE',
    name: 'Agent Orchestrator',
    tagline:
      '#1 contributor, 7,500★. Deterministic backend state for parallel agent workflows. github.com/AgentWrapper/agent-orchestrator',
    href: 'https://github.com/AgentWrapper/agent-orchestrator',
    image: '/hero/ao-board.png',
    imageAlt: 'Agent Orchestrator board with parallel agent sessions',
    fallbackGradient: 'from-accent/20 via-bg to-bg',
  },
]

export default function WorkGrid() {
  return (
    <section id="work" className="relative px-6 py-32 md:px-10 md:py-48">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="font-display text-section -ml-[1vw] mb-16"
      >
        WORK
      </motion.h2>

      <div className="flex flex-col gap-6">
        {tiles.map((tile, i) => (
          <motion.div
            key={tile.index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
          >
            <Link
              href={tile.href}
              target={tile.href.startsWith('http') ? '_blank' : undefined}
              rel={tile.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group relative block w-full overflow-hidden rounded-md border border-border bg-surface no-underline h-[520px] md:h-[clamp(480px,56vw,720px)]"
            >
              {tile.image ? (
                <Image
                  src={tile.image}
                  alt={tile.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 90vw"
                  style={{
                    maskImage:
                      'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.35) 78%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage:
                      'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.35) 78%, rgba(0,0,0,0) 100%)',
                  }}
                  className="object-cover opacity-70 transition-all duration-500 group-hover:scale-[1.02] group-hover:opacity-95"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-gradient-to-br ${tile.fallbackGradient}`}
                />
              )}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
                <p className="label mb-3">
                  {tile.index} · {tile.category}
                </p>
                <h3 className="font-display text-[clamp(40px,5vw,80px)] leading-[1.02] tracking-[-0.03em]">
                  {tile.name}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-[1.6] text-muted md:text-base">
                  {tile.tagline}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-2xs text-accent transition-transform group-hover:translate-x-1">
                  → view repo
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

    </section>
  )
}
