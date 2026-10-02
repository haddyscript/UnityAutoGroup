import { Outlet, useLocation } from 'react-router-dom'
import { CustomCursor } from './CustomCursor'
import { Footer } from './Footer'
import { Header } from './Header'
import { ScrollToTop } from './ScrollToTop'
import { SitePreloader } from './SitePreloader'
import { StickyQuoteBar } from './StickyQuoteBar'

// Pages where the trailing cursor is turned off.
const noCursorPaths = ['/shop-service', '/mobile-service']

export function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const showCursor = !noCursorPaths.includes(pathname)

  return (
    <div className="flex min-h-screen flex-col bg-black text-gray-100">
      <SitePreloader />
      {showCursor && <CustomCursor />}
      <ScrollToTop />
      <Header />
      <main className={`flex-1 pb-20 lg:pb-0 ${isHome ? '' : 'pt-20 sm:pt-24 lg:pt-32'}`}>
        <Outlet />
      </main>
      <Footer />
      <StickyQuoteBar />
    </div>
  )
}
