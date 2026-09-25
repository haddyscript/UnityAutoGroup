import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import heroVideo from '../../assets/videos/home-hero-video.mp4'
import { ButtonLink } from '../shared/Button'
import { Marquee } from '../shared/Marquee'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const fadeRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTrigger = {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }

      gsap.to(videoRef.current, { scale: 1.15, ease: 'none', scrollTrigger })
      gsap.to(fadeRef.current, { opacity: 1, ease: 'none', scrollTrigger })
      gsap.to(contentRef.current, { opacity: 0, y: -40, ease: 'none', scrollTrigger })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-end overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
      <div ref={fadeRef} className="absolute inset-0 bg-black opacity-0" />

      <div ref={contentRef} className="relative z-10 ml-auto w-full max-w-xl px-4 pt-40 pb-16 sm:px-8 sm:pb-24">
        <Marquee
          text="Unity Auto Group"
          className="w-56 sm:w-64"
          textClassName="font-mono text-xs tracking-[0.3em] text-green-500 uppercase"
        />
        <h1 className="mt-4 font-serif text-4xl text-white italic sm:text-5xl">
          We Come To You —
          <br />
          Or You Come To Us
        </h1>
        <p className="mt-6 font-mono text-xs leading-relaxed tracking-wide text-gray-300 uppercase sm:text-sm">
          Tell us about your vehicle and the repair you need, and get an estimated quote before you book —
          whether you bring it to our shop or we come to you.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <ButtonLink to="/shop-service">Shop Service</ButtonLink>
          <ButtonLink to="/mobile-service" variant="secondary">
            Mobile Service
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
