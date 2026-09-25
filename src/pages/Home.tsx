import { AboutSection } from '../components/home/AboutSection'
import { FAQSection } from '../components/home/FAQSection'
import { FinalCTA } from '../components/home/FinalCTA'
import { Hero } from '../components/home/Hero'
import { HowItWorks } from '../components/home/HowItWorks'
import { QuoteEntry } from '../components/home/QuoteEntry'
import { ServicesOverview } from '../components/home/ServicesOverview'
import { SymptomChecker } from '../components/home/SymptomChecker'
import { TestimonialsSection } from '../components/home/TestimonialsSection'
import { WhyChooseUs } from '../components/home/WhyChooseUs'

export default function Home() {
  return (
    <>
      <Hero />
      <QuoteEntry />
      <ServicesOverview />
      <SymptomChecker />
      <WhyChooseUs />
      <HowItWorks />
      <AboutSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTA />
    </>
  )
}
