export const SITE_URL = 'https://hsbhandari.com'
export const PERSON_ID = `${SITE_URL}/#person`
export const SITE_DESCRIPTION =
  'I build infrastructure for AI agents, with a focus on making long-running agent work persistent, observable, and recoverable.'

export const personLd = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Harshit Singh',
  alternateName: 'Harshit Singh Bhandari',
  url: SITE_URL,
  image: `${SITE_URL}/hsb.jpg`,
  email: 'mailto:harshit@hsbhandari.com',
  description: SITE_DESCRIPTION,
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
  sameAs: [
    'https://github.com/harshitsinghbhandari',
    'https://www.linkedin.com/in/harshitsinghbhandari/',
    'https://x.com/the_hsbhandari',
  ],
}
