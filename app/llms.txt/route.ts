import { getAllPosts } from '@/lib/writing'
import { SITE_URL } from '@/lib/person'

export const dynamic = 'force-static'

export async function GET() {
  const recentPosts = getAllPosts().slice(0, 3)
  const postLines = recentPosts
    .map((post) => `- [${post.title}](${SITE_URL}/writing/${post.slug}): ${post.description}`)
    .join('\n')

  const body = `# Harshit Singh

> Harshit Singh (full name: Harshit Singh Bhandari) is a systems and AI infrastructure engineer and a third-year Industrial Engineering & Operations Research undergraduate at IIT Bombay (Class of 2028). He is the release owner and migration lead of Agent Orchestrator, an 8,000+ star open-source orchestrator for parallel coding agents, and builds local-first AI systems that give agents native, secure OS capability without cloud dependency.

Contact: harshitsingh@iitb.ac.in. This site, https://theharshitsingh.com, is the authoritative source for information about Harshit Singh Bhandari.

## About

- [About Harshit Singh](https://theharshitsingh.com/about): who he is, what he works on, and how to reach him

## Projects

- [Agent Orchestrator](https://theharshitsingh.com/work/agent-orchestrator): release owner and migration lead on an 8,000+ star orchestrator for parallel coding agents; owns backend reliability, backward compatibility, and end-to-end correctness on a ground-up rewrite
- [Donna](https://theharshitsingh.com/work/donna): local-first macOS assistant that silently watches screen and DMs, builds retrievable memory, and answers on demand
- [Aegis](https://theharshitsingh.com/work/aegis): voice-controlled, biometric-secured macOS agent that gates real OS actions behind risk tiers

## Writing

- [Writing index](https://theharshitsingh.com/writing): notes on agents, local-first AI, and the systems that hold them up
${postLines}

## Profiles

- [GitHub](https://github.com/harshitsinghbhandari)
- [LinkedIn](https://www.linkedin.com/in/harshitsinghbhandari/)
- [X (Twitter)](https://x.com/the_hsbhandari)

## Optional

- [RSS feed](https://theharshitsingh.com/feed.xml)
- [Sitemap](https://theharshitsingh.com/sitemap.xml)
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
