import batteryServiceImage from '../assets/images/services/battery-service.webp'
import brakeRepairImage from '../assets/images/services/brake-repair.webp'
import coolingSystemImage from '../assets/images/services/cooling-system.webp'
import engineDiagnosticsImage from '../assets/images/services/engine-diagnostics.webp'
import generalRepairImage from '../assets/images/services/general-repair.webp'
import mobileTuneUpImage from '../assets/images/services/mobile-tune-up.webp'

export type ServiceCategory = 'shop' | 'mobile' | 'both'

export interface Service {
  id: string
  title: string
  description: string
  category: ServiceCategory
  image?: string
}

// Curated highlight of the full confirmed catalog (see data/serviceCatalog.ts) for the homepage grid.
export const services: Service[] = [
  {
    id: 'battery-service',
    title: 'Battery Diagnostics',
    description: 'Diagnose battery concerns, from no-start issues to charging problems.',
    category: 'both',
    image: batteryServiceImage,
  },
  {
    id: 'brake-repair',
    title: 'Brake Pad & Rotor Service',
    description: 'Front, rear, or both — Gold and Platinum level parts available.',
    category: 'both',
    image: brakeRepairImage,
  },
  {
    id: 'engine-diagnostics',
    title: 'Engine Diagnostics',
    description: 'Computer scans and full engine concern diagnosis.',
    category: 'shop',
    image: engineDiagnosticsImage,
  },
  {
    id: 'cooling-system',
    title: 'Cooling System Service',
    description: 'Cooling system fluid flush and concern diagnostics.',
    category: 'both',
    image: coolingSystemImage,
  },
  {
    id: 'general-repair',
    title: 'Lube, Oil & Filter Service',
    description: 'Blended, synthetic, or European synthetic oil options.',
    category: 'shop',
    image: generalRepairImage,
  },
  {
    id: 'mobile-tune-up',
    title: 'Fluid & Maintenance Service',
    description: 'Transmission, power steering, and A/C system flushes — wherever your vehicle is parked.',
    category: 'mobile',
    image: mobileTuneUpImage,
  },
]
