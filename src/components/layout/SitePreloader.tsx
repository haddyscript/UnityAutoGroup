import { gsap } from 'gsap'
import { useLenis } from 'lenis/react'
import { useEffect, useRef, useState } from 'react'
import logo from '../../assets/unity-auto-group-logo.webp'

// Hold the splash long enough to read, but never let a slow video keep visitors waiting.
const MIN_DURATION = 1.1
const MAX_WAIT = 4

export function SitePreloader() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const percentRef = useRef<HTMLSpanElement>(null)
  const [hidden, setHidden] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    if (hidden) return

    const overlay = overlayRef.current
    const panel = panelRef.current
    const bar = barRef.current
    const percent = percentRef.current
    if (!overlay || !panel || !bar || !percent) return

    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'

    const start = performance.now()
    const progress = { value: 0 }
    let finished = false
    let holdTimer = 0

    const paint = () => {
      bar.style.width = `${progress.value}%`
      percent.textContent = `${Math.round(progress.value)}%`
    }

    // Creep toward 90% while assets load, then snap to 100 the moment the page is ready.
    const creep = gsap.to(progress, {
      value: 90,
      duration: MAX_WAIT * 0.85,
      ease: 'power1.out',
      onUpdate: paint,
    })

    const finish = () => {
      if (finished) return
      finished = true
      creep.kill()

      gsap
        .timeline({
          onComplete: () => {
            lenis?.start()
            document.documentElement.style.overflow = ''
            setHidden(true)
          },
        })
        .to(progress, { value: 100, duration: 0.3, ease: 'power2.out', onUpdate: paint })
        .to(panel, { opacity: 0, y: -16, duration: 0.35, ease: 'power2.in' })
        .to(overlay, { yPercent: -100, duration: 0.8, ease: 'power4.inOut' }, '-=0.1')
    }

    const onReady = () => {
      const elapsed = (performance.now() - start) / 1000
      holdTimer = window.setTimeout(finish, Math.max(0, MIN_DURATION - elapsed) * 1000)
    }

    if (document.readyState === 'complete') {
      onReady()
    } else {
      window.addEventListener('load', onReady, { once: true })
    }

    const capTimer = window.setTimeout(finish, MAX_WAIT * 1000)

    return () => {
      window.removeEventListener('load', onReady)
      window.clearTimeout(holdTimer)
      window.clearTimeout(capTimer)
      creep.kill()
    }
  }, [hidden, lenis])

  if (hidden) return null

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <div ref={panelRef} className="flex w-56 flex-col items-center sm:w-64">
        <img src={logo} alt="Unity Auto Group" className="h-12 w-auto sm:h-14" />

        <div className="mt-8 h-px w-full overflow-hidden bg-white/15">
          <div ref={barRef} className="h-full w-0 bg-green-500" />
        </div>

        <span ref={percentRef} className="mt-3 self-end font-mono text-xs tracking-widest text-gray-400">
          0%
        </span>
      </div>
    </div>
  )
}
