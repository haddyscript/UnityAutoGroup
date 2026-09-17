import { Container } from '../components/shared/Container'
import { Button } from '../components/shared/Button'
import { openQuotePopup } from '../lib/quote'

const APPOINTMENT_URL =
  'https://appointment.protractor.com/1.0/Appointment/e2c118e9c5f84c6a83497ec3e2d4848f-770f656490cb4f48a534860c5b4f227f/Create'

export default function MobileService() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-4 pt-16 pb-8 text-center">
        <h1 className="text-4xl font-bold text-white">Mobile Service</h1>
        <p className="mt-4 text-gray-400">
          Unity Auto Group comes to you, fully equipped to perform the repair on-site. Start your quote below —
          enter your vehicle and repair details to get an estimate.
        </p>

        <Button onClick={openQuotePopup} className="mt-8">
          Start Your Quote
        </Button>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-8 text-center">
        <h2 className="text-2xl font-bold text-white">Book Your Mobile Appointment</h2>
        <p className="mt-2 text-gray-400">
          Pick a date and time below. Be sure to include the address where you'd like service in the notes section
          so we know where to send the technician.
        </p>
      </section>

      <Container className="pb-24">
        <iframe
          src={APPOINTMENT_URL}
          title="Unity Auto Group Mobile Appointment Scheduler"
          className="h-[3850px] w-full rounded-2xl border border-gray-800 bg-white sm:h-[2600px] lg:h-[2150px]"
          loading="lazy"
        />
      </Container>
    </>
  )
}
