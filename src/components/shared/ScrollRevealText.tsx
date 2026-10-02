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
        const styles = getComputedStyle(document.documentElement)
        gsap.set(self.chars, { color: styles.getPropertyValue('--reveal-dim').trim() })
        return gsap.to(self.chars, {
          color: styles.getPropertyValue('--reveal-lit').trim(),
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
