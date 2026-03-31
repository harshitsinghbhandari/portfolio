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
    link: 'https://github.com/harshitsinghbhandari/aegis',
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
    link: 'https://github.com/harshitsinghbhandari/ArmorIQ',
    linkText: 'View on GitHub',
  },
  {
    num: 'Project 04',
    title: 'Portfolio Optimization Framework',
    subtitle: 'Markowitz mean-variance optimization with live market data',
    description: 'A rigorous, extensible toolkit for quantitative portfolio construction. Implements Markowitz MVO and Risk Parity with efficient frontier plotting, Monte Carlo simulation, and real-time yfinance data.',
    tags: ['Python', 'NumPy', 'SciPy', 'Matplotlib'],
    link: 'https://github.com/harshitsinghbhandari/portfolio-optimization',
    linkText: 'GitHub',
  },
  {
    num: 'Project 05 · Deployed',
    title: 'Inventory Control Simulator',
    subtitle: 'Interactive (s,S) policy simulation - live on Render',
    description: 'A full-stack web app for visualizing inventory control policies under stochastic demand. Configure reorder thresholds, run simulations, and get real-time cost and fill-rate metrics.',
    tags: ['FastAPI', 'NumPy', 'Render'],
    link: 'https://github.com/harshitsinghbhandari/inventory-simulator',
    linkText: 'Live Demo',
  },
  {
    num: 'Project 06',
    title: 'Crypto Pump & Dump Detector',
    subtitle: 'Algorithmic detection of market manipulation in crypto',
    description: 'Statistical anomaly detection on historical price/volume data to flag pump-and-dump signatures. Applies robust time-series analysis to a real financial integrity problem.',
    tags: ['Python', 'Pandas', 'Stats'],
    link: 'https://github.com/harshitsinghbhandari/crypto-pump-detector',
    linkText: 'GitHub',
  },
  {
    num: 'Project 07',
    title: 'Simulated Annealing Optimizer',
    subtitle: 'Metaheuristic applied to TSP and NSE portfolio optimization',
    description: 'SA from scratch - temperature schedules, neighbor generation, acceptance probability - applied to both the Travelling Salesman Problem and real Indian equity market data.',
    tags: ['Python', 'NumPy', 'NSE Data', 'Jupyter'],
    link: 'https://github.com/harshitsinghbhandari/simulated-annealing',
    linkText: 'GitHub',
  },
  {
    num: 'Project 08 · Deployed',
    title: 'Branch Rank',
    subtitle: 'JEE Advanced IIT admission predictor - live on Vercel',
    description: 'Students enter their JEE rank; the app returns eligible IIT programs filtered by category and institute. Built for real utility during admissions season. Thousands of students use it.',
    tags: ['Flask', 'Pandas', 'Vercel', 'JavaScript'],
    link: 'https://branch-rank.vercel.app',
    linkText: 'branch-rank.vercel.app',
  },
  {
    num: 'Project 09 · Internal Tool',
    title: 'IITB Weightlifting Club - Operations Console',
    subtitle: 'Role-based club management system built with React + TypeScript',
    description: 'A full-featured operations console covering attendance, announcements, event scheduling, and media gallery - all behind RBAC with separate admin and member permission tiers. TypeScript enforced across the entire data layer to prevent runtime errors in this data-heavy app.',
    tags: ['React', 'TypeScript', 'Vite', 'RBAC'],
    link: 'https://github.com/harshitsinghbhandari/iitb-weightlifting-console',
    linkText: 'GitHub',
    fullWidth: true,
  },
]
