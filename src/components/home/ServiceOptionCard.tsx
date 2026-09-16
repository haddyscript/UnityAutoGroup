import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import { openQuotePopup } from '../../lib/quote'
import { Button } from '../shared/Button'

gsap.registerPlugin(ScrollTrigger)

interface ServiceOptionCardProps {
  image: string
  title: string
  description: string
}

export function ServiceOptionCard({ image, title, description }: ServiceOptionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const shineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { yPercent: -58 },
        {
          yPercent: -42,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }, cardRef)

    return () => ctx.revert()
  }, [])

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, { y: -14, scale: 1.03, duration: 0.5, ease: 'back.out(1.8)' })
    gsap.to(imageRef.current, { scale: 1.12, duration: 0.6, ease: 'power3.out' })
    gsap.fromTo(
      shineRef.current,
      { xPercent: -150, opacity: 0.5 },
      { xPercent: 150, opacity: 0, duration: 0.9, ease: 'power2.out' },
    )
  }

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { y: 0, scale: 1, duration: 0.5, ease: 'power3.out' })
    gsap.to(imageRef.current, { scale: 1, duration: 0.6, ease: 'power3.out' })
  }

  return (
    <div
      ref={cardRef}
      data-reveal
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative h-96 overflow-hidden rounded-xl border border-gray-800 transition-[border-color,box-shadow] duration-300 hover:border-green-500/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_40px_rgba(34,197,94,0.15)]"
    >
      <img
        ref={imageRef}
        src={image}
        alt=""
        className="absolute inset-x-0 top-1/2 h-[130%] w-full object-cover will-change-transform"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/10" />
      <div
        ref={shineRef}
        className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0"
      />

      <div className="absolute inset-x-0 bottom-0 p-8 text-center">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-gray-300">{description}</p>
        <Button onClick={openQuotePopup} className="mt-6 inline-flex">
          Get a Quote
        </Button>
      </div>
    </div>
  )
}
