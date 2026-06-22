import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import AboutSplit from '@/components/AboutSplit'
import WorkGrid from '@/components/WorkGrid'
import NotesPreview from '@/components/NotesPreview'
import ContactFinale from '@/components/ContactFinale'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Harshit Singh',
  url: 'https://theharshitsingh.com',
  image: 'https://theharshitsingh.com/hsb.jpg',
  email: 'mailto:harshitsingh@iitb.ac.in',
  jobTitle: 'Systems and AI infrastructure engineer',
  affiliation: {
    '@type': 'CollegeOrUniversity',
    name: 'Indian Institute of Technology Bombay',
  },
  sameAs: [
    'https://github.com/harshitsinghbhandari',
    'https://www.linkedin.com/in/harshitsinghbhandari/',
    'https://x.com/HSBhandari955',
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <Hero />
      <AboutSplit />
      <WorkGrid />
      <NotesPreview />
      <ContactFinale />
    </>
  )
}
