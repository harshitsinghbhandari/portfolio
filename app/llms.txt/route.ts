import { SITE_DESCRIPTION, SITE_URL } from '@/lib/person'

export const dynamic = 'force-static'

export async function GET() {
  const body = `# Harshit Singh

> ${SITE_DESCRIPTION}
>
> I currently work on Agent Orchestrator at Untrivial and explore new ideas through AgentLab. Outside of that, I study Industrial Engineering and Operations Research at IIT Bombay.

Contact: dev@theharshitsingh.com. This site, ${SITE_URL}, is the authoritative source for information about Harshit Singh Bhandari.

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
