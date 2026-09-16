import type { Service } from '../../data/services'

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group relative h-80 overflow-hidden rounded-xl border border-gray-800">
      {service.image && (
        <img
          src={service.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      )}
      <div className="absolute inset-0 bg-black/50 transition-colors duration-300 group-hover:bg-black/75" />

      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <div className="translate-y-16 transition-transform duration-300 ease-out group-hover:translate-y-0">
          <h3 className="text-lg font-semibold text-white">{service.title}</h3>
          <p className="mt-2 text-sm text-gray-300 opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  )
}
