import { gsap } from 'gsap'
import { ArrowUpRight, Phone } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { navItems } from '../../data/nav'
import { ButtonLink } from '../shared/Button'

interface MobileNavProps {
  open: boolean
  onNavigate: () => void
}

export function MobileNav({ open, onNavigate }: MobileNavProps) {
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([])
  const ctaRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  // Stay mounted through the close tween instead of vanishing the instant `open` flips false.
  const [rendered, setRendered] = useState(open)

  useEffect(() => {
    if (open) {
      setRendered(true)
      return
    }
    if (!rendered) return

    const items = itemsRef.current.filter((el): el is HTMLAnchorElement => Boolean(el))
    const tl = gsap.timeline({ onComplete: () => setRendered(false) })
    tl.to([...items, ctaRef.current], { opacity: 0, y: -14, duration: 0.25, stagger: 0.03, ease: 'power2.in' })
  }, [open, rendered])

  useEffect(() => {
    if (!open || !rendered) return

    const items = itemsRef.current.filter((el): el is HTMLAnchorElement => Boolean(el))
    gsap.fromTo(glowRef.current, { opacity: 0 }, { opacity: 1, duration: 0.9, ease: 'power2.out' })
    gsap.fromTo(
      items,
      { opacity: 0, y: 26 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.06, delay: 0.05 },
    )
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.1 + navItems.length * 0.06 },
    )
  }, [open, rendered])

  if (!rendered) return null

  return (
    <div className="relative flex flex-1 flex-col overflow-y-auto lg:hidden">
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-green-500/10 opacity-0 blur-[100px]"
      />

      <nav className="relative flex flex-1 flex-col justify-center gap-0.5 px-6">
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
              `group flex items-center gap-4 border-b border-white/5 py-4 transition-colors duration-300 ${
                isActive ? 'text-green-500' : 'text-white/90 hover:text-green-400'
              }`
            }
          >
            <span className="font-mono text-xs text-green-500/60">0{index + 1}</span>
            <span className="font-bebas flex-1 text-4xl leading-none uppercase transition-transform duration-300 ease-out group-hover:translate-x-2">
              {item.label}
            </span>
            <ArrowUpRight
              size={20}
              className="shrink-0 -translate-x-2 text-green-500 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
            />
          </NavLink>
        ))}
      </nav>

      <div
        ref={ctaRef}
        className="relative border-t border-white/10 px-6 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
      >
        <div className="flex flex-col gap-3">
          <ButtonLink to="/" onClick={onNavigate} className="w-full">
            Get a Quote
          </ButtonLink>
          <a
            href="tel:+17709985850"
            onClick={onNavigate}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:border-green-500/50 hover:text-green-400"
          >
            <Phone size={16} />
            (770) 998-5850
          </a>
        </div>
      </div>
    </div>
  )
}
