import { useLenis } from 'lenis/react'
import type { MouseEvent } from 'react'
import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/unity-auto-group-logo.webp'
import { navItems } from '../../data/nav'
import { ButtonLink } from '../shared/Button'
import { AnnouncementBar } from './AnnouncementBar'
import { MobileNav } from './MobileNav'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isHome = pathname === '/'
  const transparent = isHome && !scrolled && !menuOpen
  const lenis = useLenis()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Only act while the menu is actually open — releasing the lock on mount would undo the one
  // the preloader holds during startup.
  useEffect(() => {
    if (!menuOpen) return

    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'

    return () => {
      lenis?.start()
      document.documentElement.style.overflow = ''
    }
  }, [menuOpen, lenis])

  // The logo goes home from anywhere and resets the scroll — a plain link would do nothing when
  // the visitor is already on the homepage.
  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return

    event.preventDefault()
    setMenuOpen(false)
    navigate('/')
    lenis?.scrollTo(0, { immediate: true, force: true })
    window.scrollTo(0, 0)
  }

  const headerState = menuOpen
    ? 'border-transparent bg-black'
    : transparent
      ? 'border-transparent bg-transparent'
      : 'border-white/10 bg-black/85 shadow-lg shadow-black/30 backdrop-blur-md'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex flex-col border-b transition-all duration-300 ${
        menuOpen ? 'h-dvh' : ''
      } ${headerState}`}
    >
      <AnnouncementBar />

      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <NavLink to="/" onClick={handleLogoClick}>
          <img src={logo} alt="Unity Auto Group" className="h-9 w-auto sm:h-11" />
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
            aria-expanded={menuOpen}
            className="relative flex h-6 w-7 flex-col items-center justify-center gap-[5px] text-gray-200 hover:text-white lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={`h-0.5 w-7 rounded-full bg-current transition-transform duration-300 ease-out ${
                menuOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`h-0.5 w-7 rounded-full bg-current transition-opacity duration-200 ease-out ${
                menuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`h-0.5 w-7 rounded-full bg-current transition-transform duration-300 ease-out ${
                menuOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      <MobileNav open={menuOpen} onNavigate={() => setMenuOpen(false)} />
    </header>
  )
}
