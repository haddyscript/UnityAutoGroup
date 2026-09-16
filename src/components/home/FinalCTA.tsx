import { ButtonLink } from '../shared/Button'
import { Container } from '../shared/Container'

export function FinalCTA() {
  return (
    <section className="border-t border-gray-800 bg-gray-950 py-20">
      <Container className="text-center">
        <h2 className="text-3xl font-bold text-white">Ready to Get Your Vehicle Repaired?</h2>
        <p className="mx-auto mt-4 max-w-xl text-gray-400">
          Get an estimated quote and choose Shop or Mobile Service today.
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
