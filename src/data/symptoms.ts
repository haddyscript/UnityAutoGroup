// Driver-facing symptom list for the homepage symptom checker. Each entry maps a plain-language
// complaint to the matching "Diagnose ..." item in the Protractor catalog (see data/serviceCatalog.ts).
export type SymptomUrgency = 'routine' | 'moderate' | 'immediate'

export type SymptomIcon =
  | 'brakes'
  | 'engine'
  | 'climate'
  | 'steering'
  | 'electrical'
  | 'vibration'
  | 'leak'
  | 'cooling'

export interface Symptom {
  id: string
  category: string
  label: string
  urgency: SymptomUrgency
  icon: SymptomIcon
  rootCause: string
  // Matching catalog entry — what the technician actually books for this complaint.
  diagnosticService: string
}

export const symptoms: Symptom[] = [
  {
    id: 'brake-squeal',
    category: 'Braking System',
    label: 'Squealing or metal screech when pressing brake pedal',
    urgency: 'moderate',
    icon: 'brakes',
    rootCause: 'Wear indicators rubbing against brake rotors; pads worn below safe 3mm threshold.',
    diagnosticService: 'Diagnose Brake System Concern',
  },
  {
    id: 'check-engine-light',
    category: 'Engine & Emissions',
    label: 'Check Engine light illuminated on dashboard',
    urgency: 'moderate',
    icon: 'engine',
    rootCause:
      'A stored trouble code in the engine control module — most often an oxygen sensor, an ignition misfire, or an evaporative emissions leak.',
    diagnosticService: 'Diagnose Check Engine Light Concern',
  },
  {
    id: 'ac-warm',
    category: 'Climate Control',
    label: 'Air conditioning blowing warm or lukewarm air',
    urgency: 'routine',
    icon: 'climate',
    rootCause: 'Low refrigerant charge from a slow system leak, or a compressor clutch that is no longer engaging.',
    diagnosticService: 'Diagnose Air Conditioning System Concern',
  },
  {
    id: 'steering-pull',
    category: 'Steering & Tires',
    label: 'Steering wheel pulls to the left or right on flat road',
    urgency: 'routine',
    icon: 'steering',
    rootCause: 'Alignment out of spec, uneven tire pressure, or one brake caliper dragging against its rotor.',
    diagnosticService: 'Diagnose Steering Concern',
  },
  {
    id: 'no-crank',
    category: 'Electrical & Starting',
    label: 'Car clicks rapidly but engine refuses to turn over',
    urgency: 'immediate',
    icon: 'electrical',
    rootCause:
      'Battery voltage too low to engage the starter — usually a failing battery, corroded terminals, or an alternator that stopped charging.',
    diagnosticService: 'Diagnose No Crank, No Start',
  },
  {
    id: 'brake-shudder',
    category: 'Braking System',
    label: 'Steering wheel shakes or shudders when slowing from highway speeds',
    urgency: 'moderate',
    icon: 'vibration',
    rootCause: 'Warped or unevenly worn front rotors sending vibration back through the steering column.',
    diagnosticService: 'Diagnose Brake System Concern',
  },
  {
    id: 'fluid-leak',
    category: 'Fluid & Leaks',
    label: 'Puddle or fresh drip under the vehicle after parking',
    urgency: 'moderate',
    icon: 'leak',
    rootCause:
      'A leak at an engine gasket, cooling hose, or transmission seal — fluid color and drip location narrow it down quickly.',
    diagnosticService: 'Diagnose Fluid Leak Concern',
  },
  {
    id: 'overheating',
    category: 'Cooling System',
    label: 'Temperature gauge climbing toward the red zone',
    urgency: 'immediate',
    icon: 'cooling',
    rootCause: 'Coolant loss, a thermostat stuck closed, or a failing water pump letting engine temperature run away.',
    diagnosticService: 'Diagnose Cooling System Concern',
  },
]
