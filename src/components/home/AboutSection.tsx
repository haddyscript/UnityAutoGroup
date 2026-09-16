import { ButtonLink } from '../shared/Button'
import { Container } from '../shared/Container'

export function AboutSection() {
  return (
    <section className="border-t border-gray-800 py-20">
      <Container className="text-center">
        <h2 className="text-3xl font-bold text-white">About Unity Auto Group</h2>
        <p className="mx-auto mt-4 max-w-2xl text-gray-400">
          Full company story, credentials, and team information will be added here once provided by Unity Auto
          Group.
        </p>
        <ButtonLink to="/about" variant="secondary" className="mt-6 inline-flex">
          Learn More
        </ButtonLink>
      </Container>
    </section>
  )
}
