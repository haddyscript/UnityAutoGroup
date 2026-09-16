import { Award, Phone, ShieldCheck, Star } from 'lucide-react'

// Placeholder hours, certifications, rating, and phone — replace once Unity Auto Group confirms real details.
export function AnnouncementBar() {
  return (
    <div className="hidden border-b border-white/10 lg:block">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-2 text-[11px] text-gray-300 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-green-500" />
            </span>
            Open Today: Hours (TBD)
          </span>
          <span className="h-3 w-px bg-gray-500" aria-hidden="true" />
          <span className="inline-flex items-center gap-1.5">
            <Award size={13} className="text-green-500" />
            Certification (TBD)
          </span>
          <span aria-hidden="true">&middot;</span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-green-500" />
            Warranty Terms (TBD)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <Star size={13} className="text-green-500" />
            Rating (TBD)
          </span>
          <span className="h-3 w-px bg-gray-500" aria-hidden="true" />
          <a href="tel:+15555550100" className="inline-flex items-center gap-1.5 hover:text-white">
            <Phone size={13} className="text-green-500" />
            (555) 555-0100
          </a>
        </div>
      </div>
    </div>
  )
}
