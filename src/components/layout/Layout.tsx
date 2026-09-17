import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { PullToRefresh } from './PullToRefresh'
import { ScrollToTop } from './ScrollToTop'
import { StickyQuoteBar } from './StickyQuoteBar'

export function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className="flex min-h-screen flex-col bg-black text-gray-100">
      <ScrollToTop />
      <Header />
      <PullToRefresh>
        <main className={`flex-1 pb-20 lg:pb-0 ${isHome ? '' : 'pt-20 sm:pt-24 lg:pt-32'}`}>
          <Outlet />
        </main>
        <Footer />
      </PullToRefresh>
      <StickyQuoteBar />
    </div>
  )
}
