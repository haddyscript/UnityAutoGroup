import { Award, Clock, Mail, MapPin, Phone, ShieldCheck, Wrench } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { navItems } from '../../data/nav'
import { services } from '../../data/services'
import { Container } from '../shared/Container'
import { ButtonLink } from '../shared/Button'

// Placeholder contact info, hours, and certifications — replace once Unity Auto Group confirms real details.
const badges = [
  { icon: Award, label: 'Certification (TBD)' },
  { icon: ShieldCheck, label: 'Facility Approval (TBD)' },
  { icon: Clock, label: 'Warranty Terms (TBD)' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-800 bg-black">
      <div className="border-b border-gray-800">
        <Container className="flex flex-col gap-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-green-500">
              <Wrench className="text-black" size={22} />
            </span>
            <div>
              <p className="text-lg font-bold text-white">
                UNITY <span className="text-green-500">AUTO GROUP</span>
              </p>
              <p className="text-xs text-gray-500">Tagline (TBD)</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {badges.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-gray-700 px-4 py-2 text-xs text-gray-300"
              >
                <Icon className="text-green-500" size={16} />
                {label}
              </span>
            ))}
          </div>
        </Container>
      </div>

      <Container className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-sm font-bold tracking-wide text-white uppercase">About Unity Auto Group</h3>
          <p className="mt-4 text-sm text-gray-400">
            Company overview (TBD) — replace with the approved company description once confirmed by Unity Auto
            Group.
          </p>

          <p className="mt-6 text-sm font-semibold text-green-500">Hours of Operation:</p>
          <p className="mt-1 text-sm text-gray-400">Hours (TBD)</p>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-wide text-white uppercase">Quick Navigation</h3>
          <nav className="mt-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className="text-sm text-gray-400 hover:text-white"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-wide text-white uppercase">Common Repairs</h3>
          <ul className="mt-4 flex flex-col gap-2">
            {services.map((service) => (
              <li key={service.id} className="text-sm text-gray-400">
                &middot; {service.title}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-wide text-white uppercase">Direct Contact & Towing</h3>
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 shrink-0 text-green-500" size={18} />
              <p className="text-sm text-gray-400">
                <span className="block font-semibold text-white">Central Dispatch & Customer Support:</span>
                <a href="tel:+15555550100" className="text-green-500 hover:text-green-400">
                  (555) 555-0100
                </a>
              </p>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 shrink-0 text-green-500" size={18} />
              <p className="text-sm text-gray-400">
                <span className="block font-semibold text-white">Main Headquarters & Hub:</span>
                Address (TBD)
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 shrink-0 text-green-500" size={18} />
              <p className="text-sm text-gray-400">
                <span className="block font-semibold text-white">Email Inquiries:</span>
                <a href="mailto:info@example.com" className="hover:text-white">
                  Email (TBD)
                </a>
              </p>
            </div>
          </div>

          <ButtonLink to="/contact" className="mt-6 w-full">
            Get a Free Estimate
          </ButtonLink>
        </div>
      </Container>

      <div className="border-t border-gray-800">
        <Container className="flex flex-col gap-4 py-6 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Unity Auto Group. All rights reserved.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-1 hover:text-white"
          >
            Back to top <span aria-hidden="true">↑</span>
          </button>
        </Container>
      </div>
    </footer>
  )
}
