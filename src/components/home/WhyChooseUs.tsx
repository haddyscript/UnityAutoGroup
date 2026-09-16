import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Clock, MapPin, ShieldCheck } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Container } from '../shared/Container'
import { SectionHeading } from '../shared/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const reasons = [
  {
    icon: MapPin,
    title: 'Shop or Mobile — Your Choice',
    description: 'Get repaired at our shop, or have a technician come to you. Either way, the same trusted service.',
  },
  {
    icon: ShieldCheck,
    title: 'Transparent Estimates',
    description: 'Know what to expect with an estimated quote before you book your service.',
  },
  {
    icon: Clock,
    title: 'Convenient Scheduling',
    description: 'Submit your request and our team will follow up to confirm parts and schedule your repair.',
  },
]

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-reveal]', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play reverse play reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="border-t border-gray-800 bg-gray-950 pt-32 pb-20 sm:pt-40">
      <Container>
        <div data-reveal>
          <SectionHeading eyebrow="Why Unity Auto Group" title="Repair, Simplified" />
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {reasons.map((reason) => (
            <div key={reason.title} data-reveal className="text-center">
              <reason.icon className="mx-auto text-green-500" size={28} />
              <h3 className="mt-4 text-lg font-semibold text-white">{reason.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{reason.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
