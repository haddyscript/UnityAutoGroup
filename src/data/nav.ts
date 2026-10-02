export interface NavItem {
  label: string
  path: string
}

export const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Shop Service', path: '/shop-service' },
  { label: 'Mobile Service', path: '/mobile-service' },
]
