import { useSyncExternalStore } from 'react'

// Lets the page wait for the opening splash: the hero holds its first slide until the splash starts to
// lift, so visitors see that slide from its first frame.
const EVENT = 'site-preloader-revealed'
let revealed = false

export function markPreloaderRevealed() {
  revealed = true
  window.dispatchEvent(new Event(EVENT))
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange)
  return () => window.removeEventListener(EVENT, onChange)
}

export function usePreloaderRevealed() {
  return useSyncExternalStore(subscribe, () => revealed)
}
