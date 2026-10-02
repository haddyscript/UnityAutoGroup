import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import blackAndWhiteSmilingVideo from '../../assets/videos/black-and-white-men-smiling.mp4'
import manWorkingVideo from '../../assets/videos/black-man-working-on.mp4'
import heroVideo from '../../assets/videos/home-hero-video.mp4'
import happyFacesVideo2 from '../../assets/videos/happy-face-mechanics-02.mp4'
import happyFacesVideo from '../../assets/videos/happy-faces-mechanics.mp4'
import mechanicVideo from '../../assets/videos/mechanic-repairing.mp4'
import { ButtonLink } from '../shared/Button'
import { Marquee } from '../shared/Marquee'

gsap.registerPlugin(ScrollTrigger)

// Slides play in order, then back to the first, crossfading between them. A slide with two clips plays
// them side by side (first on the left) and moves on once both have finished.
const heroSlides = [
  [heroVideo],
  [mechanicVideo],
  [happyFacesVideo],
  [happyFacesVideo2],
  [blackAndWhiteSmilingVideo, manWorkingVideo],
]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLDivElement>(null)
  const clipRefs = useRef<(HTMLVideoElement | null)[][]>(heroSlides.map(() => []))
  const endedClips = useRef(new Set<number>())
  const [activeSlide, setActiveSlide] = useState(0)
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
    endedClips.current.clear()
    for (const clip of clipRefs.current[activeSlide]) {
      if (!clip) continue
      clip.currentTime = 0
      clip.play().catch(() => {})
    }
  }, [activeSlide])

  const handleClipEnded = (slideIndex: number, clipIndex: number) => {
    if (slideIndex !== activeSlide) return
    endedClips.current.add(clipIndex)
    if (endedClips.current.size === heroSlides[slideIndex].length) {
      setActiveSlide((slideIndex + 1) % heroSlides.length)
    }
  }

  return (
    <section ref={sectionRef} className="theme-dark relative flex min-h-screen items-end overflow-hidden bg-black">
      <div ref={videoRef} className="absolute inset-0">
        {heroSlides.map((clips, slideIndex) => (
          <div
            key={slideIndex}
            className={`absolute inset-0 grid grid-rows-1 gap-px transition-opacity duration-1000 ${
              clips.length > 1 ? 'grid-cols-2' : ''
            } ${slideIndex === activeSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            {clips.map((src, clipIndex) => (
              <video
                key={src}
                ref={(el) => {
                  clipRefs.current[slideIndex][clipIndex] = el
                }}
                className="h-full min-h-0 w-full min-w-0 object-cover"
                src={src}
                autoPlay={slideIndex === 0}
                preload={slideIndex === 0 || preloadRest ? 'auto' : 'none'}
                muted
                playsInline
                onPlaying={slideIndex === 0 ? () => setPreloadRest(true) : undefined}
                onEnded={() => handleClipEnded(slideIndex, clipIndex)}
              />
            ))}
          </div>
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
