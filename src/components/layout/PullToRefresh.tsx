import { gsap } from 'gsap'
import { RefreshCw } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { useEffect, useRef } from 'react'

// How far the finger travels (after resistance) before the release reloads the page.
const THRESHOLD = 72
const MAX_PULL = 120
const RESISTANCE = 0.45

export function PullToRefresh({ children }: PropsWithChildren) {
  const contentRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Touch devices only — a mouse user should never be able to trip a page reload.
    if (!window.matchMedia('(pointer: coarse)').matches) return

    const content = contentRef.current
    const indicator = indicatorRef.current
    const icon = iconRef.current
    if (!content || !indicator || !icon) return

    let startY = 0
    let distance = 0
    let tracking = false
    let refreshing = false

    const settle = (duration: number) => {
      tracking = false
      distance = 0
      indicator.dataset.armed = 'false'
      gsap.to(content, { y: 0, duration, ease: 'power3.out' })
      gsap.to(indicator, { y: 0, autoAlpha: 0, scale: 0.7, duration, ease: 'power3.out' })
    }

    const onTouchStart = (event: TouchEvent) => {
      if (refreshing || event.touches.length !== 1) return
      // The mobile menu locks the page; a pull there is not a refresh gesture.
      if (document.documentElement.style.overflow === 'hidden') return
      if (window.scrollY > 0) return

      startY = event.touches[0].clientY
      distance = 0
      tracking = true
    }

    const onTouchMove = (event: TouchEvent) => {
      if (!tracking || refreshing) return

      if (event.touches.length !== 1) {
        settle(0.2)
        return
      }

      const delta = event.touches[0].clientY - startY

      // Pulling up is an ordinary scroll — hand the gesture back.
      if (delta <= 0) {
        settle(0.15)
        return
      }

      event.preventDefault()

      distance = Math.min(MAX_PULL, delta * RESISTANCE)
      const progress = Math.min(1, distance / THRESHOLD)

      gsap.set(content, { y: distance })
      gsap.set(indicator, { y: distance, autoAlpha: Math.min(1, progress * 1.5), scale: 0.7 + progress * 0.3 })
      gsap.set(icon, { rotate: distance * 3 })
      indicator.dataset.armed = progress >= 1 ? 'true' : 'false'
    }

    const onTouchEnd = () => {
      if (!tracking || refreshing) return

      if (distance < THRESHOLD) {
        settle(0.45)
        return
      }

      refreshing = true
      tracking = false
      gsap.to(content, { y: THRESHOLD, duration: 0.25, ease: 'power2.out' })
      gsap.to(indicator, { y: THRESHOLD, scale: 1, autoAlpha: 1, duration: 0.25, ease: 'power2.out' })
      gsap.to(icon, { rotate: '+=360', duration: 0.7, ease: 'none', repeat: -1 })
      window.setTimeout(() => window.location.reload(), 550)
    }

    const onTouchCancel = () => {
      if (refreshing) return
      settle(0.2)
    }

    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd)
    window.addEventListener('touchcancel', onTouchCancel)

    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchcancel', onTouchCancel)
      gsap.set([content, indicator], { clearProps: 'all' })
    }
  }, [])

  return (
    <>
      <div
        ref={indicatorRef}
        role="status"
        aria-live="polite"
        data-armed="false"
        style={{ top: 'calc(6.5rem + env(safe-area-inset-top, 0px))' }}
        className="pointer-events-none invisible fixed left-1/2 z-40 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-white/10 bg-gray-950 opacity-0 shadow-lg shadow-black/50 transition-colors duration-200 data-[armed=true]:border-green-500/70 data-[armed=true]:bg-green-500/10 lg:hidden"
      >
        <span ref={iconRef} className="flex text-green-500">
          <RefreshCw size={18} />
        </span>
      </div>

      <div ref={contentRef} className="flex flex-1 flex-col">
        {children}
      </div>
    </>
  )
}
