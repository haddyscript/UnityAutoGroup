import { Store } from 'lucide-react'
import { ButtonLink } from '../shared/Button'
import { Container } from '../shared/Container'

export function ShopServiceSection() {
  return (
    <section className="border-t border-gray-800 py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <Store className="text-green-500" size={32} />
          <h2 className="mt-4 text-3xl font-bold text-white">Shop Service</h2>
          <p className="mt-4 text-gray-400">
            Prefer to bring your vehicle in? Visit Unity Auto Group's physical repair shop for hands-on service
            from our team.
          </p>
          <ButtonLink to="/shop-service" className="mt-6 inline-flex">
            Learn More
          </ButtonLink>
        </div>
        <div className="aspect-video rounded-lg border border-gray-800 bg-gray-950" />
      </Container>
    </section>
  )
}
