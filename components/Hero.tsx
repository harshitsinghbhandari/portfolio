'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-page pt-24 md:pt-32 pb-20 md:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="label mb-8 flex items-center gap-3"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_2px_rgba(167,139,250,0.6)]" />
          iit bombay · 2nd year · open to internships
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-sans text-[clamp(40px,7vw,84px)] font-semibold leading-[1.02] tracking-[-0.025em]"
        >
          Harshit Singh
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 max-w-2xl text-[clamp(18px,2vw,24px)] leading-[1.45] text-muted"
        >
          Building systems, agents, and <span className="text-text">local-first AI</span>
          {' '}— ambient intelligence that speaks, watches, and remembers without
          giving any of it up to the cloud.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center gap-3"
        >
          <Link
            href="#work"
            className="rounded-md bg-accent px-5 py-2.5 font-mono text-2xs text-bg no-underline transition-opacity hover:opacity-90"
          >
            See the work
          </Link>
          <Link
            href="/writing"
            className="rounded-md border border-border px-5 py-2.5 font-mono text-2xs text-text no-underline transition-colors hover:border-white/20"
          >
            Read the writing
          </Link>
          <a
            href="mailto:harshitsingh@iitb.ac.in"
            className="rounded-md border border-transparent px-5 py-2.5 font-mono text-2xs text-muted no-underline transition-colors hover:text-text"
          >
            harshitsingh@iitb.ac.in
          </a>
        </motion.div>
      </div>
    </section>
  )
}
