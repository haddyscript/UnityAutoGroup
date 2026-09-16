import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { StickyQuoteBar } from './StickyQuoteBar'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-gray-100">
      <Header />
      <main className="flex-1 pb-20 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <StickyQuoteBar />
    </div>
  )
}
