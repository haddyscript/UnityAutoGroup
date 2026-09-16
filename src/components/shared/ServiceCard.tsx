import type { Service } from '../../data/services'

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-950 p-6">
      <Icon className="text-green-500" size={28} />
      <h3 className="mt-4 text-lg font-semibold text-white">{service.title}</h3>
      <p className="mt-2 text-sm text-gray-400">{service.description}</p>
    </div>
  )
}
