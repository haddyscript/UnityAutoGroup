import { faqItems } from '../../data/faq'
import { Container } from '../shared/Container'
import { SectionHeading } from '../shared/SectionHeading'

export function FAQSection() {
  return (
    <section className="py-20">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />
        <div className="mt-12 space-y-6">
          {faqItems.map((item) => (
            <div key={item.question} className="rounded-lg border border-gray-800 bg-gray-950 p-6">
              <h3 className="font-semibold text-white">{item.question}</h3>
              <p className="mt-2 text-sm text-gray-400">{item.answer}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
