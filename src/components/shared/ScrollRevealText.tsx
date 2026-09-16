import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger, SplitText)

interface ScrollRevealTextProps {
  text: string
  className?: string
}

export function ScrollRevealText({ text, className = '' }: ScrollRevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const split = SplitText.create(el, {
      type: 'words, chars',
      autoSplit: true,
      onSplit: (self) => {
        gsap.set(self.chars, { color: '#4b5563' })
        return gsap.to(self.chars, {
          color: '#ffffff',
          stagger: 0.03,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'bottom 35%',
            scrub: 1,
          },
        })
      },
    })

    return () => split.revert()
  }, [text])

  return (
    <p ref={ref} className={className}>
      {text}
    </p>
  )
}
