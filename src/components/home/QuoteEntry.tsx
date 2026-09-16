import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Car, Store } from 'lucide-react'
import { useEffect, useRef } from 'react'
import mobileServiceImage from '../../assets/images/mobile-auto-mechanic.avif'
import shopServiceImage from '../../assets/images/shop-service.jpg'
import { ButtonLink } from '../shared/Button'
import { Container } from '../shared/Container'
import { ScrollRevealText } from '../shared/ScrollRevealText'

gsap.registerPlugin(ScrollTrigger)

const options = [
  {
    icon: Store,
    title: 'Shop Service',
    description: "Bring your vehicle to Unity Auto Group's physical repair shop.",
    to: '/shop-service',
    image: shopServiceImage,
  },
  {
    icon: Car,
    title: 'Mobile Service',
    description: 'Our technician comes to you, fully equipped to repair on-site.',
    to: '/mobile-service',
    image: mobileServiceImage,
  },
]

export function QuoteEntry() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRefs = useRef<(HTMLImageElement | null)[]>([])

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

      const images = imageRefs.current.filter((el): el is HTMLImageElement => Boolean(el))
      gsap.fromTo(
        images,
        { yPercent: -58 },
        {
          yPercent: -42,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20">
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

        <p data-reveal className="mt-6 max-w-xl text-gray-400">
          Both options include a vehicle and repair walkthrough to estimate your quote.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {options.map((option, index) => (
            <div
              key={option.title}
              data-reveal
              className="relative h-96 overflow-hidden rounded-xl border border-gray-800"
            >
              <img
                ref={(el) => {
                  imageRefs.current[index] = el
                }}
                src={option.image}
                alt=""
                className="absolute inset-x-0 top-1/2 h-[130%] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/10" />

              <div className="absolute inset-x-0 bottom-0 p-8 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 ring-1 ring-green-500/40">
                  <option.icon className="text-green-500" size={22} />
                </span>
                <h3 className="mt-4 text-xl font-semibold text-white">{option.title}</h3>
                <p className="mt-2 text-sm text-gray-300">{option.description}</p>
                <ButtonLink to={option.to} className="mt-6 inline-flex">
                  Get a Quote
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
