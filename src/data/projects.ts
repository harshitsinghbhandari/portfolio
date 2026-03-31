export interface Project {
  num: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  link: string
  linkText: string
  featured?: boolean
  fullWidth?: boolean
}

export const projects: Project[] = [
  {
    num: 'Project 01 · Gemini Challenge',
    title: 'Aegis',
    subtitle: 'Voice-controlled biometric AI agent for macOS',
    description: 'A voice-controlled AI agent for macOS with three-tier risk classification - Silent, Confirm, and Biometric (Touch ID/Face ID). Features delta-based screenshot streaming, a four-state machine, screen control via PyAutoGUI, and Gemini Live API with native ComputerUse. Deployed across 5 live Cloud Run URLs. Built for the Gemini Live Agent Challenge ($25K prize).',
    tags: ['Python', 'Gemini Live API', 'Google ADK', 'Cloud Run', 'PyAutoGUI', 'Touch ID/Face ID'],
    link: 'https://github.com/harshitsinghbhandari/gemini-live-hackathon/',
    linkText: 'View on GitHub',
    featured: true,
  },
  {
    num: 'Project 02 · Open Source',
    title: 'Composio Agent Orchestrator',
    subtitle: 'Open source contributor - agentic coding platform (5,300+ stars)',
    description: 'Active contributor to Composio\'s Agent Orchestrator - a production agentic coding system that decomposes features into parallelizable tasks and assigns them to coding agents autonomously. Shipped test architecture refactor (5,032-line monolith to 8 focused files), custom base branch spawning, and multiple bug fixes. Currently designing Repo Mapper - a semantic index for large codebases to eliminate agent exploration overhead.',
    tags: ['TypeScript', 'Vitest', 'Node.js', 'GitHub Actions', 'Claude API'],
    link: 'https://github.com/ComposioHQ/agent-orchestrator',
    linkText: 'View Project',
  },
  {
    num: 'Project 03 · Hackathon',
    title: 'ArmorIQ - Governed\nAutonomous Sysadmin Agent',
    subtitle: 'Zero-trust AI agent governance for cloud infrastructure',
    description: 'An autonomous sysadmin that detects infrastructure faults and self-heals them - but whose every action is gatekept by a cryptographic policy engine before execution. Built end-to-end in 48 hours with a team of four. The agent is intelligence; ArmorIQ is authority.',
    tags: ['Python', 'FastAPI', 'React', 'JWT', 'Ollama / Llama 3.2', 'Zero Trust'],
    link: 'https://github.com/harshitsinghbhandari/armoriq-hackathon',
    linkText: 'View on GitHub',
  },
]

