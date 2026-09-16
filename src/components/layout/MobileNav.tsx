import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { navItems } from '../../data/nav'
import { ButtonLink } from '../shared/Button'

interface MobileNavProps {
  open: boolean
  onNavigate: () => void
}

export function MobileNav({ open, onNavigate }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && panelRef.current) {
      gsap.fromTo(panelRef.current, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' })
    }
  }, [open])

  if (!open) return null

  return (
    <div ref={panelRef} className="border-t border-white/10 bg-black/95 backdrop-blur-md lg:hidden">
      <nav className="flex flex-col gap-1 px-4 py-6">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            onClick={onNavigate}
            className={({ isActive }) =>
              `rounded-md px-3 py-3 text-sm font-medium tracking-wide uppercase transition-colors ${
                isActive ? 'bg-white/5 text-green-500' : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
        <ButtonLink to="/" onClick={onNavigate} className="mt-3 w-full">
          Get a Quote
        </ButtonLink>
      </nav>
    </div>
  )
}
