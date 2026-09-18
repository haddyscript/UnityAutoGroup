import { gsap } from 'gsap'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Service } from '../../data/services'

interface ServiceCardProps {
  service: Service
}

const COLLAPSED_HEIGHT = 84
const EXPANDED_HEIGHT = 420

export function ServiceCard({ service }: ServiceCardProps) {
  const rowRef = useRef<HTMLAnchorElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  // Tracks stacking directly off hover state so it can never get left behind by an
  // animation `onComplete` that gets skipped when a later tween overwrites it.
  const [isActive, setIsActive] = useState(false)

  const handleEnter = () => {
    setIsActive(true)
    gsap.killTweensOf([popupRef.current, imageRef.current, titleRef.current])
    gsap.to(popupRef.current, { height: EXPANDED_HEIGHT, opacity: 1, duration: 0.5, ease: 'power3.out' })
    gsap.to(imageRef.current, { scale: 1, duration: 0.6, ease: 'power3.out' })
    gsap.to(titleRef.current, { scale: 1.08, duration: 0.4, ease: 'power3.out' })
  }

  const handleLeave = () => {
    setIsActive(false)
    gsap.killTweensOf([popupRef.current, imageRef.current, titleRef.current])
    gsap.to(popupRef.current, { height: 0, opacity: 0, duration: 0.4, ease: 'power3.out' })
    gsap.to(imageRef.current, { scale: 1.08, duration: 0.4, ease: 'power3.out' })
    gsap.to(titleRef.current, { scale: 1, duration: 0.3, ease: 'power3.out' })
  }

  return (
    <Link
      ref={rowRef}
      to="/services"
      data-reveal-list
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ height: COLLAPSED_HEIGHT, zIndex: isActive ? 20 : 1 }}
      className="relative flex items-center justify-center border-b border-gray-800"
    >
      {service.image && (
        <div
          ref={popupRef}
          className="absolute inset-x-0 top-1/2 h-0 -translate-y-1/2 overflow-hidden opacity-0 shadow-2xl shadow-black/60"
        >
          <img ref={imageRef} src={service.image} alt="" className="h-full w-full scale-110 object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}
      <h3 ref={titleRef} className="font-bebas relative z-10 text-3xl text-white uppercase sm:text-5xl">
        {service.title}
      </h3>
    </Link>
  )
}
