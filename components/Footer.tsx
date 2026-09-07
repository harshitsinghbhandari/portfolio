const links = [
  { label: 'GitHub', href: 'https://github.com/harshitsinghbhandari' },
  { label: 'X', href: 'https://x.com/the_hsbhandari' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/harshitsinghbhandari/' },
  { label: 'Email', href: 'mailto:dev@theharshitsingh.com' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <div className="container-page">
      <div className="hairline" />
      <footer className="flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="-ml-2 flex flex-wrap gap-x-2 gap-y-2 text-sm text-muted">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 no-underline transition-colors hover:text-text"
            >
              {l.label}
            </a>
          ))}
        </div>
        <p className="text-sm text-muted">© {year} Harshit Singh Bhandari</p>
      </footer>
    </div>
  )
}
