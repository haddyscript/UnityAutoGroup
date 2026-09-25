import { Container } from '../shared/Container'
import { openQuotePopup } from '../../lib/quote'

export function FinalCTA() {
  return (
    <section className="bg-green-500 py-20">
      <Container className="text-center">
        <h2 className="text-3xl font-extrabold text-black uppercase">Ready to Get Your Vehicle Repaired?</h2>
        <p className="mx-auto mt-4 max-w-xl text-black/70">
          Get an estimated quote, then choose Shop or Mobile Service.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={openQuotePopup}
            className="rounded-full bg-black px-6 py-2.5 text-xs font-semibold tracking-wide text-white uppercase transition-colors hover:bg-black/80"
          >
            Get Instant Quote
          </button>
          <a
            href="tel:+17709985850"
            className="rounded-full px-6 py-2.5 text-xs font-semibold tracking-wide text-black uppercase ring-1 ring-black/60 transition-colors hover:bg-black/10"
          >
            Call (770) 998-5850
          </a>
        </div>
      </Container>
    </section>
  )
}
