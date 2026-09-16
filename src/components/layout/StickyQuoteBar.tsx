import { ButtonLink } from '../shared/Button'

export function StickyQuoteBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-gray-800 bg-black p-3 lg:hidden">
      <ButtonLink to="/" className="w-full">
        Get a Quote
      </ButtonLink>
    </div>
  )
}
