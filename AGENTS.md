# AGENTS.md

Guidance for AI agents working on this repo. Read this before editing.

## Project Overview

Harshit Singh's portfolio site, live at `theharshitsingh.com`. Hosted on Vercel, deployed automatically from `main`.

Stack: Next.js 14 (App Router), Tailwind CSS (with `@tailwindcss/typography`), Framer Motion, MDX for writing and case-study content (`next-mdx-remote`, `remark-gfm`, `gray-matter`), Geist Sans and Geist Mono via the `geist` package. There is no WebGL and no `ogl` dependency; that stack was removed in the July 2026 redesign.

Visual direction is a quiet, near-black editorial layout: name-first, left-aligned prose, hairline dividers, restrained lavender accent. No oversized display serif, no scroll-jacked sections, no cursor follower, no full-screen menu overlay. See `docs/superpowers/specs/2026-07-07-editorial-notebook-redesign-design.md` for the redesign rationale (note: that spec called for a Newsreader display font and a red `#c8443f` accent; the shipped code uses Geist Sans/Mono only and a lavender `#9d8cf0` accent, so trust the code over the spec for exact tokens).

## Ironclad Rules

Read these before doing anything. Violating them is worse than not making the change at all.

1. **Never ever add a stub button, link, or anything clickable without something real behind it.** No `href="#"`, no `onClick={() => {}}`, no "coming soon" affordances, no buttons that scroll to nothing, no nav items pointing to routes that do not exist. If the destination is not built yet, do not put the entry point on the page. A broken link is worse than a missing feature.

2. **No em-dashes anywhere.** Not in copy, comments, commit messages, or chat. Use a period, comma, colon, semicolon, or parentheses instead. Existing em-dashes you encounter should be replaced.

3. **No "Composio" brand framing.** The Agent Orchestrator project was transferred out of `ComposioHQ`. Reference it as "Agent Orchestrator" at `github.com/AgentWrapper/agent-orchestrator` with 8,000+ stars. Do not reintroduce "Composio", "ComposioHQ", or "top contributor to Composio" anywhere.

4. **Do not invent recognitions, awards, or credentials.** Anything claimed on the site must be real and verifiable.

5. **Verify routes before linking to them.** Running list of routes that **do not exist**: `/work` (index; only `/work/[slug]` case-study pages exist), `/projects`, `/recognitions`, `/resume`, `/contact` (contact is a section of `/about` plus the footer, not its own page). If you add a menu item or CTA pointing somewhere, open `app/` and confirm the page exists first.

## Key Paths

### Routing
- `app/page.tsx`: homepage. Name and one-line tagline, a two-paragraph voice bio, a "Writing" section (`PostList` limited to 5 posts), and a "Projects" section listing case-kind entries from `lib/work.ts` as hairline-divided rows.
- `app/about/page.tsx`: About page. Sections: intro, Agent Orchestrator, Local-first AI (Donna, Aegis), Writing pointer, Contact (email plus GitHub/LinkedIn/X links). Emits `ProfilePage` JSON-LD.
- `app/writing/page.tsx`: writing index, renders `PostList` with no limit.
- `app/writing/[slug]/page.tsx`: individual MDX post renderer via `MDXRemote`, emits `BlogPosting` JSON-LD, generates static params from `lib/writing.ts`.
- `app/writing/[slug]/opengraph-image.tsx`: per-post OG image.
- `app/work/[slug]/page.tsx`: MDX case-study renderer (Agent Orchestrator, Donna, Aegis), reads from `content/work/*.mdx` via `lib/content.ts` directly, emits `BlogPosting` JSON-LD. There is no `/work` index page; case studies are only linked from the homepage Projects list.
- `app/work/[slug]/opengraph-image.tsx`: per-case-study OG image.
- `app/layout.tsx`: global shell. Loads Geist Sans and Geist Mono via `next/font` (`geist/font/sans`, `geist/font/mono`), sets `dark` class and `color-scheme: dark`, mounts `Navbar` and `Footer` around `<main id="main">`, includes a skip-to-content link.
- `app/opengraph-image.tsx`, `app/apple-icon.tsx`: root OG image and Apple touch icon, both generated with `next/og` `ImageResponse`.
- `app/sitemap.ts`: includes `/`, `/about`, `/writing`, every writing post, and every work case-study slug.
- `app/robots.ts`: allows `*` plus an explicit allowlist of AI/answer-engine crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.), points at `/sitemap.xml`.
- `app/manifest.ts`: PWA manifest, `background_color`/`theme_color` `#0a0a0b`.
- `app/feed.xml/route.ts`: hand-built RSS 2.0 feed over `lib/writing.ts` posts, statically generated (`dynamic = 'force-static'`).
- `app/llms.txt/route.ts`: plain-text LLM-facing summary (bio, projects, writing index, profile links), statically generated.

### Components
Only three components exist. There is no `Hero.tsx`, `AboutSplit.tsx`, `WorkGrid.tsx`, `NotesPreview.tsx`, `ContactFinale.tsx`, `MenuOverlay.tsx`, `Ferrofluid.tsx`, `CursorFollower.tsx`, or `ScrollToTop.tsx`. All of those were removed in the redesign.
- `components/Navbar.tsx`: text nav bar: wordmark "Harshit Singh" left, `Writing / About / GitHub / X` links right, hairline divider below.
- `components/Footer.tsx`: link row (About, GitHub, X, LinkedIn, Email) plus a copyright line, above a hairline.
- `components/PostList.tsx`: renders posts from `lib/writing.ts` as hairline-divided rows (title, short date, description); takes an optional `limit` prop.

### Data / lib
- `lib/content.ts`: shared MDX document loader. Reads `.mdx` files from a given directory, parses frontmatter with `gray-matter`, strips a leading `# ` heading (the page header renders the title separately), filters drafts outside development, sorts by date descending. Exports `getAllDocs`, `getDocBySlug`, `getSlugs`, `formatDocDate`.
- `lib/writing.ts`: thin wrapper over `lib/content.ts` pointed at `content/writing`. Exports `getAllPosts`, `getPostBySlug`, `getAllSlugs`, `formatPostDate`.
- `lib/work.ts`: static `PROJECTS` array (Agent Orchestrator, Donna, Aegis as `kind: 'case'` with `content/work/*.mdx` pages; Graph Isomorphism and emagg as `kind: 'repo'`/`'demo'` linking straight to GitHub). Exports `getWorkSlugs()` for the sitemap.
- `lib/person.ts`: `SITE_URL`, `PERSON_ID`, `personLd` (schema.org `Person` JSON-LD), `personRef` (compact author reference for `BlogPosting` nodes), `feedAlternates` (RSS alternate link metadata used across page `metadata.alternates.types`).

### Content
- `content/writing/*.mdx`: blog post sources, loaded through `lib/writing.ts`.
- `content/work/*.mdx`: case-study sources for `agent-orchestrator`, `donna`, `aegis`, loaded through `lib/content.ts` directly by `app/work/[slug]/page.tsx`.

### Design system
- `tailwind.config.ts`: color tokens `bg` (`#000000`), `surface` (`#0d0d0f`), `border` (`#242428`), `text` (`#ededf0`), `muted` (`#8f8f97`), `subtle` (`#5c5c63`), `accent` (`#9d8cf0`, lavender, not red). Font families `sans`/`mono` map to the Geist CSS variables; there is no `serif` family. A `2xs` font size for mono labels. `maxWidth.page` is `768px`.
- `app/globals.css`: `.container-page`, `.label`, `.hairline`, `.prose-writing` (the MDX article typography, built on `@tailwindcss/typography`'s `prose`/`prose-invert`). There is no `.font-display`, `.accent-dot`, or `.ferrofluid-container`; none of those classes exist in this codebase.

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run check:seo   # runs scripts/check-sitemap.mjs
```

Always run `npm run build` before pushing. Vercel will reject a broken build but it is faster to catch locally.

## Writing Page Rules

- Individual writing pages use the full article layout in `app/writing/[slug]/page.tsx`; case studies use the analogous layout in `app/work/[slug]/page.tsx`.
- Prose text should stay readable, but wide content such as code blocks and tables should be allowed to use the wider article column (`.prose-writing` already sets `pre`/`table` to scroll horizontally rather than overflow the page).
- MDX posts may use GitHub-flavored Markdown. Keep `remark-gfm` wired into the renderer so tables render as tables.
- Do not duplicate the post or case-study title in rendered content. `lib/content.ts` strips a leading `#` heading because the page header already renders the title.

## Style Notes

- Visual aesthetic: near-black background (`#000000`), Geist Sans body copy, restrained lavender accent (`#9d8cf0`) used only for links, hover states, and small marks, never as a large fill. Editorial and minimal, not bold or oversized.
- Prefer existing utility classes and tokens from `tailwind.config.ts` and `globals.css` before inventing new ones.
- Animation defaults: Framer Motion for JS-driven motion, CSS transitions for hover states. `globals.css` gates all animation/transition/scroll behavior under `prefers-reduced-motion: reduce`.
- Headings use ordinary Tailwind text-size utilities (`text-4xl`, `text-lg`, etc.), not any custom display scale. Do not reintroduce oversized display type tokens.
- Avoid unrelated refactors when fixing a single issue. This repo does not maintain a changelog.

## Content Tracking

Content and incremental updates are tracked as **GitHub Issues** on this repo. Standard labels: `content`, `design`, `feature`, `bug`, `polish`, `assets`. Open issues before starting work on anything non-trivial so the trail is preserved.

## Deploy

- `main` is the deployable branch. Vercel auto-deploys on push.
- Production domain: `theharshitsingh.com`.
- `vercel.json` holds redirect rules for subdomain shortcuts (`/tools`, `/static`). Leave those alone unless explicitly asked. It does not hold a www redirect; that is handled at the Vercel domain level.

## Memory About Harshit

- Major: **IEOR (Industrial Engineering & Operations Research)** at IIT Bombay. **Not CS.** Always check before writing "CS student".
- Year: **3rd year**, class of 2028.
- GitHub: `harshitsinghbhandari`. Email: `harshitsingh@iitb.ac.in`. X: `the_hsbhandari` (verified against `lib/person.ts` `sameAs`; the old `HSBhandari955` handle is stale, do not reuse it).
- Projects he built: Agent Orchestrator (release owner, migration lead), Donna, Aegis, Graph Isomorphism via Spectral Embeddings, emagg, Study Buddy, Moodle automation, discord-archive.
- Hermes is Nous Research's, not his.
