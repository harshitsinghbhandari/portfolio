const links = [
  { label: 'GitHub', href: 'https://github.com/harshitsinghbhandari' },
  { label: 'X', href: 'https://x.com/the_hsbhandari' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/harshitsinghbhandari/' },
  { label: 'Email', href: 'mailto:harshitsingh@iitb.ac.in' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <div className="container-page">
      <div className="hairline" />
      <footer className="flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="no-underline transition-colors hover:text-text"
            >
              {l.label}
            </a>
          ))}
        </div>
        <p className="text-sm text-subtle">© {year} Harshit Singh</p>
      </footer>
    </div>
  )
}
