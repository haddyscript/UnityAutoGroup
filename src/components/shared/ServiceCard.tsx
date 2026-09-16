import type { Service } from '../../data/services'

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon

  return (
    <div className="group overflow-hidden rounded-xl border border-gray-800 bg-gray-950 transition-all duration-300 hover:-translate-y-1 hover:border-green-500/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(34,197,94,0.12)]">
      {service.image && (
        <div className="relative aspect-video overflow-hidden">
          <img
            src={service.image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
      )}

      <div className="p-6">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 ring-1 ring-green-500/40 transition-transform duration-300 group-hover:scale-110">
          <Icon className="text-green-500" size={22} />
        </span>
        <h3 className="mt-4 text-lg font-semibold text-white">{service.title}</h3>
        <p className="mt-2 text-sm text-gray-400">{service.description}</p>
      </div>
    </div>
  )
}
