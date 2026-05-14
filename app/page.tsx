import Hero from '@/components/Hero'
import FlagshipGrid from '@/components/FlagshipGrid'
import WritingPreview from '@/components/WritingPreview'
import AboutStrip from '@/components/AboutStrip'
import ContributionsGraph from '@/components/ContributionsGraph'
import ContactCTA from '@/components/ContactCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FlagshipGrid />
      <WritingPreview />
      <AboutStrip />
      <ContributionsGraph />
      <ContactCTA />
    </>
  )
}
