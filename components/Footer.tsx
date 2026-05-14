import Link from 'next/link'

const social = [
  { href: 'https://github.com/harshitsinghbhandari', label: 'GitHub' },
  { href: 'https://linkedin.com/in/harshitsinghbhandari', label: 'LinkedIn' },
  { href: 'mailto:harshitsingh@iitb.ac.in', label: 'Email' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-32 border-t border-border/60">
      <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-6">
          {social.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="font-mono text-2xs text-muted no-underline transition-colors hover:text-text"
            >
              {s.label}
            </Link>
          ))}
        </div>
        <p className="font-mono text-2xs text-subtle">
          Harshit Singh Bhandari · {year}
        </p>
      </div>
    </footer>
  )
}
