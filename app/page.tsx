import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import SelectedWork from '@/components/SelectedWork'
import WritingList from '@/components/WritingList'
import About from '@/components/About'
import Contact from '@/components/Contact'

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
      <SelectedWork />
      <WritingList />
      <About />
      <Contact />
    </>
  )
}
