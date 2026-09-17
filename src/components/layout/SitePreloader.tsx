import { gsap } from 'gsap'
import { useLenis } from 'lenis/react'
import { useEffect, useRef, useState } from 'react'
import logo from '../../assets/unity-auto-group-logo.webp'

// Hold the splash long enough to read, but never let a slow video keep visitors waiting.
const MIN_DURATION = 1.6
const MAX_WAIT = 4.5

export function SitePreloader() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const curtainTopRef = useRef<HTMLDivElement>(null)
  const curtainBottomRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const labelsRef = useRef<HTMLDivElement>(null)
  const markRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const [hidden, setHidden] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    if (hidden) return

    const curtainTop = curtainTopRef.current
    const curtainBottom = curtainBottomRef.current
    const content = contentRef.current
    const labels = labelsRef.current
    const mark = markRef.current
    const count = countRef.current
    const bar = barRef.current
    const rail = railRef.current
    if (!curtainTop || !curtainBottom || !content || !labels || !mark || !count || !bar || !rail) return

    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'

    const start = performance.now()
    const progress = { value: 0 }
    let finished = false
    let holdTimer = 0

    const paint = () => {
      const value = progress.value
      count.textContent = String(Math.round(value)).padStart(2, '0')
      // The counter fills with green from the bottom up as the page loads.
      count.style.backgroundImage = `linear-gradient(to top, #22c55e ${value}%, rgba(255,255,255,0.14) ${value}%)`
      bar.style.transform = `scaleX(${value / 100})`
    }

    paint()

    const intro = gsap
      .timeline()
      .from(mark, { opacity: 0, y: 28, scale: 0.94, duration: 0.9, ease: 'power3.out' })
      .from(labels.children, { opacity: 0, y: 12, duration: 0.6, stagger: 0.08, ease: 'power2.out' }, '-=0.6')
      .from(rail, { scaleX: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')

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
        .to(progress, { value: 100, duration: 0.45, ease: 'power2.out', onUpdate: paint })
        .to(labels.children, { opacity: 0, y: -10, duration: 0.3, stagger: 0.05, ease: 'power2.in' })
        .to(rail, { opacity: 0, duration: 0.3, ease: 'power2.in' }, '<')
        .to(content, { opacity: 0, y: -40, scale: 0.97, duration: 0.55, ease: 'power2.in' }, '-=0.2')
        .to(curtainTop, { yPercent: -100, duration: 1, ease: 'power4.inOut' }, '-=0.15')
        .to(curtainBottom, { yPercent: 100, duration: 1, ease: 'power4.inOut' }, '<')
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
      intro.kill()
      creep.kill()
    }
  }, [hidden, lenis])

  if (hidden) return null

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] overflow-hidden">
      <div ref={curtainTopRef} className="absolute inset-x-0 top-0 h-1/2 bg-black" />
      <div ref={curtainBottomRef} className="absolute inset-x-0 bottom-0 h-1/2 bg-black" />

      <div ref={contentRef} className="absolute inset-0 flex flex-col justify-between px-6 py-8 sm:px-10 sm:py-10">
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/10 blur-[120px]"
        />

        <div ref={labelsRef} className="relative flex items-start justify-between">
          <p className="font-mono text-[10px] tracking-[0.3em] text-green-500 uppercase sm:text-xs">
            / Unity Auto Group /
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-gray-500 uppercase sm:text-xs">
            Shop &amp; Mobile Repair
          </p>
        </div>

        <div ref={markRef} className="relative flex flex-col items-center">
          <img src={logo} alt="Unity Auto Group" className="h-16 w-auto sm:h-24 lg:h-28" />
          {/* Safari below 16.4 only honours the prefixed background-clip. */}
          <span
            ref={countRef}
            role="status"
            aria-live="polite"
            style={{
              WebkitBackgroundClip: 'text',
              backgroundImage: 'linear-gradient(to top, #22c55e 0%, rgba(255,255,255,0.14) 0%)',
            }}
            className="font-bebas mt-4 bg-clip-text text-[30vw] leading-[0.78] text-transparent sm:mt-6 sm:text-[24vw]"
          >
            00
          </span>
        </div>

        <div className="relative flex items-end justify-between gap-6">
          <p className="font-mono text-[10px] tracking-[0.3em] text-gray-500 uppercase sm:text-xs">
            Loading Experience
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-gray-500 uppercase sm:text-xs">One Unity</p>
        </div>
      </div>

      <div ref={railRef} className="absolute inset-x-0 bottom-0 h-px origin-left bg-white/10">
        <div
          ref={barRef}
          className="h-full w-full origin-left scale-x-0 bg-green-500 shadow-[0_0_18px_rgba(34,197,94,0.8)]"
        />
      </div>
    </div>
  )
}
