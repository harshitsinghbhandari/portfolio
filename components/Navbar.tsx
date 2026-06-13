'use client'

import Link from 'next/link'
import { useState } from 'react'
import MenuOverlay from './MenuOverlay'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-40">
        <nav
          className="flex h-16 items-center justify-between px-6 md:px-10"
          aria-label="Primary"
        >
          <Link
            href="/"
            className="font-display text-2xl text-text no-underline"
            aria-label="Home"
          >
            h<span className="text-accent">,</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="primary-menu"
            className="group flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/5"
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-[5px]">
              <span className="block h-px w-7 bg-text transition-colors group-hover:bg-accent" />
              <span className="block h-px w-7 bg-text transition-colors group-hover:bg-accent" />
            </span>
          </button>
        </nav>
      </header>
      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  )
}
