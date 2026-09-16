import { Wrench } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { navItems } from '../../data/nav'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-800 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2 text-white">
            <Wrench className="text-green-500" size={22} />
            <span className="text-base font-bold">Unity Auto Group</span>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className="text-sm text-gray-400 hover:text-white">
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <p className="mt-8 text-xs text-gray-500">
          &copy; {year} Unity Auto Group. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
