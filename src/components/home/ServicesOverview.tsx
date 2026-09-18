import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useEffect, useRef } from 'react'
import servicesVideo from '../../assets/videos/for-services-vid.mp4'
import { services } from '../../data/services'
import { ButtonLink } from '../shared/Button'
import { Container } from '../shared/Container'
import { ServiceCard } from '../shared/ServiceCard'

gsap.registerPlugin(ScrollTrigger, SplitText)

export function ServicesOverview() {
  const sectionRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const listWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Re-triggers every time the hero re-enters (scroll away and back reruns the whole intro).
      const heroTrigger = {
        trigger: heroRef.current,
        start: 'top 70%',
        toggleActions: 'restart none none reset',
      } as const

      const split = SplitText.create(headingRef.current, {
        type: 'chars',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.chars, {
            opacity: 0,
            yPercent: 120,
            rotateZ: 6,
            duration: 0.9,
            stagger: 0.02,
            ease: 'power4.out',
            scrollTrigger: heroTrigger,
          }),
      })

      gsap.fromTo(
        videoRef.current,
        { scale: 1.18, opacity: 0.25 },
        { scale: 1, opacity: 1, duration: 1.8, ease: 'power2.out', scrollTrigger: heroTrigger },
      )

      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 0.8, duration: 1.4, ease: 'power2.out', scrollTrigger: heroTrigger },
      )

      gsap.from('[data-reveal-hero]', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: heroTrigger,
      })

      // Cards and the CTA reveal again on their own once they re-enter, independent of the hero.
      gsap.from('[data-reveal-list]', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: listWrapRef.current,
          start: 'top 85%',
          toggleActions: 'restart none none reset',
        },
      })

      return () => split.revert()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="border-t border-gray-800 bg-black">
      <div ref={heroRef} className="relative overflow-hidden py-32 sm:py-40">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={servicesVideo}
          autoPlay
          muted
          loop
          playsInline
        />
        <div ref={overlayRef} className="absolute inset-0 bg-black/80" />

        <Container className="relative z-10 text-center">
          <p data-reveal-hero className="text-sm font-semibold tracking-widest text-green-500 uppercase">
            / Services /
          </p>
          <h2 ref={headingRef} className="font-bebas mt-4 text-6xl text-white uppercase sm:text-8xl lg:text-[170px]">
            What We Repair
          </h2>

          <p
            data-reveal-hero
            className="font-garamond mx-auto mt-12 max-w-2xl text-lg text-gray-300 italic sm:mt-16 sm:text-xl"
          >
            "Precision repair, done right — whether you bring it to us or we come to you, Unity Auto Group treats
            every vehicle like it's the only one in the shop."
          </p>
        </Container>
      </div>

      <Container className="pt-20 pb-32 sm:pb-40">
        <div ref={listWrapRef}>
          <div className="mx-auto max-w-3xl border-t border-gray-800">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div data-reveal-list className="mt-10 text-center">
            <ButtonLink to="/services" variant="secondary">
              View All Services
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  )
}
