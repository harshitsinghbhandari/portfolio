import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Direction = 'forward' | 'back'
type Tone = 'default' | 'muted'

interface ArrowLinkProps {
  to?: string
  href?: string
  direction?: Direction
  tone?: Tone
  children: ReactNode
}

const toneClass: Record<Tone, string> = {
  default: 'text-text hover:text-accent',
  muted: 'text-muted hover:text-text',
}

const Arrow = ({ direction }: { direction: Direction }) => (
  <svg
    className="w-3.5 h-3.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    {direction === 'forward' ? (
      <path d="M5 12h14M12 5l7 7-7 7" />
    ) : (
      <path d="M19 12H5M12 19l-7-7 7-7" />
    )}
  </svg>
)

const ArrowLink = ({
  to,
  href,
  direction = 'forward',
  tone = 'default',
  children,
}: ArrowLinkProps) => {
  const baseClass = `inline-flex items-center gap-2 font-mono text-2xs tracking-tag uppercase no-underline transition-all duration-200 hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm ${toneClass[tone]}`

  const content = (
    <>
      {direction === 'back' && <Arrow direction="back" />}
      {children}
      {direction === 'forward' && <Arrow direction="forward" />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={baseClass}>
        {content}
      </Link>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={baseClass}>
      {content}
    </a>
  )
}

export default ArrowLink
