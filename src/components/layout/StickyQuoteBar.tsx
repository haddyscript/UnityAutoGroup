import { Phone } from 'lucide-react'
import { business } from '../../data/business'
import { openQuotePopup } from '../../lib/quote'
import { Button, ButtonAnchor } from '../shared/Button'

export function StickyQuoteBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-3 border-t border-white/10 bg-black/90 p-3 backdrop-blur-md lg:hidden">
      <ButtonAnchor href={business.phoneHref} variant="secondary" aria-label={`Call us at ${business.phone}`}>
        <Phone size={14} />
        Call Now
      </ButtonAnchor>
      <Button onClick={openQuotePopup}>Get a Quote</Button>
    </div>
  )
}
