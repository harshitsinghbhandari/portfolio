# Editorial Notebook Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the art-director portfolio (WebGL hero, giant serif, scroll-jack) with a quiet, typographic, near-black "editorial notebook" that leads with voice and shows real work.

**Architecture:** Stay on Next.js 14 App Router + MDX + Tailwind. Swap the display font to Newsreader, shrink the type scale, warm the palette. Rebuild every homepage section as static/lightly-animated editorial components. Generalize the MDX loader to serve a new `content/work` tree of case-study pages. Preserve and extend all existing SEO output.

**Tech Stack:** Next.js 14.2, React 18, TypeScript, Tailwind 3.4, framer-motion (subtle reveals only), next-mdx-remote, gray-matter, next/font.

## Global Constraints

- No em dashes anywhere (prose, copy, comments, commit messages). Use period, comma, colon, semicolon, or parentheses.
- No en dashes either.
- No WebGL, no scroll-jacking, no letter-by-letter animation, no rotating words, no cursor follower.
- All motion gated behind `prefers-reduced-motion: reduce`.
- Preserve PR #14 SEO: sitemap, robots, manifest, Person + BlogPosting JSON-LD, per-page OG images, canonical URLs. `npm run check:seo` must pass at the end.
- `npm run build` must succeed at the end.
- Content facts/voice source of truth (read-only reference): `~/Downloads/main-quests/personal-brand/case-studies/*.md` and `docs/self-model.md`, `docs/context.md`.
- Git author: `Harshit Singh Bhandari <dev@theharshitsingh.com>`. Commit messages end with `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Work on a branch named `editorial-notebook-redesign`, not `main`.

## File map

- `tailwind.config.ts` — modify: new color tokens, new fontSize scale, remove giant tokens.
- `app/globals.css` — modify: `.font-display` -> Newsreader var, add reduced-motion guard, tune `prose-writing` headings to Newsreader.
- `app/layout.tsx` — modify: load Newsreader, drop Instrument Serif + CursorFollower.
- `lib/content.ts` — create: shared MDX loader parameterized by directory.
- `lib/writing.ts` — modify: re-export from `lib/content.ts` (keep public API).
- `lib/work.ts` — create: work-tree loader + `Project` list metadata.
- `components/Navbar.tsx` — rewrite: simple persistent text nav.
- `components/Hero.tsx` — rewrite: voice statement, no animation.
- `components/About.tsx` — create (replaces `AboutSplit.tsx`): static about section.
- `components/SelectedWork.tsx` — create (replaces `WorkGrid.tsx`): editorial project rows.
- `components/WritingList.tsx` — create (replaces `NotesPreview.tsx`): essay column.
- `components/Contact.tsx` — create (replaces `ContactFinale.tsx`): quiet contact.
- `components/Reveal.tsx` — create: shared reduced-motion-aware fade/rise wrapper.
- `app/page.tsx` — modify: new section imports + Person JSON-LD kept.
- `content/work/agent-orchestrator.mdx`, `donna.mdx`, `aegis.mdx` — create.
- `app/work/[slug]/page.tsx` — create: case-study page.
- `app/work/[slug]/opengraph-image.tsx` — create: OG image for work pages.
- `app/writing/page.tsx` — modify: restyle index to editorial system.
- `app/writing/[slug]/page.tsx` — modify: Newsreader title header.
- `app/sitemap.ts` — modify: add `/work` + work slugs.
- `scripts/check-sitemap.mjs` — modify: assert `/work` URLs present.
- Delete: `components/Ferrofluid.tsx`, `components/CursorFollower.tsx`, `components/MenuOverlay.tsx`, `components/AboutSplit.tsx`, `components/WorkGrid.tsx`, `components/NotesPreview.tsx`, `components/ContactFinale.tsx`, `src/` (stray), `ogl` from `package.json`.

**Verification note:** This is a visual redesign. Most tasks are verified by `npm run build` succeeding plus rendering the route with `curl -s localhost:3000/<route> | grep` for expected text. The content loader (Task 2) gets a real node assertion test. There is no test framework in this repo; do not add one (YAGNI). Run the dev server once (`npm run dev`) and reuse it for curl checks.

---

### Task 1: Design tokens + Newsreader font

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/layout.tsx:4,11-16,51` and remove CursorFollower usage (lines 8, 60)
- Modify: `app/globals.css:52-54` (`.font-display`) and add reduced-motion block

**Interfaces:**
- Produces: color tokens `bg surface border text muted subtle accent`; fontSize tokens `2xs hero section title`; font var `--font-newsreader`; utility `.font-display` -> Newsreader.

- [ ] **Step 1: Update tailwind colors + fontSizes**

In `tailwind.config.ts`, replace the `colors` and `fontSize` blocks:

```ts
      colors: {
        bg: '#0a0a0b',
        surface: '#111113',
        border: '#1e1e22',
        text: '#f1efea',
        muted: '#8a8a93',
        subtle: '#5b5b63',
        accent: '#c8443f',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
        serif: ['var(--font-newsreader)', 'ui-serif', 'Georgia', 'serif'],
      },
      fontSize: {
        '2xs': ['10px', { lineHeight: '1.4', letterSpacing: '0.08em' }],
        hero: ['clamp(38px, 6vw, 80px)', { lineHeight: '1.04', letterSpacing: '-0.02em' }],
        section: ['clamp(26px, 3vw, 44px)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        title: ['clamp(24px, 2.6vw, 40px)', { lineHeight: '1.06', letterSpacing: '-0.02em' }],
      },
```

- [ ] **Step 2: Load Newsreader, drop Instrument Serif + CursorFollower**

In `app/layout.tsx`: change the font import line 4 to
`import { Newsreader } from 'next/font/google'`, replace the `instrumentSerif` const (lines 11-16) with:

```ts
const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
})
```

Update the `<html className>` (line 51) to use `${newsreader.variable}` instead of `${instrumentSerif.variable}`. Remove the `import CursorFollower` line (8) and the `<CursorFollower />` element (60).

- [ ] **Step 3: Point .font-display at Newsreader + add reduced-motion guard**

In `app/globals.css`, change `.font-display` font-family (line 53) to `var(--font-newsreader), ui-serif, Georgia, serif`. Append at the end of the file:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: build completes with no error about `Instrument_Serif`, `CursorFollower`, or unknown tokens. (Ferrofluid/other deletions happen later; if build references a not-yet-deleted component that is fine here.)

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts app/layout.tsx app/globals.css
git commit -m "feat(redesign): editorial tokens, Newsreader font, drop cursor follower"
```

---

### Task 2: Generalized MDX content loader

**Files:**
- Create: `lib/content.ts`
- Modify: `lib/writing.ts`
- Test: `scripts/test-content-loader.mjs` (temporary node assertion, deleted in step 5)

**Interfaces:**
- Produces (`lib/content.ts`):
  - `interface DocMeta { slug; title; date; description; tags: string[]; readingTime?; draft?; [k: string]: unknown }`
  - `interface Doc extends DocMeta { content: string }`
  - `getAllDocs(dir: string): DocMeta[]`
  - `getDocBySlug(dir: string, slug: string): Doc | null`
  - `getSlugs(dir: string): string[]`
  - `formatDocDate(date: string): string`
- Produces (`lib/writing.ts`, unchanged public API): `PostMeta`, `Post`, `getAllPosts()`, `getPostBySlug(slug)`, `getAllSlugs()`, `formatPostDate(date)`.

- [ ] **Step 1: Write the failing test**

Create `scripts/test-content-loader.mjs`:

```js
import assert from 'node:assert'
import { getAllPosts, getPostBySlug } from '../lib/writing.ts'

const posts = getAllPosts()
assert.ok(posts.length >= 1, 'expected at least one writing post')
assert.ok(posts.every((p) => p.slug && p.title && p.date), 'posts need slug/title/date')
const first = getPostBySlug(posts[0].slug)
assert.ok(first && typeof first.content === 'string', 'post body should load')
console.log('PASS: content loader', posts.length, 'posts')
```

- [ ] **Step 2: Run test to verify current API still targeted**

Run: `node --experimental-strip-types scripts/test-content-loader.mjs`
Expected: PASS now (writing.ts already works). This test is a regression guard for the refactor in step 3.

- [ ] **Step 3: Create `lib/content.ts` and reduce `lib/writing.ts` to a thin wrapper**

Create `lib/content.ts` by generalizing the current `lib/writing.ts`: same body as the existing file but with `WRITING_DIR` replaced by a `dir: string` parameter on every function. Rename `readPostFile` -> internal `readDoc(dir, slug)`, `getAllPosts` -> `getAllDocs(dir)`, `getPostBySlug` -> `getDocBySlug(dir, slug)`, `getAllSlugs` -> `getSlugs(dir)`, `formatPostDate` -> `formatDocDate`. Types renamed `PostMeta` -> `DocMeta` (add index signature `[key: string]: unknown` so work frontmatter fields like `category`, `status`, `repo` survive), `Post` -> `Doc`.

Then rewrite `lib/writing.ts` to:

```ts
import path from 'node:path'
import {
  type Doc,
  type DocMeta,
  getAllDocs,
  getDocBySlug,
  getSlugs,
  formatDocDate,
} from './content'

const WRITING_DIR = path.join(process.cwd(), 'content', 'writing')

export type PostMeta = DocMeta
export type Post = Doc

export const getAllPosts = (): PostMeta[] => getAllDocs(WRITING_DIR)
export const getPostBySlug = (slug: string): Post | null => getDocBySlug(WRITING_DIR, slug)
export const getAllSlugs = (): string[] => getSlugs(WRITING_DIR)
export const formatPostDate = (date: string): string => formatDocDate(date)
```

- [ ] **Step 4: Run test to verify refactor is green**

Run: `node --experimental-strip-types scripts/test-content-loader.mjs`
Expected: `PASS: content loader 6 posts` (or however many exist).

- [ ] **Step 5: Delete temp test and commit**

```bash
rm scripts/test-content-loader.mjs
git add lib/content.ts lib/writing.ts
git commit -m "refactor(content): parameterize MDX loader by directory"
```

---

### Task 3: Reveal wrapper + simplified Navbar

**Files:**
- Create: `components/Reveal.tsx`
- Rewrite: `components/Navbar.tsx`
- Delete: `components/MenuOverlay.tsx`

**Interfaces:**
- Produces: `Reveal` (default export) — `{ children, delay?: number, className?: string }`, wraps in a framer-motion `whileInView` fade/rise, respects reduced motion via `useReducedMotion`.
- Produces: `Navbar` — persistent text nav.

- [ ] **Step 1: Create `components/Reveal.tsx`**

```tsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Rewrite `components/Navbar.tsx`**

```tsx
import Link from 'next/link'

const links = [
  { label: 'Work', href: '/#work' },
  { label: 'Writing', href: '/writing' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-bg/70 backdrop-blur">
      <nav
        className="container-page flex h-14 items-center justify-between"
        aria-label="Primary"
      >
        <Link href="/" className="font-display text-xl text-text no-underline" aria-label="Home">
          Harshit Singh<span className="text-accent">.</span>
        </Link>
        <ul className="flex items-center gap-5 md:gap-7">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="font-mono text-2xs uppercase tracking-[0.14em] text-muted no-underline transition-colors hover:text-text"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
```

- [ ] **Step 3: Delete the overlay**

```bash
rm components/MenuOverlay.tsx
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: succeeds (Navbar no longer imports MenuOverlay).

- [ ] **Step 5: Commit**

```bash
git add components/Reveal.tsx components/Navbar.tsx
git commit -m "feat(redesign): reveal wrapper and simple text nav"
```

---

### Task 4: Hero (voice)

**Files:**
- Rewrite: `components/Hero.tsx`

**Interfaces:**
- Consumes: `Reveal` from Task 3.
- Produces: `Hero` — voice statement section, no WebGL, no letter animation.

- [ ] **Step 1: Rewrite `components/Hero.tsx`**

Copy is a placeholder in Harshit's voice, refine later. Left-aligned, Newsreader statement, Geist Sans support, mono kicker/meta. No `Ferrofluid`, no `motion` letter loop.

```tsx
import Link from 'next/link'
import Reveal from './Reveal'

export default function Hero() {
  return (
    <section className="container-page flex min-h-[88svh] flex-col justify-center pt-24 pb-16">
      <Reveal>
        <p className="label mb-6">
          <span className="accent-dot" />
          Systems &amp; AI infrastructure · IIT Bombay
        </p>
        <h1 className="font-display text-hero max-w-[16ch]">
          I keep a 7,600-star multi-agent system shipping and coherent. I write the
          low-level execution environments and safety rails that make autonomous agents
          reliable.
        </h1>
        <p className="mt-8 max-w-[62ch] font-sans text-base leading-relaxed text-muted md:text-lg">
          Third-year IEOR at IIT Bombay. Local-first AI and ambient intelligence: agents
          with native OS capability, without the cloud. Open to internships in agent
          infrastructure and OS-level systems.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-2xs uppercase tracking-[0.14em]">
          <a href="https://github.com/AgentWrapper/agent-orchestrator" target="_blank" rel="noopener noreferrer" className="text-accent no-underline hover:underline underline-offset-4">Agent Orchestrator →</a>
          <a href="https://github.com/harshitsinghbhandari" target="_blank" rel="noopener noreferrer" className="text-muted no-underline transition-colors hover:text-text">GitHub →</a>
          <Link href="/writing" className="text-muted no-underline transition-colors hover:text-text">Writing →</Link>
        </div>
      </Reveal>
    </section>
  )
}
```

- [ ] **Step 2: Verify render**

Run: `npm run dev` (leave running), then
`curl -s localhost:3000 | grep -c "shipping and coherent"`
Expected: `1`.

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat(redesign): voice-led hero, no WebGL"
```

---

### Task 5: SelectedWork (editorial rows) + work metadata

**Files:**
- Create: `lib/work.ts`
- Create: `components/SelectedWork.tsx`
- Delete: `components/WorkGrid.tsx`, `components/Ferrofluid.tsx`

**Interfaces:**
- Consumes: `Reveal`.
- Produces (`lib/work.ts`):
  - `interface Project { slug; index; category; name; whatItIs; proof; idea; kind: 'case' | 'demo' | 'repo'; href; featured: boolean }`
  - `PROJECTS: Project[]`
  - `getWorkSlugs(): string[]` (slugs of `kind: 'case'` projects, must match `content/work/*.mdx` created in Task 6)
- Produces: `SelectedWork` — featured rows + a small "also" list.

- [ ] **Step 1: Create `lib/work.ts`**

Facts below are from the personal-brand case studies; keep numbers exact, no em dashes.

```ts
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
```

- [ ] **Step 2: Create `components/SelectedWork.tsx`**

```tsx
import Link from 'next/link'
import Reveal from './Reveal'
import { PROJECTS, type Project } from '@/lib/work'

const linkLabel = (kind: Project['kind']) =>
  kind === 'case' ? 'case study →' : kind === 'demo' ? 'live demo →' : 'repo →'

function isExternal(href: string) {
  return href.startsWith('http')
}

export default function SelectedWork() {
  const featured = PROJECTS.filter((p) => p.featured)
  const also = PROJECTS.filter((p) => !p.featured)

  return (
    <section id="work" className="container-page py-24 md:py-32">
      <p className="label mb-10">SELECTED WORK</p>
      <div className="border-t border-border">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05}>
            <Link
              href={p.href}
              target={isExternal(p.href) ? '_blank' : undefined}
              rel={isExternal(p.href) ? 'noopener noreferrer' : undefined}
              className="group grid grid-cols-1 gap-4 border-b border-border py-10 no-underline md:grid-cols-[3rem_1fr] md:gap-8 md:py-12"
            >
              <span className="font-mono text-2xs text-subtle">{p.index}</span>
              <div className="max-w-[70ch]">
                <p className="label mb-3">{p.category}</p>
                <h3 className="font-display text-title text-text transition-colors group-hover:text-accent">
                  {p.name}
                </h3>
                <p className="mt-3 font-sans text-base leading-relaxed text-muted">{p.whatItIs}</p>
                <p className="mt-3 font-sans text-sm leading-relaxed text-subtle">{p.proof}</p>
                <p className="mt-4 font-display italic text-lg text-text/80">{p.idea}</p>
                <span className="mt-5 inline-block font-mono text-2xs uppercase tracking-[0.14em] text-accent">
                  {linkLabel(p.kind)}
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <ul className="mt-10 flex flex-col gap-3">
        {also.map((p) => (
          <li key={p.slug}>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-wrap items-baseline gap-x-3 font-mono text-2xs uppercase tracking-[0.12em] text-muted no-underline"
            >
              <span className="text-subtle">{p.name}</span>
              <span className="text-subtle/70 normal-case tracking-normal font-sans text-sm group-hover:text-muted">
                {p.whatItIs}
              </span>
              <span className="text-accent">repo →</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
```

- [ ] **Step 3: Delete dead components**

```bash
rm components/WorkGrid.tsx components/Ferrofluid.tsx
```

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: succeeds. Then `curl -s localhost:3000 | grep -c "SELECTED WORK"` -> at least `1`.

- [ ] **Step 5: Commit**

```bash
git add lib/work.ts components/SelectedWork.tsx
git commit -m "feat(redesign): editorial selected-work rows and project metadata"
```

---

### Task 6: Work case-study pages

**Files:**
- Create: `content/work/agent-orchestrator.mdx`, `content/work/donna.mdx`, `content/work/aegis.mdx`
- Create: `app/work/[slug]/page.tsx`
- Create: `app/work/[slug]/opengraph-image.tsx`

**Interfaces:**
- Consumes: `getAllDocs`, `getDocBySlug`, `getSlugs`, `formatDocDate` from `lib/content.ts`; `PROJECTS` from `lib/work.ts`.
- Produces: routes `/work/agent-orchestrator`, `/work/donna`, `/work/aegis`.

- [ ] **Step 1: Create the three MDX files**

Each file has frontmatter and an editorial body drafted from `~/Downloads/main-quests/personal-brand/case-studies/<name>.md`, rewritten in Harshit's voice (lead with the reusable idea; honest limitations; no em dashes). Frontmatter shape (example for `agent-orchestrator.mdx`):

```mdx
---
title: Agent Orchestrator
date: 2026-01-01
description: Release owner and migration lead on a 7.6k-star orchestrator for parallel coding agents.
category: Agent infrastructure
status: Shipped
role: Release owner, integration lead
stack: TypeScript, Node, npm
repo: https://github.com/AgentWrapper/agent-orchestrator
tags: [agents, orchestration, release-engineering]
---

## The reusable idea

Deterministic backend state is what lets many agents run in parallel without
corrupting each other. ...

## What it is

...

## The engineering that actually takes

...

## Honest limitations

...
```

Draft the body content from the case-study source files. Keep it substantive (300 to 600 words each). Do the same for `donna.mdx` (category "Local-first AI", status "Shipped, v0.3.0") and `aegis.mdx` (category "Agent safety", status "Shipped, hackathon build"). Use dates that sort sensibly (AO newest).

- [ ] **Step 2: Create `app/work/[slug]/page.tsx`**

Model it on `app/writing/[slug]/page.tsx` but read from the work dir and render the extra frontmatter (category, status, role, stack, repo). Include case-study JSON-LD (`@type: 'BlogPosting'` is acceptable; use it for consistency with writing).

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import path from 'node:path'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getDocBySlug, getSlugs, formatDocDate } from '@/lib/content'

const WORK_DIR = path.join(process.cwd(), 'content', 'work')

interface WorkPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return getSlugs(WORK_DIR).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: WorkPageProps): Metadata {
  const doc = getDocBySlug(WORK_DIR, params.slug)
  if (!doc) return {}
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/work/${params.slug}` },
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: 'article',
      url: `/work/${params.slug}`,
    },
    twitter: { card: 'summary_large_image', title: doc.title, description: doc.description },
  }
}

export default function WorkPage({ params }: WorkPageProps) {
  const doc = getDocBySlug(WORK_DIR, params.slug)
  if (!doc) notFound()
  const category = doc.category as string | undefined
  const status = doc.status as string | undefined
  const role = doc.role as string | undefined
  const stack = doc.stack as string | undefined
  const repo = doc.repo as string | undefined

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: doc.title,
    description: doc.description,
    datePublished: doc.date,
    dateModified: doc.date,
    author: { '@type': 'Person', name: 'Harshit Singh', url: 'https://theharshitsingh.com' },
    url: `https://theharshitsingh.com/work/${doc.slug}`,
    image: `https://theharshitsingh.com/work/${doc.slug}/opengraph-image`,
  }

  return (
    <article className="container-page pt-24 pb-24 md:pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="mx-auto w-full max-w-[920px] lg:max-w-[980px]">
        <Link href="/#work" className="label inline-flex items-center gap-2 no-underline transition-colors hover:text-text">
          <span aria-hidden="true">←</span> back to work
        </Link>
        <header className="mt-10 mb-12">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {category && <span className="label">{category}</span>}
            {status && (<><span className="label">·</span><span className="label">{status}</span></>)}
          </div>
          <h1 className="mt-5 font-display text-section text-text">{doc.title}</h1>
          <p className="mt-4 max-w-[760px] text-lg leading-relaxed text-muted">{doc.description}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1 font-mono text-2xs text-subtle">
            {role && <span>ROLE: {role}</span>}
            {stack && <span>STACK: {stack}</span>}
            {repo && (
              <a href={repo} target="_blank" rel="noopener noreferrer" className="text-accent no-underline hover:underline underline-offset-4">
                REPO →
              </a>
            )}
          </div>
          <div className="hairline mt-10" />
        </header>
        <div className="prose-writing">
          <MDXRemote source={doc.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </div>
      </div>
    </article>
  )
}
```

- [ ] **Step 3: Create `app/work/[slug]/opengraph-image.tsx`**

Copy `app/writing/[slug]/opengraph-image.tsx` and change its data source to `getDocBySlug(WORK_DIR, ...)`. (Read the writing OG file first to match its exact `ImageResponse` structure.)

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: three `/work/*` routes prerendered. Then `curl -s localhost:3000/work/agent-orchestrator | grep -c "reusable idea"` -> at least `1`.

- [ ] **Step 5: Commit**

```bash
git add content/work app/work
git commit -m "feat(redesign): editorial case-study pages for AO, Donna, Aegis"
```

---

### Task 7: About + WritingList + Contact, then wire homepage

**Files:**
- Create: `components/About.tsx`, `components/WritingList.tsx`, `components/Contact.tsx`
- Delete: `components/AboutSplit.tsx`, `components/NotesPreview.tsx`, `components/ContactFinale.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `Reveal`; `getAllPosts`, `formatPostDate` from `lib/writing`.
- Produces: `About`, `WritingList`, `Contact` (default exports), wired into `app/page.tsx`.

- [ ] **Step 1: Create `components/About.tsx`** (voice paragraph, static)

```tsx
import Reveal from './Reveal'

export default function About() {
  return (
    <section id="about" className="container-page py-24 md:py-32">
      <Reveal>
        <p className="label mb-8">ABOUT</p>
        <div className="max-w-[68ch] font-display text-title leading-[1.3] text-text/90">
          I build the infrastructure that gives agents context and lets them execute
          safely. I would rather write the low-level execution environment and the safety
          rails than one more wrapper. My focus is local-first AI: voice, screen, and
          memory that stay on the machine.
        </div>
        <p className="mt-8 max-w-[62ch] font-sans text-base leading-relaxed text-muted">
          Third-year IEOR at IIT Bombay, class of 2028. Top human contributor and release
          owner on Agent Orchestrator. Building Donna and Aegis on the side.
        </p>
        <p className="mt-6 font-mono text-2xs uppercase tracking-[0.14em] text-subtle">
          NOW: agent reliability, local-first execution, OS-level safety rails.
        </p>
      </Reveal>
    </section>
  )
}
```

- [ ] **Step 2: Create `components/WritingList.tsx`** (restyle of NotesPreview, Newsreader titles)

```tsx
import Link from 'next/link'
import Reveal from './Reveal'
import { formatPostDate, getAllPosts } from '@/lib/writing'

export default function WritingList() {
  const posts = getAllPosts().slice(0, 4)
  if (posts.length === 0) return null
  return (
    <section id="writing" className="container-page py-24 md:py-32">
      <p className="label mb-10">WRITING</p>
      <ul className="border-t border-border">
        {posts.map((post, i) => (
          <li key={post.slug} className="border-b border-border">
            <Reveal delay={i * 0.04}>
              <Link
                href={`/writing/${post.slug}`}
                className="group grid grid-cols-1 gap-2 py-8 no-underline md:grid-cols-[160px_1fr] md:items-baseline md:gap-8"
              >
                <span className="font-mono text-2xs text-subtle">{formatPostDate(post.date)}</span>
                <div className="max-w-[68ch]">
                  <h3 className="font-display text-title text-text transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="mt-2 font-sans text-base leading-relaxed text-muted">{post.description}</p>
                  )}
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Link href="/writing" className="font-mono text-2xs uppercase tracking-[0.14em] text-accent no-underline hover:underline underline-offset-4">
          all writing →
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create `components/Contact.tsx`** (quiet, no scroll-jack)

```tsx
import Reveal from './Reveal'

const socials = [
  { label: 'github', href: 'https://github.com/harshitsinghbhandari' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/harshitsinghbhandari/' },
  { label: 'x', href: 'https://x.com/HSBhandari955' },
]

export default function Contact() {
  return (
    <section id="contact" className="container-page py-24 md:py-40">
      <Reveal>
        <p className="label mb-8"><span className="accent-dot" />CONTACT</p>
        <p className="max-w-[60ch] font-display text-section text-text">
          Open to internships in agent infrastructure, local-first AI, and OS-level systems.
        </p>
        <a
          href="mailto:harshitsingh@iitb.ac.in"
          className="mt-8 inline-block font-display text-title text-accent no-underline hover:underline underline-offset-4"
        >
          harshitsingh@iitb.ac.in →
        </a>
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="font-mono text-2xs uppercase tracking-[0.14em] text-muted no-underline transition-colors hover:text-text">
                {s.label} →
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-10 font-mono text-2xs text-subtle">Based in Mumbai.</p>
      </Reveal>
    </section>
  )
}
```

- [ ] **Step 4: Rewrite `app/page.tsx` body**

Keep the `personLd` script block exactly as-is. Replace the imports and JSX:

```tsx
import Hero from '@/components/Hero'
import SelectedWork from '@/components/SelectedWork'
import WritingList from '@/components/WritingList'
import About from '@/components/About'
import Contact from '@/components/Contact'
```

and the fragment body to:

```tsx
      <Hero />
      <SelectedWork />
      <WritingList />
      <About />
      <Contact />
```

- [ ] **Step 5: Delete dead components**

```bash
rm components/AboutSplit.tsx components/NotesPreview.tsx components/ContactFinale.tsx
```

- [ ] **Step 6: Verify**

Run: `npm run build`
Expected: succeeds, no import errors. Then:
`curl -s localhost:3000 | grep -Eic "contact|about|writing"` -> nonzero.

- [ ] **Step 7: Commit**

```bash
git add components/About.tsx components/WritingList.tsx components/Contact.tsx app/page.tsx
git commit -m "feat(redesign): about, writing column, quiet contact, wire homepage"
```

---

### Task 8: Restyle writing pages

**Files:**
- Modify: `app/writing/[slug]/page.tsx:82` (title font)
- Modify: `app/writing/page.tsx` (index titles to Newsreader)
- Modify: `app/globals.css:75-94` (`prose-writing` headings to Newsreader)

**Interfaces:**
- No new exports. Visual only.

- [ ] **Step 1: Post title to Newsreader**

In `app/writing/[slug]/page.tsx` line 82, change the `<h1>` class from `font-sans text-3xl font-semibold tracking-tight text-text md:text-4xl` to `font-display text-section text-text`.

- [ ] **Step 2: Index titles to Newsreader**

Read `app/writing/page.tsx`. For each post title heading, change `font-sans` (or whatever display class it uses) to `font-display text-title`, and ensure dates use `font-mono text-2xs text-subtle`. Match the `WritingList` styling for consistency.

- [ ] **Step 3: Prose headings to Newsreader**

In `app/globals.css`, in the `.prose-writing` block, change `prose-headings:font-sans` to `prose-headings:font-display` and reduce heading weights (`prose-h2:font-medium prose-h3:font-medium` instead of `font-semibold`) so the serif headings read editorial, not heavy.

- [ ] **Step 4: Verify**

Run: `npm run build` then `curl -s localhost:3000/writing | grep -c "font-display"` is not a valid check (classes are compiled). Instead open `localhost:3000/writing` and one post in a browser via `npm run dev` and confirm titles render in the serif. Minimum automated check: `npm run build` succeeds.

- [ ] **Step 5: Commit**

```bash
git add app/writing app/globals.css
git commit -m "feat(redesign): restyle writing index and posts to editorial system"
```

---

### Task 9: Extend SEO, cleanup, final verification

**Files:**
- Modify: `app/sitemap.ts`
- Modify: `scripts/check-sitemap.mjs`
- Modify: `package.json` (remove `ogl`)
- Delete: `src/` directory

**Interfaces:**
- Produces: sitemap entries for `/work` case-study slugs.

- [ ] **Step 1: Add work routes to sitemap**

Read `app/sitemap.ts`. Add entries for each `getWorkSlugs()` slug at `/work/${slug}` (import from `@/lib/work`), mirroring how writing slugs are added. If the sitemap currently imports `getAllPosts` for writing, follow that exact pattern.

- [ ] **Step 2: Extend the SEO check**

Read `scripts/check-sitemap.mjs`. Add an assertion that the generated sitemap includes at least one `/work/` URL. Keep existing assertions.

- [ ] **Step 3: Remove ogl and stray src**

```bash
npm remove ogl
rm -rf src
```

Confirm no source imports `ogl`: `grep -rn "ogl" app components lib` -> no results.

- [ ] **Step 4: Full verification**

```bash
npm run build
npm run check:seo
grep -rn "—" app components content lib || echo "no em dashes"
```

Expected: build succeeds; `check:seo` passes; the em-dash grep prints `no em dashes` (or only matches inside this plan/spec docs, which are outside those dirs).

- [ ] **Step 5: Commit**

```bash
git add app/sitemap.ts scripts/check-sitemap.mjs package.json package-lock.json
git commit -m "feat(redesign): sitemap covers work pages, drop ogl and stray src"
```

---

## Self-review (author)

- **Spec coverage:** tokens+font (T1), loader generalization (T2), simple nav (T3), voice hero (T4), editorial work rows + metadata (T5), case-study pages (T6), about/writing/contact + homepage wiring (T7), writing restyle (T8), SEO extend + deletions (T9). Every spec deletion is assigned (Ferrofluid T5, CursorFollower T1, MenuOverlay T3, AboutSplit/NotesPreview/ContactFinale T7, ogl+src T9). Every preserved-SEO item covered (T6 JSON-LD + OG, T9 sitemap + check).
- **Placeholders:** hero/about copy is intentionally provisional and labeled as such per user ("we can change wording later"); it is real, renderable text, not a TODO. Case-study MDX bodies are drafted from named source files with a concrete structure, not "fill in later."
- **Type consistency:** loader renames are consistent (`getAllDocs/getDocBySlug/getSlugs/formatDocDate`), `lib/writing.ts` keeps its original public names, `Project` shape matches `getWorkSlugs` and the `/work/[slug]` page frontmatter fields (category/status/role/stack/repo).
- **Known soft spot:** Task 6 Step 3 and Task 8 Step 2 require reading an existing file first (writing OG image, writing index) because their exact current markup is not reproduced here; both steps say so explicitly.
