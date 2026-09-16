import type { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

type ButtonVariant = 'primary' | 'secondary'

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-green-500 text-black hover:bg-green-400 hover:shadow-[0_0_24px_rgba(34,197,94,0.45)]',
  secondary: 'bg-white/5 text-white ring-1 ring-white/15 hover:bg-white/10 hover:ring-white/30',
}

const baseClasses =
  'inline-flex items-center justify-center rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wide transition-all duration-200'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props} />
}

interface ButtonLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  variant?: ButtonVariant
}

export function ButtonLink({ variant = 'primary', className = '', ...props }: ButtonLinkProps) {
  return <Link className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props} />
}
