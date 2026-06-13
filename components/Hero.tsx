'use client'

import { motion } from 'framer-motion'
import Ferrofluid from './Ferrofluid'

const word = 'Harshit Singh'

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Ferrofluid
          colors={['#e63946', '#ededef', '#8a8a93']}
          speed={0.35}
          scale={1.8}
          turbulence={1.1}
          fluidity={0.12}
          rimWidth={0.22}
          sharpness={2.4}
          shimmer={1.4}
          glow={1.8}
          opacity={0.85}
          flowDirection="down"
          mouseInteraction
          mouseStrength={1.1}
          mouseRadius={0.4}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="label mb-6 flex items-center gap-3"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_2px_rgba(230,57,70,0.6)]" />
          iit bombay · 3rd year · open to internships
        </motion.p>

        <h1 className="font-display text-display" aria-label={word + ','}>
          {word.split('').map((c, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, rotateX: -45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.4 + i * 0.04,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="inline-block"
              aria-hidden="true"
            >
              {c === ' ' ? ' ' : c}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 + word.length * 0.04 + 0.2 }}
            className="inline-block text-accent"
            aria-hidden="true"
          >
            ,
          </motion.span>
        </h1>
      </div>
    </section>
  )
}
