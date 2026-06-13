# AGENTS.md

Guidance for AI agents working on this repo. Read this before editing.

## Project Overview

Harshit Singh's portfolio site, live at `theharshitsingh.com`. Hosted on Vercel, deployed automatically from `main`.

Stack: Next.js 14 (App Router), Tailwind, Framer Motion, MDX for writing, `ogl` for the Ferrofluid WebGL background, Instrument Serif (display) + Geist Sans/Mono (body).

Visual direction is **Jopecuro-style**: oversized display serif typography, dark BG with a single red accent (`#e63946`), heavy use of scroll-driven motion. Not "restrained" or "minimal" — bold.

## Ironclad Rules

Read these before doing anything. Violating them is worse than not making the change at all.

1. **Never ever add a stub button, link, or anything clickable without something real behind it.** No `href="#"`, no `onClick={() => {}}`, no "coming soon" affordances, no buttons that scroll to nothing, no nav items pointing to routes that do not exist. If the destination is not built yet, do not put the entry point on the page. A broken link is worse than a missing feature.

2. **No em-dashes anywhere.** Not in copy, comments, commit messages, or chat. Use a period, comma, colon, semicolon, or parentheses instead. Existing em-dashes you encounter should be replaced.

3. **No "Composio" brand framing.** The Agent Orchestrator project was transferred out of `ComposioHQ`. Reference it as "Agent Orchestrator" at `github.com/AgentWrapper/agent-orchestrator` with 7,500 stars. Do not reintroduce "Composio", "ComposioHQ", or "top contributor to Composio" anywhere.

4. **Do not invent recognitions, awards, or credentials.** Anything claimed on the site must be real and verifiable.

5. **Verify routes before linking to them.** Running list of routes that **do not exist**: `/projects`, `/projects/donna`, `/recognitions`, `/resume`. If you add a menu item or CTA pointing somewhere, open `app/` and confirm the page exists first.

## Key Paths

### Routing
- `app/page.tsx` — homepage composition. Section order: `Hero` → `AboutSplit` → `WorkGrid` → `NotesPreview` → `ContactFinale`.
- `app/writing/page.tsx` — writing index.
- `app/writing/[slug]/page.tsx` — individual MDX post renderer.
- `app/layout.tsx` — global shell. Loads fonts (Geist Sans, Geist Mono, Instrument Serif via `next/font/google`), mounts `Navbar`, `Footer`, `CursorFollower`, `ScrollToTop`.

### Components (homepage)
- `components/Hero.tsx` — Ferrofluid background + animated "Harshit Singh," wordmark.
- `components/Ferrofluid.tsx` — WebGL shader background via `ogl`. Performance-sensitive; do not duplicate the renderer.
- `components/AboutSplit.tsx` — portrait left, 3-pane carousel right with rotating-word headlines.
- `components/WorkGrid.tsx` — currently a single feature card for Agent Orchestrator. Image fades to transparent at the bottom via `mask-image` so text reads cleanly.
- `components/NotesPreview.tsx` — 3 latest writing posts via `lib/writing.ts`.
- `components/ContactFinale.tsx` — scroll-driven `GET IN` / `TOUCH` split that exits to opposite sides, then a full-screen email + socials takeover. Uses Framer Motion's `useScroll` + `useTransform`.

### Components (global UI)
- `components/Navbar.tsx` — monogram `h,` left, hamburger right. Opens `MenuOverlay`.
- `components/MenuOverlay.tsx` — full-viewport dialog with focus trap, Esc-to-close, oversized serif links. Only links to routes that exist.
- `components/CursorFollower.tsx` — small red dot, spring physics, `mix-blend-difference`. Skipped on touch devices.
- `components/ScrollToTop.tsx` — appears past 60vh, smooth-scrolls to top.
- `components/Footer.tsx` — single line, `Created by Harshit Singh. © <year>.`

### Data
- `content/writing/*.mdx` — blog post sources.
- `lib/writing.ts` — MDX loader, frontmatter parsing, slug helpers, date formatting.

### Design system
- `tailwind.config.ts` — color tokens (`bg`, `surface`, `border`, `text`, `muted`, `subtle`, `accent`), font families (`sans`/`mono`/`serif`), display font sizes (`text-display`, `text-section`, `text-finale`).
- `app/globals.css` — `.container-page`, `.label`, `.hairline`, `.font-display`, `.accent-dot`, `.ferrofluid-container`, `.prose-writing`.

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
```

Always run `npm run build` before pushing — Vercel will reject a broken build but it is faster to catch locally.

## Writing Page Rules

- Individual writing pages should use the full article layout in `app/writing/[slug]/page.tsx`.
- Prose text should stay readable, but wide content such as code blocks and tables should be allowed to use the wider article column.
- MDX posts may use GitHub-flavored Markdown. Keep `remark-gfm` wired into the renderer so tables render as tables.
- Do not duplicate the post title in rendered content. `lib/writing.ts` strips a leading `#` heading because the page header already renders the title.

## Style Notes

- Visual aesthetic: oversized Instrument Serif headlines, dark `#08080a` BG, single red accent (`#e63946`). Bold, not minimal.
- Prefer existing utility classes and tokens from `tailwind.config.ts` and `globals.css` before inventing new ones.
- Animation defaults: Framer Motion for JS-driven motion, CSS transitions for hover states. Long CSS-only loops are softened under `prefers-reduced-motion` but Framer Motion handles its own reduced-motion behavior.
- Section headlines use `text-section` (`clamp(80px, 14vw, 220px)`) and intentionally hug or escape the container edge (`-ml-[1vw]`). Do not normalize this.
- Avoid unrelated refactors when fixing a single issue. This repo does not maintain a changelog.

## Content Tracking

Content and incremental updates are tracked as **GitHub Issues** on this repo. Standard labels: `content`, `design`, `feature`, `bug`, `polish`, `assets`. Open issues before starting work on anything non-trivial so the trail is preserved.

## Deploy

- `main` is the deployable branch. Vercel auto-deploys on push.
- Production domain: `theharshitsingh.com`.
- `vercel.json` holds redirect rules for subdomain shortcuts (`/tools`, `/static`). Leave those alone unless explicitly asked.

## Memory About Harshit

- Major: **IEOR (Industrial Engineering & Operations Research)** at IIT Bombay. **Not CS.** Always check before writing "CS student".
- Year: **3rd year**, class of 2028.
- GitHub: `harshitsinghbhandari`. Email: `harshitsingh@iitb.ac.in`. X: `HSBhandari955`.
- Projects he built: Donna, Aegis, ArmorIQ, Study Buddy, Moodle automation, discord-archive.
- Hermes is Nous Research's — not his.
