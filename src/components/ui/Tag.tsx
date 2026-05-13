import { ReactNode } from 'react'

interface TagProps {
  children: ReactNode
}

const Tag = ({ children }: TagProps) => (
  <span className="font-mono text-2xs tracking-tag uppercase px-2.5 py-1 border border-white/10 rounded-sm text-muted">
    {children}
  </span>
)

export default Tag
