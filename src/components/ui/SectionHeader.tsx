interface SectionHeaderProps {
  number?: string
  title: string
  as?: 'h1' | 'h2'
}

const SectionHeader = ({ number, title, as = 'h2' }: SectionHeaderProps) => {
  const Heading = as
  const sizeClass = as === 'h1' ? 'text-h1' : 'text-h2'

  return (
    <div className="flex items-baseline gap-6 mb-12 lg:mb-16 reveal">
      {number && (
        <span className="font-mono text-2xs tracking-tag text-muted">{number}</span>
      )}
      <Heading className={`font-display ${sizeClass} font-medium text-text`}>
        {title}
      </Heading>
      <div className="flex-1 h-px bg-white/10" />
    </div>
  )
}

export default SectionHeader
