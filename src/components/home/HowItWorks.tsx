import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Calculator, CalendarCheck2, Send } from 'lucide-react'
import { useEffect, useRef } from 'react'
import carCardsImage from '../../assets/images/car-cards.png'
import { Container } from '../shared/Container'
import { SectionHeading } from '../shared/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    step: '01',
    image: carCardsImage,
    title: 'Tell Us About Your Vehicle',
    description: 'Enter your vehicle details and the repair or service you need.',
  },
  {
    step: '02',
    icon: Calculator,
    title: 'Get an Estimated Quote',
    description: 'We look up parts, pricing, and labor to generate your estimate.',
  },
  {
    step: '03',
    icon: Send,
    title: 'Submit Your Request',
    description: 'Choose Shop or Mobile Service and send us your request.',
  },
  {
    step: '04',
    icon: CalendarCheck2,
    title: 'We Schedule Your Repair',
    description: 'Our team confirms parts, contacts you, and schedules the repair.',
  },
]

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          // Rewind once the section is scrolled back past, so returning to it replays the entrance every time.
          toggleActions: 'restart none none reset',
        },
      })

      tl.from('[data-heading]', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      })
        .fromTo(
          '[data-line]',
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: 'power3.inOut' },
          '-=0.35',
        )
        .fromTo(
          '[data-line-dot]',
          { left: '0%', opacity: 1 },
          { left: '100%', opacity: 0, duration: 1, ease: 'power2.inOut' },
          '<',
        )
        .from(
          '[data-badge]',
          {
            opacity: 0,
            scale: 0.4,
            duration: 0.6,
            ease: 'back.out(2.4)',
            stagger: 0.15,
            clearProps: 'transform',
          },
          '-=0.75',
        )
        .from(
          '[data-card]',
          {
            opacity: 0,
            y: 36,
            scale: 0.96,
            filter: 'blur(8px)',
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            clearProps: 'transform,filter',
          },
          '-=0.55',
        )
        .from(
          '[data-icon]',
          {
            opacity: 0,
            scale: 0.5,
            rotate: -8,
            duration: 0.5,
            ease: 'back.out(2.2)',
            stagger: 0.15,
            clearProps: 'transform',
          },
          '-=0.6',
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20">
      <Container>
        <div data-heading>
          <SectionHeading eyebrow="How It Works" title="From Estimate to Repair" />
        </div>

        <div className="relative mt-16">
          <div
            data-line
            className="absolute top-6 right-0 left-0 hidden h-px origin-left bg-gradient-to-r from-green-500/70 via-green-500/25 to-transparent lg:block"
          />
          <div
            data-line-dot
            className="absolute top-6 left-0 hidden size-2 -translate-y-1/2 rounded-full bg-green-400 opacity-0 shadow-[0_0_12px_4px_rgba(74,222,128,0.8)] lg:block"
          />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ step, icon: Icon, image, title, description }) => (
              <div key={step} className="group relative">
                <div
                  data-badge
                  className="relative z-10 flex size-12 items-center justify-center rounded-full border border-green-500/30 bg-black text-sm font-bold text-green-500 transition-all duration-300 group-hover:border-green-500 group-hover:bg-green-500 group-hover:text-black group-hover:shadow-[0_0_24px_rgba(34,197,94,0.5)]"
                >
                  {step}
                </div>

                <div
                  data-card
                  className="mt-6 h-full rounded-xl border border-gray-800 bg-gray-950 p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-green-500/40 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_40px_rgba(34,197,94,0.15)]"
                >
                  <div data-icon>
                    {image ? (
                      <img
                        src={image}
                        alt=""
                        className="h-9 w-auto origin-left object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      Icon && (
                        <Icon
                          className="size-6 text-green-500/70 transition-colors duration-300 group-hover:text-green-500"
                          strokeWidth={1.75}
                        />
                      )
                    )}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm text-gray-400">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
