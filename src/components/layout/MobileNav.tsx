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
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    if (!open) return
    const items = itemsRef.current.filter((el): el is HTMLAnchorElement => Boolean(el))
    gsap.fromTo(items, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.05 })
  }, [open])

  if (!open) return null

  return (
    <div className="flex flex-1 flex-col overflow-y-auto lg:hidden">
      <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
        {navItems.map((item, index) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            onClick={onNavigate}
            ref={(el) => {
              itemsRef.current[index] = el
            }}
            className={({ isActive }) =>
              `border-b border-white/5 py-4 text-2xl font-medium tracking-tight uppercase transition-colors ${
                isActive ? 'text-green-500' : 'text-white/90 hover:text-green-400'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 px-6 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <ButtonLink to="/" onClick={onNavigate} className="w-full">
          Get a Quote
        </ButtonLink>
      </div>
    </div>
  )
}
