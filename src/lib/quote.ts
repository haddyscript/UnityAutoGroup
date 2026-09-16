// Third-party quoting tool — blocks iframe embedding (X-Frame-Options), so it opens in a floating popup window instead.
export const QUOTE_URL = 'https://autorepaircompare.com/quoteISE/OneIndex?accountNumber=AA9324'

const POPUP_WIDTH = 480
const POPUP_HEIGHT = 800

export function openQuotePopup() {
  const left = window.screenX + (window.outerWidth - POPUP_WIDTH) / 2
  const top = window.screenY + (window.outerHeight - POPUP_HEIGHT) / 2
  const popup = window.open(
    QUOTE_URL,
    'unity-auto-group-quote',
    `width=${POPUP_WIDTH},height=${POPUP_HEIGHT},left=${left},top=${top},noopener,noreferrer`,
  )

  if (!popup) {
    window.open(QUOTE_URL, '_blank', 'noopener,noreferrer')
  }
}
