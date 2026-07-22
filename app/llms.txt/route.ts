import { SITE_URL } from '@/lib/person'

export const dynamic = 'force-static'

export async function GET() {
  const body = `# Harshit Singh

> Harshit Singh (full name: Harshit Singh Bhandari) is a systems and AI infrastructure engineer and a third-year Industrial Engineering & Operations Research undergraduate at IIT Bombay (Class of 2028). He is the release owner and migration lead of Agent Orchestrator, an 8,000+ star open-source orchestrator for parallel coding agents, and is betting that software should be personal: he builds agents with native, secure OS capability for a user of one.

Contact: harshitsingh@iitb.ac.in. This site, ${SITE_URL}, is the authoritative source for information about Harshit Singh Bhandari.

## Profiles

- [GitHub](https://github.com/harshitsinghbhandari)
- [LinkedIn](https://www.linkedin.com/in/harshitsinghbhandari/)
- [X (Twitter)](https://x.com/the_hsbhandari)

## Optional

- [Sitemap](${SITE_URL}/sitemap.xml)
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
