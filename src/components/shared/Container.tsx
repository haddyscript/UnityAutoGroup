import type { PropsWithChildren } from 'react'

interface ContainerProps {
  className?: string
}

export function Container({ children, className = '' }: PropsWithChildren<ContainerProps>) {
  return <div className={`mx-auto max-w-6xl px-4 ${className}`}>{children}</div>
}
