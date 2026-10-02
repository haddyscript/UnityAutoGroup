import { CalendarCheck2, Calculator, Clock, KeyRound, MapPin, Phone, Wrench } from 'lucide-react'
import { DetailRow, ServiceTypePage } from '../components/service/ServiceTypePage'
import type { ExpectStep } from '../components/service/ServiceTypePage'
import { business, directionsUrl, mapEmbedUrl } from '../data/business'

const APPOINTMENT_URL =
  'https://appointment.protractor.com/1.0/Appointment/75ee1e86e1434f29830e39f6ed0454d4-ca00c9a737a04517a7ae107ea0709b55/Create'

const steps: ExpectStep[] = [
  {
    icon: Calculator,
    title: 'Get Your Estimate',
    description: 'Enter your vehicle and the repair you need to see an estimated quote before you book.',
  },
  {
    icon: CalendarCheck2,
    title: 'Book a Time',
    description: 'Pick a date and time for your shop visit in the scheduler below.',
  },
  {
    icon: KeyRound,
    title: 'Drop Off Your Vehicle',
    description: 'Bring your vehicle to our Lithonia shop at your appointment time.',
  },
  {
    icon: Wrench,
    title: 'We Confirm & Repair',
    description: 'Our team confirms parts and pricing with you, then completes the repair.',
  },
]

export default function ShopService() {
  return (
    <ServiceTypePage
      type="shop"
      title="Shop Service"
      intro="Bring your vehicle to Unity Auto Group's repair shop in Lithonia. Get an estimate first, then book a time that works for you."
      steps={steps}
      details={
        <>
          <h2 className="text-xl font-bold text-white">Visit the Shop</h2>
          <div className="mt-6 flex flex-col gap-5">
            <DetailRow icon={MapPin} label="Address">
              {business.address.street}
              <br />
              {business.address.cityLine}
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block font-semibold text-green-500 hover:underline"
              >
                Get directions →
              </a>
            </DetailRow>
            {business.hours && (
              <DetailRow icon={Clock} label="Hours">
                {business.hours}
              </DetailRow>
            )}
            <DetailRow icon={Phone} label="Phone">
              <a href={business.phoneHref} className="text-green-500 hover:underline">
                {business.phone}
              </a>
            </DetailRow>
          </div>
          <iframe
            src={mapEmbedUrl}
            title="Map to Unity Auto Group"
            className="mt-6 h-56 w-full rounded-xl border border-gray-800"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </>
      }
      booking={{
        title: 'Book Your Shop Appointment',
        note: 'Pick a date and time for your shop visit below.',
        url: APPOINTMENT_URL,
        iframeTitle: 'Unity Auto Group Appointment Scheduler',
        iframeClassName: 'h-[1100px]',
      }}
    />
  )
}
