import { Car, Store } from 'lucide-react'
import { ButtonLink } from '../shared/Button'
import { Container } from '../shared/Container'
import { SectionHeading } from '../shared/SectionHeading'

const options = [
  {
    icon: Store,
    title: 'Shop Service',
    description: "Bring your vehicle to Unity Auto Group's physical repair shop.",
    to: '/shop-service',
  },
  {
    icon: Car,
    title: 'Mobile Service',
    description: 'Our technician comes to you, fully equipped to repair on-site.',
    to: '/mobile-service',
  },
]

export function QuoteEntry() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Get Started"
          title="Choose How You'd Like to Be Serviced"
          description="Both options include a vehicle and repair walkthrough to estimate your quote."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {options.map((option) => (
            <div key={option.title} className="rounded-lg border border-gray-800 bg-gray-950 p-8 text-center">
              <option.icon className="mx-auto text-green-500" size={32} />
              <h3 className="mt-4 text-xl font-semibold text-white">{option.title}</h3>
              <p className="mt-2 text-gray-400">{option.description}</p>
              <ButtonLink to={option.to} className="mt-6 inline-flex">
                Get a Quote
              </ButtonLink>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
