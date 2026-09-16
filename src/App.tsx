import { Wrench } from 'lucide-react'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import { Route, Routes } from 'react-router-dom'

function Home() {
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.from(iconRef.current, { opacity: 0, y: 12, duration: 0.6 })
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black text-gray-100">
      <div ref={iconRef} className="flex items-center gap-2 text-green-500">
        <Wrench size={32} />
        <span className="text-2xl font-semibold">Unity Auto Group</span>
      </div>
      <p className="text-gray-400">Tech stack setup complete.</p>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App
