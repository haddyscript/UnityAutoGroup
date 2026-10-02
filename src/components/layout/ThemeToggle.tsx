import { Moon, Sun } from 'lucide-react'

const storageKey = 'theme'

type Theme = 'dark' | 'light'

// Picks the theme before the first render so the page never flashes the wrong one. Light is the
// default; a visitor's saved choice wins, and a ?theme=light or ?theme=dark link sets that choice.
export function applyInitialTheme() {
  let theme: Theme = 'light'
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('theme')
    if (fromUrl === 'light' || fromUrl === 'dark') localStorage.setItem(storageKey, fromUrl)
    if (localStorage.getItem(storageKey) === 'dark') theme = 'dark'
  } catch {
    // Storage can be blocked; fall back to the light default.
  }
  document.documentElement.dataset.theme = theme
}

export function ThemeToggle() {
  const isLight = document.documentElement.dataset.theme === 'light'

  // Reload rather than swap live: the scroll animations read their colors once when they are built.
  const toggle = () => {
    const next: Theme = isLight ? 'dark' : 'light'
    const url = new URL(window.location.href)
    url.searchParams.delete('theme')
    try {
      localStorage.setItem(storageKey, next)
    } catch {
      // Storage is blocked, so carry the choice in the URL instead.
      url.searchParams.set('theme', next)
    }
    window.location.replace(url)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      className="fixed bottom-24 left-4 z-[60] inline-flex items-center gap-2 rounded-full bg-gray-950/90 px-4 py-2 text-[11px] font-semibold tracking-wide text-white uppercase shadow-lg ring-1 ring-gray-700 backdrop-blur lg:bottom-6"
    >
      {isLight ? <Moon size={14} /> : <Sun size={14} />}
      {isLight ? 'Dark mode' : 'Light mode'}
    </button>
  )
}
