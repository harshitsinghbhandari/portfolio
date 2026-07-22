import Link from 'next/link'

export default function Navbar() {
  return (
    <div className="container-page">
      <nav className="flex items-center justify-between py-6" aria-label="Primary">
        <Link
          href="/"
          className="font-semibold tracking-tight text-text no-underline"
          aria-label="Home"
        >
          Harshit Singh
        </Link>
        <div className="flex items-center gap-6 text-sm text-muted">
          <a
            href="https://github.com/harshitsinghbhandari"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline transition-colors hover:text-text"
          >
            GitHub
          </a>
          <a
            href="https://x.com/the_hsbhandari"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline transition-colors hover:text-text"
          >
            X
          </a>
        </div>
      </nav>
      <div className="hairline" />
    </div>
  )
}
