# AGENTS.md

Guidance for AI agents working on this repo. Read this before editing.

## Project Overview

Harshit Singh's one-page personal site, live at `theharshitsingh.com`. Hosted
on Vercel, deployed automatically from `main`. Next.js 14 (App Router),
Tailwind CSS, Geist Sans and Geist Mono via the `geist` package.

The only route is `/`. Every other path 308-redirects to `/` via
`next.config.mjs`, except `/tools` and `/static`, which `vercel.json`
redirects to subdomains at the Vercel edge, and the meta endpoints:
`robots.txt`, `sitemap.xml`, `llms.txt`, `manifest.webmanifest`,
`opengraph-image`, `apple-icon`.

## Ironclad Rules

Read these before doing anything. Violating them is worse than not making
the change at all.

1. **Never ever add a stub button, link, or anything clickable without
   something real behind it.** No `href="#"`, no `onClick={() => {}}`, no
   "coming soon" affordances, no nav items pointing to routes that do not
   exist. If the destination is not built yet, do not put the entry point on
   the page. A broken link is worse than a missing feature.

2. **No em-dashes anywhere.** Not in copy, comments, commit messages, or
   chat. Use a period, comma, colon, semicolon, or parentheses instead.
   Existing em-dashes you encounter should be replaced.

3. **No "Composio" brand framing.** The Agent Orchestrator project lives at
   `github.com/AgentWrapper/agent-orchestrator` with 8,000+ stars. Do not
   reintroduce "Composio", "ComposioHQ", or any framing that ties Agent
   Orchestrator to that brand.

4. **Do not invent recognitions, awards, or credentials.** Anything claimed
   on the site must be real and verifiable.

5. **Verify a route exists before linking to it.** Only `/` exists. If you
   add a link or CTA pointing anywhere else, confirm the target is one of
   the meta endpoints or an external URL, not an internal page.

## Key Paths

- `app/page.tsx`: the homepage and only route. Name, tagline, one bio
  paragraph, contact email. Emits `Person` and `WebSite` JSON-LD.
- `app/layout.tsx`: global shell. Loads Geist Sans and Geist Mono via
  `next/font` (`geist/font/sans`, `geist/font/mono`), sets `dark` class and
  `color-scheme: dark`, mounts `Navbar` and `Footer` around
  `<main id="main">`, includes a skip-to-content link.
- `app/opengraph-image.tsx`, `app/apple-icon.tsx`: root OG image and Apple
  touch icon, generated with `next/og` `ImageResponse`.
- `app/sitemap.ts`: just `/`.
- `app/robots.ts`: allows `*` plus an explicit allowlist of AI/answer-engine
  crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.), points
  at `/sitemap.xml`.
- `app/manifest.ts`: PWA manifest.
- `app/llms.txt/route.ts`: plain-text LLM-facing summary (bio, profile
  links), statically generated.
- `next.config.mjs`: redirects every path to `/` except the meta endpoints
  above and `/tools`, `/static` (handled by `vercel.json`).

### Components

Only two components exist.

- `components/Navbar.tsx`: text nav bar: wordmark "Harshit Singh" left,
  `GitHub / X` links right, hairline divider below.
- `components/Footer.tsx`: link row (GitHub, X, LinkedIn, Email) plus a
  copyright line, above a hairline.

### Data / lib

- `lib/person.ts`: `SITE_URL`, `PERSON_ID`, `personLd` (schema.org `Person`
  JSON-LD).

### Design system

- `tailwind.config.ts`: color tokens `bg` (`#000000`), `surface`
  (`#0d0d0f`), `border` (`#242428`), `text` (`#ededf0`), `muted`
  (`#8f8f97`), `subtle` (`#5c5c63`), `accent` (`#9d8cf0`, lavender). Font
  families `sans`/`mono` map to the Geist CSS variables; there is no
  `serif` family. A `2xs` font size for mono labels. `maxWidth.page` is
  `768px`.
- `app/globals.css`: `.container-page`, `.label`, `.hairline`. No article
  typography classes; there is no MDX content left to style.

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
```

Always run `npm run build` before pushing. Vercel will reject a broken build
but it is faster to catch locally.

## Style Notes

- Visual aesthetic: near-black background (`#000000`), Geist Sans body copy,
  restrained lavender accent (`#9d8cf0`) used only for links, hover states,
  and small marks, never as a large fill. Editorial and minimal, not bold or
  oversized.
- Prefer existing utility classes and tokens from `tailwind.config.ts` and
  `globals.css` before inventing new ones.
- Animation defaults: CSS transitions for hover states. `globals.css` gates
  all animation/transition/scroll behavior under
  `prefers-reduced-motion: reduce`.
- Headings use ordinary Tailwind text-size utilities (`text-4xl`, etc.), not
  any custom display scale.
- Avoid unrelated refactors when fixing a single issue. This repo does not
  maintain a changelog.

## Deploy

- `main` is the deployable branch. Vercel auto-deploys on push.
- Production domain: `theharshitsingh.com`.
- `vercel.json` holds redirect rules for subdomain shortcuts (`/tools`,
  `/static`). Leave those alone unless explicitly asked. It does not hold a
  www redirect; that is handled at the Vercel domain level.

## Memory About Harshit

- Major: **IEOR (Industrial Engineering & Operations Research)** at IIT
  Bombay. **Not CS.** Always check before writing "CS student".
- Year: **3rd year**, class of 2028.
- GitHub: `harshitsinghbhandari`. Email: `harshitsingh@iitb.ac.in`. X:
  `the_hsbhandari` (verified against `lib/person.ts` `sameAs`; the old
  `HSBhandari955` handle is stale, do not reuse it).
- Hermes is Nous Research's, not his.
