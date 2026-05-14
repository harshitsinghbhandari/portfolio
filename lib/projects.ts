export interface FlagshipProject {
  slug: string
  /** Internal route for the bespoke page, OR an external URL. */
  href: string
  /** True if this project has a bespoke /projects/<slug> page on this site. */
  bespoke: boolean
  name: string
  tagline: string
  description: string
  tags: string[]
  badge?: string
}

export const flagshipProjects: FlagshipProject[] = [
  {
    slug: 'donna',
    href: '/projects/donna',
    bespoke: true,
    name: 'Donna',
    tagline: 'Local-first macOS assistant that turns voice and screen into structured briefings.',
    description:
      'A native macOS assistant. Listens, watches the screen, and compiles 2am idea dumps into structured plans — all local-first, no cloud account, no app store.',
    tags: ['macOS', 'Python', 'Local AI', 'CLI'],
    badge: 'Flagship',
  },
  {
    slug: 'aegis',
    href: 'https://github.com/harshitsinghbhandari/gemini-live-hackathon',
    bespoke: false,
    name: 'Aegis',
    tagline: 'Voice-controlled biometric AI agent for macOS.',
    description:
      'Three-tier risk classification (Silent · Confirm · Biometric), delta-based screenshot streaming, native ComputerUse via Gemini Live. Built for the Gemini Live Agent Challenge ($25K prize).',
    tags: ['Python', 'Gemini Live API', 'Google ADK', 'Cloud Run'],
    badge: 'Gemini Challenge',
  },
  {
    slug: 'composio',
    href: 'https://github.com/ComposioHQ/agent-orchestrator',
    bespoke: false,
    name: 'Composio Agent Orchestrator',
    tagline: '#1 human contributor to a 5,300★ agentic coding platform.',
    description:
      'Shipped a test architecture refactor (5,032-line monolith → 8 focused files), custom base-branch spawning, and numerous bug fixes. Currently designing Repo Mapper — a semantic index for large codebases to eliminate agent exploration overhead.',
    tags: ['TypeScript', 'Vitest', 'Agent Systems', 'Open Source'],
    badge: 'Open Source',
  },
  {
    slug: 'armoriq',
    href: 'https://github.com/harshitsinghbhandari/armoriq-hackathon',
    bespoke: false,
    name: 'ArmorIQ',
    tagline: 'Zero-trust governance for autonomous sysadmin agents.',
    description:
      'An autonomous sysadmin that detects faults and self-heals — but whose every action is gatekept by a cryptographic policy engine before execution. Built end-to-end in 48 hours.',
    tags: ['Python', 'FastAPI', 'JWT', 'Zero Trust'],
    badge: 'Hackathon',
  },
]
