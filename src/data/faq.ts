export interface FaqItem {
  question: string
  answer: string
}

// Placeholder FAQ — confirm exact policies/answers with Unity Auto Group before publishing.
export const faqItems: FaqItem[] = [
  {
    question: 'What is the difference between Shop Service and Mobile Service?',
    answer:
      "Shop Service means bringing your vehicle to our physical repair shop. Mobile Service means our technician comes to you, fully equipped to perform the repair on-site.",
  },
  {
    question: 'How do I get a quote?',
    answer:
      'Enter your vehicle and repair details on our website to receive an estimated quote, then submit a service request and our team will follow up to confirm and schedule.',
  },
  {
    question: 'Which areas do you serve for Mobile Service?',
    answer: 'Service area details will be listed here once confirmed by Unity Auto Group.',
  },
  {
    question: 'Do you offer a warranty on repairs?',
    answer: 'Warranty details will be listed here once confirmed by Unity Auto Group.',
  },
]
