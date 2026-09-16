import Link from 'next/link'

export default function Navbar() {
  return (
    <div className="container-page">
      <nav className="flex items-center justify-between gap-4 py-4" aria-label="Primary">
        <Link
          href="/"
          className="inline-flex min-h-11 shrink-0 items-center font-semibold tracking-tight text-text no-underline"
          aria-label="Home"
        >
          Harshit Singh
        </Link>
        <div className="flex items-center gap-2 text-sm text-muted sm:gap-4">
          <Link
            href="/work-with-me"
            className="inline-flex min-h-11 items-center justify-center px-2 text-accent no-underline transition-colors hover:text-text"
          >
            Work with me
          </Link>
          <a
            href="https://github.com/harshitsinghbhandari"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 no-underline transition-colors hover:text-text"
          >
            GitHub
          </a>
          <a
            href="https://x.com/the_hsbhandari"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 no-underline transition-colors hover:text-text"
          >
            X
          </a>
        </div>
      </nav>
      <div className="hairline" />
    </div>
  )
}
