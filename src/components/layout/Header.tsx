import { Menu, Wrench, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { navItems } from '../../data/nav'
import { ButtonLink } from '../shared/Button'
import { MobileNav } from './MobileNav'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const transparent = isHome && !scrolled && !menuOpen

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        transparent
          ? 'border-b border-transparent bg-transparent'
          : 'border-b border-white/10 bg-black/85 shadow-lg shadow-black/30 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2.5 text-white" onClick={() => setMenuOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500/10 ring-1 ring-green-500/40">
            <Wrench className="text-green-500" size={18} />
          </span>
          <span className="text-base font-semibold tracking-tight sm:text-lg">Unity Auto Group</span>
        </NavLink>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `relative text-xs font-medium tracking-widest uppercase transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-green-500 after:transition-all after:duration-200 after:content-[''] ${
                  isActive
                    ? 'text-white after:w-full'
                    : 'text-gray-300 after:w-0 hover:text-white hover:after:w-full'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink to="/" className="hidden lg:inline-flex">
            Get a Quote
          </ButtonLink>
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="text-gray-200 hover:text-white lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <MobileNav open={menuOpen} onNavigate={() => setMenuOpen(false)} />
    </header>
  )
}
