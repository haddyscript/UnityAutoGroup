import { Container } from '../components/shared/Container'
import { Button } from '../components/shared/Button'
import { openQuotePopup } from '../lib/quote'

const APPOINTMENT_URL =
  'https://appointment.protractor.com/1.0/Appointment/75ee1e86e1434f29830e39f6ed0454d4-ca00c9a737a04517a7ae107ea0709b55/Create'

export default function ShopService() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-4 pt-16 pb-8 text-center">
        <h1 className="text-4xl font-bold text-white">Shop Service</h1>
        <p className="mt-4 text-gray-400">
          Bring your vehicle to Unity Auto Group's physical repair shop. Start your quote below — enter your vehicle
          and repair details to get an estimate.
        </p>

        <Button onClick={openQuotePopup} className="mt-8">
          Start Your Quote
        </Button>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-8 text-center">
        <h2 className="text-2xl font-bold text-white">Book Your Appointment</h2>
        <p className="mt-2 text-gray-400">Pick a date and time for your shop visit below.</p>
      </section>

      <Container className="pb-24">
        <iframe
          src={APPOINTMENT_URL}
          title="Unity Auto Group Appointment Scheduler"
          className="h-[1100px] w-full rounded-2xl border border-gray-800 bg-white"
          loading="lazy"
        />
      </Container>
    </>
  )
}
