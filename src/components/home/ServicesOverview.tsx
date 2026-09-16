import servicesVideo from '../../assets/videos/for-services-vid.mp4'
import { services } from '../../data/services'
import { ButtonLink } from '../shared/Button'
import { Container } from '../shared/Container'
import { ServiceCard } from '../shared/ServiceCard'

export function ServicesOverview() {
  return (
    <section className="border-t border-gray-800 bg-black">
      <div className="relative overflow-hidden py-32 sm:py-40">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={servicesVideo}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/80" />

        <Container className="relative z-10 text-center">
          <p className="text-sm font-semibold tracking-widest text-green-500 uppercase">/ Services /</p>
          <h2 className="font-bebas mt-4 text-6xl text-white uppercase sm:text-8xl lg:text-[170px]">
            What We Repair
          </h2>

          <p className="font-garamond mx-auto mt-12 max-w-2xl text-lg text-gray-300 italic sm:mt-16 sm:text-xl">
            "Precision repair, done right — whether you bring it to us or we come to you, Unity Auto Group treats
            every vehicle like it's the only one in the shop."
          </p>
        </Container>
      </div>

      <Container className="pt-20 pb-32 sm:pb-40">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
