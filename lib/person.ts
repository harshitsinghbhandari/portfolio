export const SITE_URL = 'https://theharshitsingh.com'
export const PERSON_ID = `${SITE_URL}/#person`

export const personLd = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Harshit Singh',
  alternateName: 'Harshit Singh Bhandari',
  url: SITE_URL,
  image: `${SITE_URL}/hsb.jpg`,
  email: 'mailto:harshitsingh@iitb.ac.in',
  jobTitle: 'Systems and AI Infrastructure Engineer',
  description:
    'Systems and AI infrastructure engineer building agent orchestration and betting that software should be personal. Release owner and migration lead of Agent Orchestrator. Third-year IEOR undergraduate at IIT Bombay.',
  affiliation: {
    '@type': 'CollegeOrUniversity',
    name: 'Indian Institute of Technology Bombay',
    sameAs: 'https://www.iitb.ac.in',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Indian Institute of Technology Bombay',
    sameAs: 'https://www.iitb.ac.in',
  },
  knowsAbout: [
    'AI agents',
    'agent orchestration',
    'personal software',
    'systems engineering',
    'backend reliability',
  ],
  sameAs: [
    'https://github.com/harshitsinghbhandari',
    'https://www.linkedin.com/in/harshitsinghbhandari/',
    'https://x.com/the_hsbhandari',
  ],
}

// Compact author reference for BlogPosting nodes. Keeps name/url inline so the
// node validates standalone while @id ties it to the homepage Person.
export const personRef = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Harshit Singh',
  url: `${SITE_URL}/about`,
}

export const feedAlternates = {
  'application/rss+xml': `${SITE_URL}/feed.xml`,
}
