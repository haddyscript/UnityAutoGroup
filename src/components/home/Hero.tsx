import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import heroVideo from '../../assets/videos/home-hero-video.mp4'
import mechanicVideo from '../../assets/videos/mechanic-repairing.mp4'
import { ButtonLink } from '../shared/Button'
import { Marquee } from '../shared/Marquee'

gsap.registerPlugin(ScrollTrigger)

// Played in order, then back to the first, crossfading between clips.
const heroVideos = [heroVideo, mechanicVideo]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLDivElement>(null)
  const clipRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [activeClip, setActiveClip] = useState(0)
  // Later clips wait to download until the first one is playing, so they never slow the first paint.
  const [preloadRest, setPreloadRest] = useState(false)
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

  useEffect(() => {
    const clip = clipRefs.current[activeClip]
    if (!clip) return
    clip.currentTime = 0
    clip.play().catch(() => {})
  }, [activeClip])

  return (
    <section ref={sectionRef} className="theme-dark relative flex min-h-screen items-end overflow-hidden bg-black">
      <div ref={videoRef} className="absolute inset-0">
        {heroVideos.map((src, index) => (
          <video
            key={src}
            ref={(el) => {
              clipRefs.current[index] = el
            }}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              index === activeClip ? 'opacity-100' : 'opacity-0'
            }`}
            src={src}
            autoPlay={index === 0}
            preload={index === 0 || preloadRest ? 'auto' : 'none'}
            muted
            playsInline
            onPlaying={index === 0 ? () => setPreloadRest(true) : undefined}
            onEnded={() => setActiveClip((index + 1) % heroVideos.length)}
          />
        ))}
      </div>
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
