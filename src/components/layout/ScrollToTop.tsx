import { useLenis } from 'lenis/react'
import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

// React Router keeps the window scroll position across route changes, which drops you halfway
// down the next page. Reset it before paint on every navigation.
export function ScrollToTop() {
  const { pathname } = useLocation()
  const lenis = useLenis()

  useLayoutEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true })
    window.scrollTo(0, 0)
  }, [pathname, lenis])

  return null
}
