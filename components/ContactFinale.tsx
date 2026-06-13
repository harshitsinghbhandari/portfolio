'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const socials = [
  { label: 'github', href: 'https://github.com/harshitsinghbhandari' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/harshitsinghbhandari/' },
  { label: 'x', href: 'https://x.com/HSBhandari955' },
]

export default function ContactFinale() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // "GET IN" and "TOUCH" exit fast, opposite directions.
  const xGetIn = useTransform(scrollYProgress, [0.0, 0.25], ['0%', '-120%'])
  const xTouch = useTransform(scrollYProgress, [0.0, 0.25], ['0%', '120%'])
  const titleOpacity = useTransform(scrollYProgress, [0.18, 0.3], [1, 0])

  // Contact takeover — fades up to fill the screen as the title leaves.
  const contactOpacity = useTransform(scrollYProgress, [0.25, 0.5], [0, 1])
  const contactScale = useTransform(scrollYProgress, [0.25, 0.5], [0.9, 1])
  const contactY = useTransform(scrollYProgress, [0.25, 0.5], [60, 0])

  return (
    <section ref={ref} id="contact" className="relative h-[220vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        {/* Layer 1 — splitting title */}
        <motion.div
          style={{ opacity: titleOpacity }}
          className="pointer-events-none absolute inset-0 flex flex-col justify-center"
        >
          <motion.h2
            style={{ x: xGetIn }}
            className="font-display text-finale whitespace-nowrap leading-[0.88] will-change-transform"
          >
            GET IN
          </motion.h2>
          <motion.div
            style={{ x: xTouch }}
            className="font-display text-finale whitespace-nowrap leading-[0.88] text-right will-change-transform"
            aria-hidden="true"
          >
            TOUCH<span className="text-accent">.</span>
          </motion.div>
          <span className="sr-only">Get in touch.</span>
        </motion.div>

        {/* Layer 2 — full-screen contact */}
        <motion.div
          style={{ opacity: contactOpacity, scale: contactScale, y: contactY }}
          className="relative z-10 flex h-full flex-col justify-center px-6 md:px-16"
        >
          <p className="label mb-8 md:mb-12">
            <span className="accent-dot" />
            LET&apos;S BUILD SOMETHING
          </p>

          <a
            href="mailto:harshitsingh@iitb.ac.in"
            className="group inline-flex items-baseline gap-4 font-display leading-[0.95] tracking-[-0.03em] text-text no-underline"
          >
            <span className="text-accent transition-transform group-hover:translate-x-2">
              →
            </span>
            <span className="break-all text-[clamp(40px,8vw,128px)] transition-colors group-hover:text-accent">
              harshitsingh
              <span className="text-muted group-hover:text-accent/70">
                @iitb.ac.in
              </span>
            </span>
          </a>

          <div className="mt-16 flex flex-col gap-6 md:mt-24 md:flex-row md:items-end md:justify-between">
            <ul className="flex flex-wrap items-center gap-x-10 gap-y-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs uppercase tracking-[0.18em] text-muted no-underline transition-colors hover:text-accent"
                  >
                    → {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="font-mono text-2xs text-subtle">
              based in mumbai · open to internships
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
