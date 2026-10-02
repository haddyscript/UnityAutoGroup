import { useEffect, useRef } from 'react'

const INTERACTIVE = 'a, button, [role="button"], input, select, textarea, label, summary'

// Trailing cursor: a dot pinned to the pointer and a ring that lags behind it, stretching along the
// direction of travel in proportion to how far behind it is. Only on fine pointers (no touch) and
// skipped entirely for reduced motion. The native cursor stays visible so hand/text cursors still work.
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const mouse = { x: -100, y: -100 }
    const pos = { x: -100, y: -100 }
    let hovering = false
    let hoverScale = 1
    let visible = false
    let frame = 0

    const onMove = (event: PointerEvent) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
      hovering = (event.target as Element | null)?.closest?.(INTERACTIVE) != null
      if (!visible) {
        // Snap into place on first appearance instead of flying in from the corner.
        pos.x = mouse.x
        pos.y = mouse.y
        visible = true
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      }
    }

    const onLeave = () => {
      visible = false
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    const tick = () => {
      pos.x += (mouse.x - pos.x) * 0.15
      pos.y += (mouse.y - pos.y) * 0.15
      hoverScale += ((hovering ? 1.6 : 1) - hoverScale) * 0.2

      const dx = mouse.x - pos.x
      const dy = mouse.y - pos.y
      const distance = Math.hypot(dx, dy)
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI
      const stretch = Math.min(distance / 60, 0.8)

      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`
      ring.style.transform =
        `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) rotate(${angle}deg) ` +
        `scale(${(1 + stretch) * hoverScale}, ${(1 - stretch * 0.4) * hoverScale})`

      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    frame = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] size-9 rounded-full border-2 border-green-400/80 opacity-0 shadow-[0_0_12px_rgba(74,222,128,0.35)] transition-opacity duration-300 will-change-transform"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] size-1.5 rounded-full bg-green-400 opacity-0 transition-opacity duration-300 will-change-transform"
      />
    </>
  )
}
