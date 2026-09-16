import { services } from '../../data/services'
import { ButtonLink } from '../shared/Button'
import { Container } from '../shared/Container'
import { SectionHeading } from '../shared/SectionHeading'
import { ServiceCard } from '../shared/ServiceCard'

export function ServicesOverview() {
  return (
    <section className="border-t border-gray-800 pt-32 pb-20 sm:pt-40">
      <Container>
        <SectionHeading eyebrow="Services" title="What We Repair" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <ButtonLink to="/services" variant="secondary">
            View All Services
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
