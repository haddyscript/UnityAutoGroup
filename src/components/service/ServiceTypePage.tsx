import { CalendarDays, Check, Phone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { business } from '../../data/business'
import { services } from '../../data/services'
import type { ServiceCategory } from '../../data/services'
import { openQuotePopup } from '../../lib/quote'
import { Button, ButtonAnchor } from '../shared/Button'
import { Container } from '../shared/Container'

export interface ExpectStep {
  icon: LucideIcon
  title: string
  description: string
}

interface ServiceTypePageProps {
  type: Exclude<ServiceCategory, 'both'>
  title: string
  intro: string
  // Location, hours, and other practical details shown beside the service list.
  details: ReactNode
  steps: ExpectStep[]
  booking: {
    title: string
    note: string
    url: string
    iframeTitle: string
    iframeClassName: string
  }
}

// Shared layout for the Shop Service and Mobile Service pages: what's offered, where and when, what to
// expect, then the booking calendar.
export function ServiceTypePage({ type, title, intro, details, steps, booking }: ServiceTypePageProps) {
  const included = services.filter((service) => service.category === type || service.category === 'both')

  return (
    <>
      <section className="mx-auto max-w-3xl px-4 pt-16 pb-12 text-center">
        <p className="text-sm font-semibold tracking-widest text-green-500 uppercase">Unity Auto Group</p>
        <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">{title}</h1>
        <p className="mt-4 text-gray-400">{intro}</p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button onClick={openQuotePopup}>Start Your Quote</Button>
          <ButtonAnchor href="#book" variant="secondary">
            <CalendarDays size={14} />
            Book a Time
          </ButtonAnchor>
          <ButtonAnchor href={business.phoneHref} variant="secondary" aria-label={`Call us at ${business.phone}`}>
            <Phone size={14} />
            {business.phone}
          </ButtonAnchor>
        </div>
      </section>

      <Container className="grid gap-6 pb-16 lg:grid-cols-5">
        <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 sm:p-8 lg:col-span-3">
          <h2 className="text-xl font-bold text-white">What's Included</h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            {included.map((service) => (
              <li key={service.id} className="flex gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-green-500/15 text-green-500">
                  <Check size={13} strokeWidth={3} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">{service.title}</span>
                  <span className="mt-1 block text-sm text-gray-400">{service.description}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link to="/services" className="mt-6 inline-block text-sm font-semibold text-green-500 hover:underline">
            See the full service catalog →
          </Link>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 sm:p-8 lg:col-span-2">{details}</div>
      </Container>

      <section className="border-y border-gray-800 bg-gray-950 py-16">
        <Container>
          <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">What to Expect</h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, title: stepTitle, description }, index) => (
              <li key={stepTitle} className="rounded-xl border border-gray-800 bg-black p-6">
                <div className="flex items-center justify-between">
                  <Icon className="text-green-500" size={22} strokeWidth={1.75} />
                  <span className="text-xs font-semibold tracking-widest text-gray-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-4 font-semibold text-white">{stepTitle}</h3>
                <p className="mt-2 text-sm text-gray-400">{description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="book" className="scroll-mt-28 mx-auto max-w-3xl px-4 pt-16 pb-8 text-center lg:scroll-mt-36">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">{booking.title}</h2>
        <p className="mt-2 text-gray-400">{booking.note}</p>
      </section>

      <Container className="pb-24">
        <iframe
          src={booking.url}
          title={booking.iframeTitle}
          className={`w-full rounded-2xl border border-gray-800 bg-white ${booking.iframeClassName}`}
          loading="lazy"
        />
      </Container>
    </>
  )
}

interface DetailRowProps {
  icon: LucideIcon
  label: string
  children: ReactNode
}

export function DetailRow({ icon: Icon, label, children }: DetailRowProps) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 shrink-0 text-green-500" size={18} />
      <div className="text-sm text-gray-400">
        <span className="block font-semibold text-white">{label}</span>
        {children}
      </div>
    </div>
  )
}
