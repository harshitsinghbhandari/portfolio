# Editorial Notebook — portfolio redesign

Date: 2026-07-07
Status: approved design, pending implementation plan

## Goal

Replace the current art-director / trend-kit portfolio (WebGL ferrofluid hero,
giant serif, letter animation, scroll-jacked contact) with a quiet, typographic,
near-black "editorial notebook." The site should read like a serious engineer's
journal. Taste comes from typesetting, rhythm, and restraint, not effects.

This direction is not invented here. It matches the positioning and aesthetic
already written down in the personal-brand docs:

- Positioning (verbatim, `context.md`): "I keep a real ~7.6k-star multi-agent
  coding system shipping and coherent. Here's the engineering that actually
  takes."
- Aesthetic (verbatim, `context.md`): "Editorial-quiet. Newsreader font,
  near-black palette, visual minimalism over flashy/3D."

## Decisions locked during brainstorming

- 5-second belief: "builder with taste" (range across systems, AI, writing;
  distinctive voice; the craft of the site is part of the pitch).
- Homepage emphasis: lead voice, then proof. Open with a sharp positioning
  sentence in Harshit's voice, AO credential stated inline, then a balanced body
  of work + essays.
- Project depth: editorial case-study pages for featured projects (AO, Donna,
  Aegis).
- Scope: whole site in one coherent pass (home + work pages + writing pages).
- Accent: keep a restrained red, used sparingly (deep `#c8443f`).
- Portrait in About: off for now (add later if wanted).
- Stack unchanged: Next.js 14 App Router + MDX + Tailwind, deployed on Vercel.

## Non-goals

- No WebGL, no scroll-jacking, no letter-by-letter animation, no rotating
  buzzwords, no cursor follower.
- No separate About or Contact pages (they are homepage sections). YAGNI.
- No unrelated refactors beyond removing the dead art-director components and the
  stray `src/` directory.

## Design system

### Typography

- Display: **Newsreader** (loaded via `next/font/google`), for the hero
  statement, section headers, project names, and post titles. Its italic is the
  emphasis device.
- Body: **Geist Sans** (keep), for running prose and descriptions.
- Mono: **Geist Mono** (keep), for kickers, dates, metadata, labels, and code.
- Scale (much smaller than current):
  - hero: `clamp(38px, 6vw, 80px)`
  - section head: `clamp(26px, 3vw, 44px)`
  - project/post title: `clamp(24px, 2.6vw, 40px)`
  - Remove the `display` / `section` / `finale` giant tokens (72–360px).
- Alignment: left-aligned throughout (editorial). The current centered hero
  becomes left-aligned.
- Hierarchy comes from weight, italic, and whitespace, not brute size.

### Color (refined near-black, slightly warm)

| token   | value     | use                                   |
|---------|-----------|---------------------------------------|
| bg      | `#0a0a0b` | page background                       |
| surface | `#111113` | raised blocks                         |
| border  | `#1e1e22` | hairlines, dividers                   |
| text    | `#f1efea` | body text (a hair warm, newsprint)    |
| muted   | `#8a8a93` | secondary text                        |
| subtle  | `#5b5b63` | tertiary / captions                   |
| accent  | `#c8443f` | tiny marks only (hover underline, dot, wordmark comma) |

Accent is used sparingly. It is never a fill for large areas.

### Motion

- Subtle fade / rise on scroll-in only, short duration.
- Gated behind `prefers-reduced-motion: reduce` (currently the site has no such
  guard; add one).
- Keep `framer-motion` for these small reveals. Drop the `ogl` dependency.

### Layout

- Text column max-width ~680–760px for readability; page frame max-width ~1100px
  (keep `max-w-page`).
- Generous vertical rhythm, hairline dividers between rows and sections.

## Site map

- `/` — home (voice hero, selected work, writing, about, contact sections)
- `/work/[slug]` — editorial case-study pages (new), MDX-driven. Featured: AO,
  Donna, Aegis.
- `/writing` — index (restyled)
- `/writing/[slug]` — post (restyled)
- Navigation: a simple persistent text bar. Wordmark left; `Work · Writing ·
  About · Contact` right. Mobile gets a compact version. The full-screen
  `MenuOverlay` is removed.

## Homepage, top to bottom

1. **Nav** — minimal persistent text bar.
2. **Hero (voice).** Mono kicker (`Systems & AI infrastructure · IIT Bombay`). A
   two-sentence Newsreader positioning statement in Harshit's voice, from the
   locked line: "I keep a 7,600-star multi-agent system shipping and coherent. I
   write the low-level execution environments and safety rails that make
   autonomous agents reliable." Quiet metadata sub-line (`IEOR '28 · local-first
   AI · open to internships`) plus inline links (AO, GitHub). One gentle fade,
   no other animation. Left-aligned.
3. **Selected Work.** Editorial rows with hairline dividers (not image tiles).
   Each row: `01` index, mono category, Newsreader name, one-line what-it-is, the
   single proof point, a one-line "the idea," and a link:
   - `case study →` for AO, Donna, Aegis
   - `live demo →` for Graph Isomorphism
   - `repo →` for the rest
   4 featured; `emagg` and `iitb-agent` appear as small list items below.
4. **Writing.** A real column: 3–4 recent essays (mono date, Newsreader title,
   description), then `all writing →`.
5. **About.** One tight paragraph in Harshit's actual voice (honest, no fluff,
   drawn from `self-model.md`), plus a small `now` line. Portrait off for now.
6. **Contact.** Quiet. One line ("Open to internships in agent infra,
   local-first AI, OS-level systems"), email as a restrained link, socials as
   small text links, footer. Replaces the 220vh scroll-jacked `ContactFinale`.

## Case-study page `/work/[slug]`

- Content: new `content/work/*.mdx` files, one per featured project.
- Loader: generalize `lib/writing.ts` so it can serve both `content/writing` and
  `content/work` (a `getAllPosts(dir)` / `getPost(dir, slug)` shape, or a thin
  `lib/content.ts` the two call into). Keep the existing writing API working.
- Page structure: editorial header (category, status shipped/in-progress,
  Newsreader title, role/stack line, repo/demo/npm links) then MDX body.
- Body voice (brand rule: lead with the reusable idea): the problem, the
  architecture, the transportable idea, honest limitations.
- Initial content drafted from `Downloads/main-quests/personal-brand/case-studies/*.md`
  (aegis.md, donna.md, agent-orchestrator.md), rewritten in Harshit's voice and
  em-dash-free. Content review by Harshit before merge.

## Writing pages

- `/writing` index and `/writing/[slug]` post: restyle to the new type system
  (Newsreader titles, mono metadata, refined scale). The MDX rendering pipeline
  and `prose-writing` styles are kept and lightly tuned.

## SEO / infrastructure to preserve (do not regress PR #14)

Keep and extend to `/work`:

- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`
- Person + BlogPosting JSON-LD (add case-study JSON-LD for `/work` pages)
- Per-page OG images (`opengraph-image.tsx`), including a generator for
  `/work/[slug]`
- Canonical URLs on every page
- Em-dash-free discipline in all copy and metadata
- `scripts/check-sitemap.mjs` still passes (extend it to cover `/work` URLs)

## Deletions

- `components/Ferrofluid.tsx` and the `ogl` dependency
- `components/CursorFollower.tsx`
- Buzzword rotation logic in `components/AboutSplit.tsx` (component rebuilt)
- Scroll-jacked `components/ContactFinale.tsx` (rebuilt as quiet contact)
- Letter-by-letter animation in `components/Hero.tsx` (rebuilt)
- `components/MenuOverlay.tsx` (replaced by simple nav)
- The stray `src/` directory (leftover from the old Vite / React-Router build)
- Giant type tokens (`display`, `section`, `finale`) from `tailwind.config.ts`

## Component inventory after redesign

Kept/rebuilt: `Navbar` (simplified), `Hero` (voice), `AboutSplit` -> `About`
(static), `WorkGrid` -> `SelectedWork` (editorial rows), `NotesPreview` ->
`WritingList`, `ContactFinale` -> `Contact`, `Footer`, `ScrollToTop`.
New: `content/work/*.mdx`, `app/work/[slug]/page.tsx`, generalized content loader.
Removed: `Ferrofluid`, `CursorFollower`, `MenuOverlay`.

## Content source of truth

Project facts, proof points, and voice come from
`Downloads/main-quests/personal-brand/` (read-only reference):

- `case-studies/agent-orchestrator.md`, `donna.md`, `aegis.md`,
  `graph-isomorphism.md`, `emagg.md`, `iitb-agent.md`
- `docs/self-model.md`, `docs/context.md`

Ranking for prominence: AO (7.6k star maintainer seat) > Donna (local-first
ambient macOS assistant, v0.3.0) > Aegis (risk-tiered execution safety rails) >
Graph Isomorphism (live demo). `emagg` and `iitb-agent` are list items only.

## Success criteria

- No WebGL, no scroll-jack, no letter animation, no rotating words anywhere.
- Homepage opens with a voice-led positioning statement and the AO credential
  above the fold.
- At least 3 editorial case-study pages exist and are linked from Selected Work.
- Writing index and posts render in the new editorial system.
- All prior SEO output (sitemap, robots, manifest, JSON-LD, OG images,
  canonicals) still present and extended to `/work`; `npm run check:seo` passes.
- No em dashes in any copy or metadata.
- `ogl` removed from `package.json`; stray `src/` removed.
- `npm run build` succeeds.
