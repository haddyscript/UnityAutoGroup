// Third-party quoting tool — blocks iframe embedding (X-Frame-Options), so it opens in a floating popup window instead.
export const QUOTE_URL = 'https://autorepaircompare.com/quoteISE/OneIndex?accountNumber=AA9324'

const POPUP_WIDTH = 480
const POPUP_HEIGHT = 800

export function openQuotePopup() {
  const left = window.screenX + (window.outerWidth - POPUP_WIDTH) / 2
  const top = window.screenY + (window.outerHeight - POPUP_HEIGHT) / 2
  // No noopener in the features: with it, window.open always returns null, so the fallback below
  // would open a second tab on every click. The opener link is cut by hand instead.
  const popup = window.open(
    QUOTE_URL,
    'unity-auto-group-quote',
    `width=${POPUP_WIDTH},height=${POPUP_HEIGHT},left=${left},top=${top}`,
  )

  if (popup) {
    popup.opener = null
  } else {
    window.open(QUOTE_URL, '_blank', 'noopener,noreferrer')
  }
}
