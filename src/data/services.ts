import type { LucideIcon } from 'lucide-react'
import { Battery, Car, Cog, Gauge, Thermometer, Wrench } from 'lucide-react'
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
  icon: LucideIcon
  image?: string
}

// Placeholder catalog — replace once Unity Auto Group confirms their actual service list.
export const services: Service[] = [
  {
    id: 'battery-service',
    title: 'Battery Service',
    description: 'Testing, jump-starts, and battery replacement.',
    category: 'both',
    icon: Battery,
    image: batteryServiceImage,
  },
  {
    id: 'brake-repair',
    title: 'Brake Repair',
    description: 'Brake pad, rotor, and full brake system service.',
    category: 'both',
    icon: Gauge,
    image: brakeRepairImage,
  },
  {
    id: 'engine-diagnostics',
    title: 'Engine Diagnostics',
    description: 'Check-engine-light diagnosis and troubleshooting.',
    category: 'shop',
    icon: Cog,
    image: engineDiagnosticsImage,
  },
  {
    id: 'cooling-system',
    title: 'Cooling System',
    description: 'Radiator, coolant, and overheating repairs.',
    category: 'both',
    icon: Thermometer,
    image: coolingSystemImage,
  },
  {
    id: 'general-repair',
    title: 'General Repair',
    description: 'Everyday mechanical repairs and maintenance.',
    category: 'shop',
    icon: Wrench,
    image: generalRepairImage,
  },
  {
    id: 'mobile-tune-up',
    title: 'Mobile Tune-Up',
    description: 'On-site tune-ups wherever your vehicle is parked.',
    category: 'mobile',
    icon: Car,
    image: mobileTuneUpImage,
  },
]
