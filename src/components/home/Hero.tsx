import { ButtonLink } from '../shared/Button'
import { Container } from '../shared/Container'

export function Hero() {
  return (
    <section className="border-b border-gray-800 bg-black py-20 sm:py-28">
      <Container className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-green-500">Unity Auto Group</p>
        <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
          Auto Repair, Your Way — Shop or Mobile
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-gray-400">
          Tell us about your vehicle and the repair you need, and get an estimated quote before you book —
          whether you bring it to our shop or we come to you.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ButtonLink to="/shop-service">Shop Service</ButtonLink>
          <ButtonLink to="/mobile-service" variant="secondary">
            Mobile Service
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
