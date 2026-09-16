import { ButtonLink } from '../shared/Button'

export function StickyQuoteBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-black/90 p-3 backdrop-blur-md lg:hidden">
      <ButtonLink to="/" className="w-full">
        Get a Quote
      </ButtonLink>
    </div>
  )
}
