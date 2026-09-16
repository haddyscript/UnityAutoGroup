import { Container } from '../shared/Container'
import { SectionHeading } from '../shared/SectionHeading'

const steps = [
  {
    step: '1',
    title: 'Tell Us About Your Vehicle',
    description: 'Enter your vehicle details and the repair or service you need.',
  },
  {
    step: '2',
    title: 'Get an Estimated Quote',
    description: 'We look up parts, pricing, and labor to generate your estimate.',
  },
  {
    step: '3',
    title: 'Submit Your Request',
    description: 'Choose Shop or Mobile Service and send us your request.',
  },
  {
    step: '4',
    title: 'We Schedule Your Repair',
    description: 'Our team confirms parts, contacts you, and schedules the repair.',
  },
]

export function HowItWorks() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow="How It Works" title="From Estimate to Repair" />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => (
            <div key={item.step} className="rounded-lg border border-gray-800 bg-gray-950 p-6">
              <span className="text-2xl font-bold text-green-500">{item.step}</span>
              <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
