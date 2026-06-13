'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Pane = {
  eyebrow: string
  headlinePrefix: string
  rotatingWords: string[]
  headlineSuffix: string
  body: string
}

const panes: Pane[] = [
  {
    eyebrow: "I'M HARSHIT SINGH",
    headlinePrefix: 'I build ',
    rotatingWords: ['agents', 'systems', 'rails', 'orchestrators'],
    headlineSuffix: ' that stay reliable in the dark.',
    body: 'Low-level execution environments and safety rails that make autonomous agents trustworthy. My thesis is ambient intelligence — voice, screen, memory — without giving any of it to the cloud.',
  },
  {
    eyebrow: 'BUILDING WHAT MATTERS',
    headlinePrefix: 'Infrastructure for ',
    rotatingWords: ['autonomy', 'agents', 'execution', 'privacy'],
    headlineSuffix: ', not wrappers.',
    body: 'Wrappers are easy. The infrastructure underneath — deterministic state, parallel execution, native OS capability, safety rails — is where reliability is decided. That is where I want to be.',
  },
  {
    eyebrow: 'IIT BOMBAY · IEOR · CLASS OF 2028',
    headlinePrefix: 'Fluent in ',
    rotatingWords: ['Rust', 'Python', 'TypeScript', 'macOS', 'Linux'],
    headlineSuffix: '.',
    body: 'Third-year IEOR at IIT Bombay. Open to internships in agent infrastructure, local-first AI, and OS-level systems work.',
  },
]

export default function AboutSplit() {
  const [active, setActive] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const pane = panes[active]

  useEffect(() => {
    setWordIndex(0)
    const id = setInterval(() => {
      setWordIndex((w) => (w + 1) % pane.rotatingWords.length)
    }, 1800)
    return () => clearInterval(id)
  }, [pane])

  return (
    <section
      id="about"
      className="relative grid min-h-[100svh] grid-cols-1 md:grid-cols-2"
    >
      <div className="relative h-[60vh] overflow-hidden md:h-auto">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-accent/20 via-bg to-bg"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-[clamp(120px,18vw,260px)] leading-none text-white/[0.04]">
            H
          </span>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-bg/60 md:to-bg"
        />
      </div>

      <div className="relative flex flex-col justify-center px-6 py-20 md:px-16 md:py-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="max-w-xl"
          >
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="label mb-6"
            >
              <span className="accent-dot" />
              {pane.eyebrow}
            </motion.p>
            <h2 className="font-display text-[clamp(36px,5vw,68px)] leading-[1.04] tracking-[-0.03em]">
              {pane.headlinePrefix}
              <span className="relative inline-block align-baseline">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0, y: 24, rotateX: -60 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -24, rotateX: 60 }}
                    transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                    className="inline-block italic text-accent"
                  >
                    {pane.rotatingWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              {pane.headlineSuffix}
            </h2>
            <p className="mt-8 text-[clamp(15px,1.3vw,18px)] leading-[1.7] text-muted">
              {pane.body}
            </p>
          </motion.div>
        </AnimatePresence>

        <div
          className="mt-12 flex gap-3 md:absolute md:right-8 md:top-1/2 md:mt-0 md:flex-col md:-translate-y-1/2"
          role="tablist"
          aria-label="About sections"
        >
          {panes.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`Pane ${i + 1} of ${panes.length}`}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                active === i
                  ? 'w-8 bg-accent'
                  : 'w-2 bg-muted/40 hover:bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
