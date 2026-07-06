export interface Project {
  slug: string
  index: string
  category: string
  name: string
  whatItIs: string
  proof: string
  idea: string
  kind: 'case' | 'demo' | 'repo'
  href: string
  featured: boolean
}

export const PROJECTS: Project[] = [
  {
    slug: 'agent-orchestrator',
    index: '01',
    category: 'AGENT INFRASTRUCTURE',
    name: 'Agent Orchestrator',
    whatItIs: 'Release owner and migration lead on a 7.6k-star orchestrator for parallel coding agents.',
    proof: '7,600 stars. I hold the npm publish token and own end-to-end correctness on a ground-up rewrite.',
    idea: 'Deterministic backend state is what lets many agents run in parallel without corrupting each other.',
    kind: 'case',
    href: '/work/agent-orchestrator',
    featured: true,
  },
  {
    slug: 'donna',
    index: '02',
    category: 'LOCAL-FIRST AI',
    name: 'Donna',
    whatItIs: 'A local-first macOS assistant that silently watches screen and DMs, builds retrievable memory, and answers on demand.',
    proof: 'v0.3.0 shipped. Apple Vision OCR, entropy-based redaction, single-linkage clustering in pure numpy, SQLite/FTS5 memory.',
    idea: 'Invert the ambient assistant: capture is silent, the answer is the only thing you experience.',
    kind: 'case',
    href: '/work/donna',
    featured: true,
  },
  {
    slug: 'aegis',
    index: '03',
    category: 'AGENT SAFETY',
    name: 'Aegis',
    whatItIs: 'A voice-controlled, biometric-secured macOS agent that gates real OS actions behind risk tiers.',
    proof: 'Green (silent), Yellow (verbal confirm), Red (Touch ID via WebAuthn) before any action touches the machine. Every attempt writes an audit envelope.',
    idea: 'Gate on intent and irreversibility, and fail closed. A transportable safety rail for desktop automation.',
    kind: 'case',
    href: '/work/aegis',
    featured: true,
  },
  {
    slug: 'graph-isomorphism',
    index: '04',
    category: 'RESEARCH',
    name: 'Graph Isomorphism via Spectral Embeddings',
    whatItIs: 'Graph isomorphism attacked as continuous optimization: relax permutation to doubly stochastic, solve a convex QP, round via spectral embeddings.',
    proof: 'Live demo. Exact integer verification is the only positive certificate, no soft-answer trust.',
    idea: 'Relax to continuous, then verify exactly. A reusable reflex for hard combinatorial problems.',
    kind: 'demo',
    href: '/graph-isomorphism',
    featured: true,
  },
  {
    slug: 'emagg',
    index: '05',
    category: 'LOCAL-FIRST AI',
    name: 'emagg',
    whatItIs: 'A local-first email aggregator unifying Gmail, Zoho, and raw IMAP into one searchable SQLite inbox.',
    proof: 'AES-256-GCM credentials at rest, FTS5 search across inboxes, read-only by design.',
    idea: 'Read-only by design removes an entire class of trust problems from email triage.',
    kind: 'repo',
    href: 'https://github.com/harshitsinghbhandari/emagg',
    featured: false,
  },
  {
    slug: 'iitb-agent',
    index: '06',
    category: 'AGENT INFRASTRUCTURE',
    name: 'IITB Agent',
    whatItIs: 'A local-first agent workspace for real IIT Bombay bureaucracy (ASC, Moodle) over a shared CDP runtime.',
    proof: 'One Chrome profile behind a Unix-socket CDP daemon; private data kept out of git by structure.',
    idea: 'Agents for real workflows need principled authority and privacy boundaries, not just prompts.',
    kind: 'repo',
    href: 'https://github.com/harshitsinghbhandari/iitb-agent',
    featured: false,
  },
]

export const getWorkSlugs = (): string[] =>
  PROJECTS.filter((p) => p.kind === 'case').map((p) => p.slug)
