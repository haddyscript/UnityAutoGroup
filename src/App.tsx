import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import MobileService from './pages/MobileService'
import NotFound from './pages/NotFound'
import Services from './pages/Services'
import ShopService from './pages/ShopService'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/shop-service" element={<ShopService />} />
        <Route path="/mobile-service" element={<MobileService />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
