import { ArrowRight } from 'lucide-react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type ButtonVariant = 'primary' | 'secondary'

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-green-500 text-black hover:shadow-[0_0_24px_rgba(34,197,94,0.45)]',
  secondary: 'bg-white/5 text-white ring-1 ring-white/15 hover:bg-white/10 hover:ring-white/30',
}

const baseClasses =
  'group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wide transition-shadow duration-200'

function ButtonContent({ variant, children }: { variant: ButtonVariant; children: ReactNode }) {
  if (variant !== 'primary') return <>{children}</>

  return (
    <>
      <span className="absolute inset-0 origin-right scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100" />
      <span className="relative z-10 inline-flex items-center gap-1.5">
        {children}
        <ArrowRight
          className="w-0 -translate-x-1 opacity-0 transition-all duration-300 ease-out group-hover:w-4 group-hover:translate-x-0 group-hover:opacity-100"
          size={16}
        />
      </span>
    </>
  )
}

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      <ButtonContent variant={variant}>{children}</ButtonContent>
    </button>
  )
}

interface ButtonLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  variant?: ButtonVariant
}

export function ButtonLink({ variant = 'primary', className = '', children, ...props }: ButtonLinkProps) {
  return (
    <Link className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      <ButtonContent variant={variant}>{children}</ButtonContent>
    </Link>
  )
}
