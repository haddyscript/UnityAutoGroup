import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import mobileServiceImage from '../../assets/images/mobile-auto-mechanic.avif'
import shopServiceImage from '../../assets/images/shop-service.webp'
import { Container } from '../shared/Container'
import { ScrollRevealText } from '../shared/ScrollRevealText'
import { ServiceOptionCard } from './ServiceOptionCard'

gsap.registerPlugin(ScrollTrigger)

const options = [
  {
    title: 'Shop Service',
    description: "Bring your vehicle to Unity Auto Group's physical repair shop.",
    to: '/shop-service',
    image: shopServiceImage,
  },
  {
    title: 'Mobile Service',
    description: 'Our technician comes to you, fully equipped to repair on-site.',
    to: '/mobile-service',
    image: mobileServiceImage,
  },
]

export function QuoteEntry() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-reveal]', {
        opacity: 0,
        y: 32,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="pt-20 pb-32 sm:pb-40">
      <Container>
        <div data-reveal>
          <p className="animate-marquee-alternate inline-block text-sm font-semibold tracking-wide text-green-500 uppercase">
            Get Started
          </p>
        </div>

        <ScrollRevealText
          text="Bring your vehicle to us, or let us come to you — get an estimate before you book."
          className="font-display mt-4 max-w-4xl text-[40px] leading-[1.1] font-bold uppercase tracking-tight sm:text-6xl lg:text-7xl"
        />

        <p data-reveal className="font-garamond mt-6 max-w-xl text-gray-400">
          Both options include a vehicle and repair walkthrough to estimate your quote.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {options.map((option) => (
            <ServiceOptionCard key={option.title} {...option} />
          ))}
        </div>
      </Container>
    </section>
  )
}
