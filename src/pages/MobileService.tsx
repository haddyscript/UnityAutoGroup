import { CalendarCheck2, Calculator, Car, Clock, MapPin, Phone, Truck } from 'lucide-react'
import { DetailRow, ServiceTypePage } from '../components/service/ServiceTypePage'
import type { ExpectStep } from '../components/service/ServiceTypePage'
import { business } from '../data/business'

const APPOINTMENT_URL =
  'https://appointment.protractor.com/1.0/Appointment/e2c118e9c5f84c6a83497ec3e2d4848f-770f656490cb4f48a534860c5b4f227f/Create'

const steps: ExpectStep[] = [
  {
    icon: Calculator,
    title: 'Get Your Estimate',
    description: 'Enter your vehicle and the repair you need to see an estimated quote before you book.',
  },
  {
    icon: CalendarCheck2,
    title: 'Book a Time',
    description: 'Pick a date and time below, and add the service address in the notes.',
  },
  {
    icon: Truck,
    title: 'We Come to You',
    description: 'A technician arrives at your location with the tools and parts for the job.',
  },
  {
    icon: Car,
    title: 'Repair On-Site',
    description: 'We confirm the work with you and complete the repair where your vehicle is parked.',
  },
]

export default function MobileService() {
  return (
    <ServiceTypePage
      type="mobile"
      title="Mobile Service"
      intro="Unity Auto Group comes to you, fully equipped to perform the repair on-site. Get an estimate first, then book a time and place that works for you."
      steps={steps}
      details={
        <>
          <h2 className="text-xl font-bold text-white">Where We Come To</h2>
          <div className="mt-6 flex flex-col gap-5">
            <DetailRow icon={MapPin} label="Service Area">
              {business.mobileServiceArea ?? 'Call us to confirm we cover your address before you book.'}
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

          <h3 className="mt-8 text-sm font-semibold text-white">Before the technician arrives</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-400 marker:text-green-500">
            <li>Add the full service address in the booking notes.</li>
            <li>Make sure the vehicle is reachable and there's room to work around it.</li>
            <li>Keep your phone nearby so the technician can reach you on arrival.</li>
          </ul>
        </>
      }
      booking={{
        title: 'Book Your Mobile Appointment',
        note: "Pick a date and time below. Be sure to include the address where you'd like service in the notes section so we know where to send the technician.",
        url: APPOINTMENT_URL,
        iframeTitle: 'Unity Auto Group Mobile Appointment Scheduler',
        iframeClassName: 'h-[3850px] sm:h-[2600px] lg:h-[2150px]',
      }}
    />
  )
}
