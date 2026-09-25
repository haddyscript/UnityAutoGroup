import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { faqItems } from '../../data/faq'
import { Container } from '../shared/Container'
import { SectionHeading } from '../shared/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-reveal]', {
        opacity: 0,
        y: 32,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
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
    <section ref={sectionRef} className="py-20">
      <Container className="max-w-3xl">
        <div data-reveal>
          <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />
        </div>

        <div className="mt-12 space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <div key={item.question} data-reveal>
                <div
                  className={`overflow-hidden rounded-xl border bg-gray-950 transition-all duration-300 ${
                    isOpen
                      ? 'border-green-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(34,197,94,0.1)]'
                      : 'border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-semibold transition-colors duration-300 ${isOpen ? 'text-green-500' : 'text-white'}`}
                    >
                      {item.question}
                    </span>
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen ? 'border-green-500 bg-green-500 text-black' : 'border-gray-700 text-gray-400'
                      }`}
                    >
                      <ChevronDown
                        className={`size-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed text-gray-400">{item.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
