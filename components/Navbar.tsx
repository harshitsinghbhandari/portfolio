import Link from 'next/link'

const links = [
  { href: '/#work', label: 'Work' },
  { href: '/writing', label: 'Writing' },
  { href: '/#about', label: 'About' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-bg/70 backdrop-blur-xl">
      <nav
        className="container-page flex h-14 items-center justify-between"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="font-mono text-sm tracking-wide text-text no-underline"
          aria-label="Home"
        >
          harshit<span className="text-accent">.</span>
        </Link>
        <ul className="flex items-center gap-7">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-mono text-2xs text-muted no-underline transition-colors hover:text-text"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
