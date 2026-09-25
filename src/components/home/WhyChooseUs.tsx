import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import repairSimplifiedVideo from '../../assets/videos/repair-simplified.mp4'
import { Container } from '../shared/Container'

gsap.registerPlugin(ScrollTrigger)

const reasons = [
  {
    title: 'Shop or Mobile — Your Choice',
    description: 'Get repaired at our shop, or have a technician come to you. Either way, the same trusted service.',
  },
  {
    title: 'Transparent Estimates',
    description: 'Know what to expect with an estimated quote before you book your service.',
  },
  {
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
          // Rewind once the section is scrolled back past, so returning to it replays the entrance.
          toggleActions: 'restart none none reset',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-t border-gray-800 bg-gray-950 pt-32 pb-32 sm:pt-40 sm:pb-40">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={repairSimplifiedVideo}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gray-950/55" />

      <Container className="relative z-10">
        <div data-reveal className="text-center">
          <p className="text-sm font-semibold tracking-wide text-green-500 uppercase">Why Unity Auto Group</p>
          <h2 className="font-bebas mt-2 text-6xl text-white sm:text-8xl lg:text-[174px]">Repair, Simplified</h2>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {reasons.map((reason) => (
            <div key={reason.title} data-reveal className="text-center">
              <h3 className="text-lg font-semibold text-white">{reason.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{reason.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
