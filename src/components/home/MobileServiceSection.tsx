import { Car } from 'lucide-react'
import { ButtonLink } from '../shared/Button'
import { Container } from '../shared/Container'

export function MobileServiceSection() {
  return (
    <section className="border-t border-gray-800 bg-gray-950 py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <div className="order-2 aspect-video rounded-lg border border-gray-800 bg-black lg:order-1" />
        <div className="order-1 lg:order-2">
          <Car className="text-green-500" size={32} />
          <h2 className="mt-4 text-3xl font-bold text-white">Mobile Service</h2>
          <p className="mt-4 text-gray-400">
            Can't make it to the shop? Unity Auto Group comes to you, fully equipped to perform the repair right
            where your vehicle is parked.
          </p>
          <ButtonLink to="/mobile-service" variant="secondary" className="mt-6 inline-flex">
            Learn More
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
