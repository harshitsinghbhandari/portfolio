import Link from 'next/link'

const links = [
  { label: 'Work', href: '/#work' },
  { label: 'Writing', href: '/writing' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-bg/70 backdrop-blur">
      <nav
        className="container-page flex h-14 items-center justify-between"
        aria-label="Primary"
      >
        <Link href="/" className="font-display text-xl text-text no-underline" aria-label="Home">
          Harshit Singh<span className="text-accent">.</span>
        </Link>
        <ul className="flex items-center gap-5 md:gap-7">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="font-mono text-2xs uppercase tracking-[0.14em] text-muted no-underline transition-colors hover:text-text"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
