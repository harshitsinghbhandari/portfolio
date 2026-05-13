import { ReactNode } from 'react'

interface ContainerProps {
  className?: string
  children: ReactNode
}

const Container = ({ className = '', children }: ContainerProps) => (
  <div className={`max-w-content mx-auto px-6 md:px-10 lg:px-[60px] ${className}`}>
    {children}
  </div>
)

export default Container
