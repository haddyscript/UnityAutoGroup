import { useLenis } from 'lenis/react'
import type { MouseEvent } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
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
  const navRef = useRef<HTMLElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)

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

  // One shared underline that slides under whichever nav item is hovered, and back to the active page's
  // item when the pointer leaves the nav — so only one item is ever underlined.
  const moveIndicator = useCallback((link: HTMLElement | null | undefined) => {
    const indicator = indicatorRef.current
    if (!indicator) return
    if (!link) {
      indicator.style.opacity = '0'
      return
    }
    indicator.style.opacity = '1'
    indicator.style.width = `${link.offsetWidth}px`
    indicator.style.transform = `translateX(${link.offsetLeft}px)`
  }, [])

  const moveToActive = useCallback(() => {
    moveIndicator(navRef.current?.querySelector<HTMLElement>('a[aria-current="page"]'))
  }, [moveIndicator])

  useEffect(() => {
    moveToActive()
    window.addEventListener('resize', moveToActive)
    // Label widths change once the web font finishes loading.
    document.fonts?.ready.then(moveToActive)
    return () => window.removeEventListener('resize', moveToActive)
  }, [pathname, moveToActive])

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
      ? // Dark text needs a backdrop to stay readable over the hero video in the light theme.
        'border-transparent bg-transparent light:border-white/10 light:bg-black/80 light:shadow-sm light:backdrop-blur-md'
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

        <nav
          ref={navRef}
          onMouseLeave={moveToActive}
          className="nav-hover-effect nav-swipe relative hidden items-center gap-8 lg:flex"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onMouseEnter={(event) => moveIndicator(event.currentTarget)}
              className={({ isActive }) =>
                `relative text-xs font-medium tracking-widest uppercase transition-colors ${
                  isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                }`
              }
            >
              <span className="nav-swipe-text" data-hover={item.label}>
                <span>{item.label}</span>
              </span>
            </NavLink>
          ))}
          <span
            ref={indicatorRef}
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-1.5 left-0 h-px bg-green-500 opacity-0 transition-[transform,width,opacity] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
          />
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
