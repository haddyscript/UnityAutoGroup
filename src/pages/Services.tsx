import { Check } from 'lucide-react'
import serviceRepairBg from '../assets/images/services/service-repair-bg.webp'
import { Container } from '../components/shared/Container'
import { Button } from '../components/shared/Button'
import { serviceCatalog } from '../data/serviceCatalog'
import { openQuotePopup } from '../lib/quote'

export default function Services() {
  return (
    <>
      <section className="relative overflow-hidden py-16 text-center sm:py-20">
        <img src={serviceRepairBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />

        <Container className="relative z-10">
          <p className="text-sm font-semibold tracking-widest text-green-500 uppercase">/ Services /</p>
          <h1 className="font-bebas mt-4 text-6xl text-white uppercase sm:text-7xl">Full Service Catalog</h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Every service Unity Auto Group offers, available at our shop or on-site with Mobile Service.
          </p>
          <Button onClick={openQuotePopup} className="mt-8">
            Start Your Quote
          </Button>
        </Container>
      </section>

      <Container className="pb-24">
        <div className="space-y-16">
          {serviceCatalog.map((group) => (
            <div key={group.category}>
              <h2 className="text-xl font-bold text-white">{group.category}</h2>
              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                    <Check className="mt-0.5 shrink-0 text-green-500" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </>
  )
}
