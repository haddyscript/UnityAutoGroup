import { NavLink } from 'react-router-dom'
import { navItems } from '../../data/nav'
import { ButtonLink } from '../shared/Button'

interface MobileNavProps {
  open: boolean
  onNavigate: () => void
}

export function MobileNav({ open, onNavigate }: MobileNavProps) {
  if (!open) return null

  return (
    <div className="border-t border-gray-800 bg-black lg:hidden">
      <nav className="flex flex-col gap-1 px-4 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={({ isActive }) =>
              `rounded-md px-3 py-2 text-sm font-medium ${
                isActive ? 'bg-gray-900 text-green-500' : 'text-gray-300 hover:bg-gray-900 hover:text-white'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
        <ButtonLink to="/" onClick={onNavigate} className="mt-2 w-full">
          Get a Quote
        </ButtonLink>
      </nav>
    </div>
  )
}
