import { ReactNode } from 'react'
import Container from './Container'

interface SectionProps {
  id?: string
  variant?: 'default' | 'pageTop'
  className?: string
  containerClassName?: string
  children: ReactNode
}

const paddingByVariant = {
  default: 'py-20 lg:py-32',
  pageTop: 'pt-32 lg:pt-40 pb-20 lg:pb-32',
}

const Section = ({
  id,
  variant = 'default',
  className = '',
  containerClassName = '',
  children,
}: SectionProps) => (
  <section
    id={id}
    className={`relative z-[1] ${paddingByVariant[variant]} ${className}`}
  >
    <Container className={containerClassName}>{children}</Container>
  </section>
)

export default Section
