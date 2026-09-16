import { testimonials } from '../../data/testimonials'
import { Container } from '../shared/Container'
import { SectionHeading } from '../shared/SectionHeading'

export function TestimonialsSection() {
  return (
    <section className="border-t border-gray-800 bg-gray-950 py-20">
      <Container>
        <SectionHeading eyebrow="Testimonials" title="What Customers Say" />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="rounded-lg border border-gray-800 bg-black p-6">
              <p className="text-gray-300">&ldquo;{testimonial.quote}&rdquo;</p>
              <p className="mt-4 text-sm font-semibold text-white">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
