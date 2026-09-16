import { Button } from '../components/shared/Button'
import { openQuotePopup } from '../lib/quote'

export default function ShopService() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-white">Shop Service</h1>
      <p className="mt-4 text-gray-400">
        Bring your vehicle to Unity Auto Group's physical repair shop. Start your quote below — enter your vehicle
        and repair details to get an estimate.
      </p>

      <Button onClick={openQuotePopup} className="mt-8">
        Start Your Quote
      </Button>
    </section>
  )
}
