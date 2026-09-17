import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import {
  CircleAlert,
  Compass,
  Cpu,
  Disc3,
  Droplets,
  ShieldAlert,
  Snowflake,
  Thermometer,
  Zap,
} from 'lucide-react'
import type { ComponentType } from 'react'
import { useEffect, useRef, useState } from 'react'
import type { SymptomIcon, SymptomUrgency } from '../../data/symptoms'
import { symptoms } from '../../data/symptoms'
import { openQuotePopup } from '../../lib/quote'
import { Button } from '../shared/Button'
import { Container } from '../shared/Container'

gsap.registerPlugin(ScrollTrigger, SplitText)

const iconMap: Record<SymptomIcon, ComponentType<{ className?: string; size?: number }>> = {
  brakes: Disc3,
  engine: Cpu,
  climate: Snowflake,
  steering: Compass,
  electrical: Zap,
  vibration: ShieldAlert,
  leak: Droplets,
  cooling: Thermometer,
}

const urgencyLabels: Record<SymptomUrgency, string> = {
  routine: 'Routine',
  moderate: 'Moderate',
  immediate: 'Immediate',
}

const urgencyBadgeClasses: Record<SymptomUrgency, string> = {
  routine: 'bg-white/5 text-gray-300 ring-white/10',
  moderate: 'bg-amber-500/10 text-amber-400 ring-amber-500/30',
  immediate: 'bg-red-500/10 text-red-400 ring-red-500/40',
}

const urgencyTextClasses: Record<SymptomUrgency, string> = {
  routine: 'text-gray-300',
  moderate: 'text-amber-400',
  immediate: 'text-red-400',
}

export function SymptomChecker() {
  const sectionRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const copyRef = useRef<HTMLParagraphElement>(null)
  const rowsRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const shimmerRef = useRef<HTMLDivElement>(null)

  const [selectedId, setSelectedId] = useState(symptoms[0].id)
  const selected = symptoms.find((symptom) => symptom.id === selectedId) ?? symptoms[0]

  useEffect(() => {
    // Entrance choreography: pill → masked heading lines → copy → symptom rows sliding in from the
    // left while the telemetry panel settles in from the right, finished by a single light sweep.
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const split = SplitText.create(headingRef.current, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) => {
          const tl = gsap.timeline({
            defaults: { ease: 'power3.out' },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              // Rewind once the section is scrolled back past, so returning to it replays the entrance.
              toggleActions: 'restart none none reset',
            },
          })

          tl.from(eyebrowRef.current, { opacity: 0, y: 14, duration: 0.6 })
            .from(self.lines, { yPercent: 110, duration: 0.9, stagger: 0.12, ease: 'power4.out' }, '-=0.3')
            .from(copyRef.current, { opacity: 0, y: 20, duration: 0.7 }, '-=0.55')
            .from(
              rowsRef.current?.children ?? [],
              { opacity: 0, x: -36, duration: 0.7, stagger: 0.07 },
              '-=0.45',
            )
            .from(
              panelRef.current,
              { opacity: 0, x: 44, scale: 0.97, filter: 'blur(10px)', duration: 1 },
              '<0.05',
            )
            .fromTo(
              shimmerRef.current,
              { xPercent: 0, opacity: 0 },
              { xPercent: 400, opacity: 1, duration: 1.1, ease: 'power1.inOut' },
              '-=0.5',
            )
            .to(shimmerRef.current, { opacity: 0, duration: 0.35 }, '-=0.35')

          return tl
        },
      })

      return () => split.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className="border-t border-gray-800 bg-black py-24 sm:py-32">
      <Container>
        <div className="text-center">
          <p ref={eyebrowRef} className="text-sm font-semibold tracking-widest text-green-500 uppercase">
            / Symptom Assistant /
          </p>
          <h2
            ref={headingRef}
            className="font-bebas mx-auto mt-4 max-w-4xl text-6xl leading-[1.05] text-white uppercase sm:text-8xl"
          >
            Hear a Strange Noise or See a Warning Light?
          </h2>
          <p ref={copyRef} className="font-garamond mx-auto mt-6 max-w-2xl text-lg text-gray-300 sm:text-xl">
            Select what you are noticing while driving. We match it to the likely cause and the diagnostic our
            technicians actually run — then you can request an upfront estimate.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          <div ref={rowsRef} className="space-y-3">
            {symptoms.map((symptom) => {
              const Icon = iconMap[symptom.icon]
              const isSelected = symptom.id === selected.id

              return (
                <div key={symptom.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(symptom.id)}
                    aria-pressed={isSelected}
                    className={`group relative flex w-full cursor-pointer items-center gap-4 overflow-hidden rounded-xl border p-4 text-left transition duration-300 ease-out ${
                      isSelected
                        ? 'border-green-500/70 bg-green-500/[0.07]'
                        : 'border-white/5 bg-gray-950 hover:-translate-y-0.5 hover:border-green-500/40 hover:bg-white/[0.04] hover:shadow-lg hover:shadow-green-500/10'
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`absolute inset-y-0 left-0 w-0.5 origin-top bg-green-500 transition-transform duration-300 ease-out ${
                        isSelected ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'
                      }`}
                    />
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-green-500 transition-colors duration-300 ${
                        isSelected ? 'bg-green-500/15' : 'bg-white/5 group-hover:bg-green-500/10'
                      }`}
                    >
                      <Icon size={20} />
                    </span>
                    <span className="min-w-0 flex-1 transition-transform duration-300 ease-out group-hover:translate-x-1">
                      <span className="block text-xs font-semibold tracking-wide text-green-500 uppercase">
                        {symptom.category}
                      </span>
                      <span className="mt-1 block font-semibold text-white">{symptom.label}</span>
                    </span>
                    <span
                      className={`shrink-0 rounded-md px-2.5 py-1 text-xs font-semibold ring-1 transition-colors duration-300 ${urgencyBadgeClasses[symptom.urgency]}`}
                    >
                      {urgencyLabels[symptom.urgency]}
                    </span>
                  </button>
                </div>
              )
            })}
          </div>

          <div
            ref={panelRef}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-gray-950 p-6 shadow-2xl shadow-black/60 sm:p-8 lg:sticky lg:top-24"
          >
            <div
              ref={shimmerRef}
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0"
            />

            <div className="relative flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <p className="text-sm font-semibold tracking-widest text-green-500 uppercase">Diagnostic Telemetry</p>
              <p className={`inline-flex items-center gap-1.5 text-sm ${urgencyTextClasses[selected.urgency]}`}>
                <CircleAlert size={16} />
                Urgency: {urgencyLabels[selected.urgency]}
              </p>
            </div>

            <h3 className="relative mt-6 text-2xl font-bold text-white">"{selected.label}"</h3>
            <p className="relative mt-3 text-sm text-gray-400">Category: {selected.category}</p>

            <div className="relative mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm font-semibold tracking-wide text-white uppercase">Most Likely Root Cause:</p>
              <p className="mt-2 text-gray-300">{selected.rootCause}</p>
            </div>

            <div className="relative mt-6">
              <p className="text-sm font-semibold text-white">Diagnostic We Run:</p>
              <p className="mt-1 text-sm text-gray-400">{selected.diagnosticService}</p>
            </div>

            <div className="relative mt-6">
              <p className="text-sm font-semibold text-white">The Unity Auto Group Guarantee:</p>
              <p className="mt-1 text-sm text-gray-400">
                We confirm every symptom with computerized testing before installing any parts, and you get an
                estimated quote before the work is booked.
              </p>
            </div>

            <Button onClick={openQuotePopup} className="relative mt-8 w-full">
              Get Upfront Estimate for This Issue
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
