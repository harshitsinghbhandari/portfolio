# Portfolio Redesign — Jopecuro Visual Language

**Date:** 2026-06-08
**Owner:** Harshit Singh
**Scope:** Homepage only. `/writing`, `/projects`, `/donna` routes keep their list/detail layouts but inherit the new design tokens (fonts, colors, spacing).

## Goal

Rebuild the homepage of `theharshitsingh.com` in the visual language of [jopecuro.com](https://jopecuro.com) — oversized typography, high-contrast display serif wordmark, dark BG with a single red accent, scattered polaroid-style media in the hero, split portrait/copy About, asymmetric Work grid, awards-table-style Recognitions, editorial Writing teaser, and a "GET IN TOUCH" finale where the type bleeds off the viewport.

## Non-goals

- Not redesigning `/writing`, `/projects`, or `/donna` page layouts. They get new fonts/colors only.
- Not adding new content systems. Recognitions data is hand-authored in a TS file; writing already has a loader.
- Not building a full menu overlay system beyond the homepage's needs (overlay is global Navbar but routes don't depend on it for content).
- Not preserving the existing purple accent (`#a78bfa`) anywhere.

## Constraints

- Stack stays: Next.js 14 + Tailwind + Framer Motion. No new heavy deps.
- Performance: hero collage uses `next/image` with `priority` for above-the-fold images, lazy for the rest.
- Accessibility: skip-to-content link preserved; menu overlay is a real `<dialog>`/focus-trapped overlay; oversized type still passes contrast on `#08080a` BG.
- Mobile: all sections degrade to single column. Hero collage reduces from 8 polaroids to 3 on mobile. "GET IN TOUCH" bleed effect is preserved on mobile via horizontal overflow.
- Composio brand association is dead. Agent Orchestrator is referenced under `github.com/AgentWrapper/agent-orchestrator` with no Composio framing anywhere in metadata, copy, or repo links.

## Design system

### Typography

| Role | Family | Notes |
|---|---|---|
| Wordmark, section headlines | **Instrument Serif** (Google Fonts) | `font-display`, weights 400. Tight tracking `-0.04em`. Used at `clamp(72px, 11vw, 180px)` for hero, `clamp(80px, 14vw, 220px)` for section headlines, `clamp(140px, 22vw, 360px)` for "GET IN TOUCH". |
| Body, navigation, paragraphs | **Geist Sans** (current) | Stays. Lean on `font-thin` and `font-light` at oversized scales for secondary headlines. |
| Mono labels, contact metadata, dates | **Geist Mono** (current) | Used for `OPEN SOURCE & RECOGNITIONS`-style eyebrows, table year columns, dates above writing posts. |

Load Instrument Serif via `next/font/google` in `app/layout.tsx`, export as `--font-serif` CSS variable, register in `tailwind.config.ts` under `fontFamily.serif`.

### Color tokens

Edit `tailwind.config.ts`:

```ts
colors: {
  bg: '#08080a',          // unchanged
  surface: '#0e0e11',     // unchanged
  border: '#1e1e23',      // unchanged
  text: '#ededef',        // unchanged
  muted: '#8a8a93',       // unchanged
  subtle: '#5b5b63',      // unchanged
  accent: '#e63946',      // CHANGED: was #a78bfa (purple). Now Jopecuro-red.
}
```

Accent uses: floating "•" before headline words, scroll-to-top circle, menu close icon, occasional underline on contact lines. Used sparingly — never as a primary CTA fill (Jopecuro doesn't have primary buttons).

### Spacing

Section padding: `py-32 md:py-48` between major sections. Container max width unchanged (`max-w-page = 1100px`) for body content, but **section headlines and "GET IN TOUCH" deliberately escape the container** via `w-screen` + negative margins.

### Global UI elements

- **Persistent scroll-to-top button**: small (40px) red circle bottom-right, fixed, appears after `scrollY > viewport`. Up-arrow icon. Click → smooth scroll to top.
- **Footer line**: `Created by Harshit Singh. © 2026.` bottom-left of every page, tiny mono.
- **Navbar**: minimal — small "h," monogram top-left (links to `/`), hamburger top-right. Hamburger opens a full-viewport overlay (see Menu overlay below).

### Menu overlay

- Full viewport, `bg-bg`, opens via hamburger.
- Links stacked vertically, **Instrument Serif**, `clamp(56px, 8vw, 120px)`, hugging the left edge with generous padding.
- Links: `About`, `Work`, `Recognitions`, `Writing`, `Contact`. Each scrolls to the section anchor on `/` (or navigates to the route if on a subpage).
- Behind the links, faint scattered polaroids from the hero (3-4 of them) at low opacity.
- Close icon (X) top-right in red accent.
- Focus-trapped. Esc closes. Body scroll locked when open.

## Section spec

### 1. Hero

- Full viewport height, `bg-bg`.
- **Wordmark** "Harshit Singh," centered (with trailing comma).
  - Instrument Serif, `clamp(72px, 11vw, 180px)`, tracking `-0.04em`.
- **Tiny eyebrow** above wordmark, Geist Mono, all lowercase: `iit bombay · 2nd year · open to internships`.
- **8 scattered polaroid cards** behind/around the wordmark:
  - Mixed aspect ratios (4:5, 16:9, 1:1).
  - Random rotation between `-6deg` and `+6deg`.
  - Subtle drop-shadow + thin white border (`border-white/10`).
  - Z-index: wordmark on top.
  - Stagger-fade-in on mount via Framer Motion (`delay: index * 0.08`).
  - Gentle parallax on mouse-move using `useMotionValue` + `useTransform` — translation up to 12px in each direction. Disabled on touch devices and when `prefers-reduced-motion`.
- **Scroll cue** below wordmark (small, muted, `↓ scroll`), fades out after first scroll event.

**Required assets** (8 files in `/public/hero/`, also a portrait for About):
1. `donna.png` — Donna UI or log
2. `aegis.png` — Aegis UI or code
3. `ao-readme.png` — `github.com/AgentWrapper/agent-orchestrator` README top with stars
4. `gh-graph.png` — GitHub contribution graph
5. `terminal.png` — parallel agent execution terminal
6. `editor.png` — Rust/Python infra code in editor
7. `arch.png` — Excalidraw architecture diagram
8. `iitb.png` — IIT Bombay campus or doc
9. `portrait.png` — separate, for About section (not in hero collage)

### 2. About (split)

- Full viewport, two-column at `md+`, stacked on mobile.
- **Left half:** `portrait.png` full-bleed. Optional warm gradient overlay (`bg-gradient-to-r from-transparent to-bg`) on the right edge to blend into the panel.
- **Right half:** dark panel, `flex flex-col justify-center`, containing a **3-pane carousel**:

  **Pane 1 — Identity**
  - Eyebrow (mono): `I'M HARSHIT SINGH`
  - Headline (serif, `clamp(40px, 5vw, 72px)`): "Systems engineer, agent infrastructure, local-first AI."
  - Body (sans, muted, max 3 lines): "I build the low-level execution environments and safety rails that make autonomous agents reliable. My thesis is ambient intelligence — voice, screen, memory — without giving any of it to the cloud."

  **Pane 2 — Thesis**
  - Eyebrow: `BUILDING WHAT MATTERS`
  - Headline: "Reliable infrastructure for autonomous agents."
  - Body: 2–3 line paragraph on local-first AI and safety rails.

  **Pane 3 — Academic & Stack**
  - Eyebrow: `IIT BOMBAY · IEOR · CLASS OF 2028`
  - Headline: "Rust · Python · TypeScript · macOS · Linux."
  - Body: short list/sentence on building blocks.

- Pagination: 3 dots stacked vertically on the far right edge of the panel. Click to switch panes. Crossfade transition (200ms). No auto-cycle.

### 3. Work

- Anchor `#work`.
- Section headline: "WORK", Instrument Serif, `clamp(80px, 14vw, 220px)`, hugging the left edge via `-ml-[2vw]`.
- **Asymmetric 2-row grid of 3 tiles** (CSS grid, `grid-cols-3` on `md+`, 2 rows):
  - **Row 1, Tile 1** (col-span-2): Agent Orchestrator. Image: `ao-readme.png` or terminal screenshot. Caption: `01 — AGENT INFRASTRUCTURE` (mono) / "Agent Orchestrator" (serif) / "#1 contributor — 5,300★. github.com/AgentWrapper/agent-orchestrator" (sans muted) / `→ view repo`.
  - **Row 1, Tile 2** (col-span-1): Donna. Image: `donna.png`. Caption: `02 — LOCAL-FIRST AI` / "Donna" / "Ambient intelligence that speaks, watches, remembers — without the cloud." / `→ donna`.
  - **Row 2, Tile 3** (col-span-3, banner): Aegis. Image: code/architecture wide crop. Caption: `03 — SAFETY RAILS` / "Aegis" / "Native OS capabilities for autonomous agents, safely." / `→ aegis`.
  - Row heights: row 1 = `clamp(360px, 40vw, 520px)`, row 2 = `clamp(220px, 24vw, 320px)` so the banner is shorter and the layout reads as "two big featured tiles, then a wide banner."
- Tile interaction: subtle scale + brightness on hover. No fancy 3D.
- Footer: `→ see all builds` linking to `/projects`.

### 4. Recognitions

- Anchor `#recognitions`.
- Eyebrow (mono): `OPEN SOURCE & RECOGNITIONS`.
- Headline: "RECOGNITIONS", Instrument Serif, oversized.
- **Table** in a `<dl>` or `<table>` with 3 columns:
  - Year (mono, muted)
  - Category (mono, muted)
  - Detail (sans, text)
- Hairline `border-border` between rows. Hover: row brightens, right arrow appears on hover via `group-hover`.
- **Data source:** new file `lib/recognitions.ts` exporting `Recognition[]`. Hand-authored — user provides rows before implementation. Schema:
  ```ts
  type Recognition = {
    year: string          // "2026"
    category: string      // "OSS" | "AWARD" | "TALK" | "HACKATHON"
    detail: string        // "#1 contributor — Agent Orchestrator (5,300★)"
    href?: string         // optional link
  }
  ```
- Footer: `→ steal my résumé` linking to `/resume.pdf` (asset to be added).

### 5. Writing

- Anchor `#writing`.
- Eyebrow (mono): `WRITING`.
- Headline: "NOTES", Instrument Serif, oversized.
- **3 latest posts** from existing `lib/writing.ts` loader:
  - Two-column row per post: date (mono, left, narrow column) + content (right).
  - Title in Instrument Serif, `clamp(28px, 3.5vw, 56px)`.
  - One-line excerpt in Geist Sans, muted.
  - Hairline divider between posts.
- Footer: `→ all writing` linking to `/writing`.

### 6. Contact ("GET IN TOUCH")

- Full viewport, `bg-bg`.
- **"GET IN TOUCH"** wordmark split onto 2 lines:
  - Line 1: `GET IN` — left-aligned, bleeding off the left edge (`-ml-[5vw]`).
  - Line 2: `TOUCH` — right-aligned, bleeding off the right edge (`-mr-[5vw]`).
  - Instrument Serif, `clamp(140px, 22vw, 360px)`, weight 400, line-height ~0.9.
- **Below**, with generous negative space (`mt-32`):
  - `→ harshitsingh@iitb.ac.in` (underlined on hover, mailto link).
  - Social row in Geist Mono, small: `→ github` `→ linkedin` `→ x/twitter` (whichever URLs the user provides).
- **No phone number unless user explicitly opts in.**
- Footer of section: small `Created by Harshit Singh. © 2026.` bottom-left, scroll-to-top circle bottom-right.

## File-level change plan

### New files

- `lib/recognitions.ts` — data source for Recognitions table.
- `components/MenuOverlay.tsx` — full-viewport menu overlay with focus trap.
- `components/ScrollToTop.tsx` — fixed bottom-right red circle button.
- `components/HeroCollage.tsx` — scattered polaroid grid with parallax.
- `components/AboutSplit.tsx` — replaces `AboutStrip.tsx`. Portrait + 3-pane carousel.
- `components/WorkGrid.tsx` — replaces `FlagshipGrid.tsx`. Asymmetric grid.
- `components/Recognitions.tsx` — table-style awards/OSS section.
- `components/NotesPreview.tsx` — replaces `WritingPreview.tsx`. Editorial style.
- `components/ContactFinale.tsx` — replaces `ContactCTA.tsx`. Bleeding "GET IN TOUCH" type.
- `public/hero/donna.png`, `aegis.png`, `ao-readme.png`, `gh-graph.png`, `terminal.png`, `editor.png`, `arch.png`, `iitb.png`, `portrait.png` — user-provided assets.

### Edited files

- `app/layout.tsx` — add Instrument Serif font, strip Composio mentions from metadata, replace with neutral framing ("building systems, agents, and local-first AI. IIT Bombay.").
- `app/page.tsx` — replace section list to: `Hero`, `AboutSplit`, `WorkGrid`, `Recognitions`, `NotesPreview`, `ContactFinale`. Drop `ContributionsGraph`.
- `app/globals.css` — add red-accent dot utility class, polaroid card shadow utility, oversized-type utilities.
- `tailwind.config.ts` — register `fontFamily.serif`, change `accent` token from purple to red `#e63946`, add display font-size utilities.
- `components/Navbar.tsx` — restyle to monogram + hamburger. Add overlay open/close state.
- `components/Hero.tsx` — full rewrite. Replace with new wordmark + collage version (could keep filename or rename; recommend keeping for simpler diff).
- `components/Footer.tsx` — minimize to "Created by Harshit Singh. © 2026." + tiny safecreative-style ID if user wants.
- `lib/projects.ts:38-42` — rewrite the `composio` flagship entry: slug `agent-orchestrator`, href `https://github.com/AgentWrapper/agent-orchestrator`, name "Agent Orchestrator", tagline "#1 human contributor to a 5,300★ agent infrastructure platform."
- `components/donna/DonnaHero.tsx:89` — strip the "composio" mention.

### Deleted files

- `components/AboutStrip.tsx`, `components/FlagshipGrid.tsx`, `components/WritingPreview.tsx`, `components/ContributionsGraph.tsx`, `components/ContactCTA.tsx` — replaced by new components. Delete after the new ones are wired in.

## Animation & motion

- Hero collage: stagger-fade-in on mount, mouse-parallax (≤12px translate), respects `prefers-reduced-motion`.
- About carousel: crossfade between panes (200ms).
- Section reveals on scroll: simple `whileInView` fade-up (`y: 24 → 0`, opacity `0 → 1`, 500ms ease-out). No exotic scroll-linked timelines — keep it tight.
- Menu overlay: fade-in BG (200ms), stagger-translate links from `y: 16 → 0` (60ms stagger).

## Accessibility

- Wordmark and section headlines: real `<h1>`/`<h2>` tags, oversized via CSS, not images.
- Menu overlay: `role="dialog"`, `aria-modal="true"`, focus trap, Esc to close, returns focus to hamburger on close.
- Scroll-to-top button: `aria-label="Scroll to top"`.
- Carousel pagination dots: `<button>`s with `aria-label="Pane 1 of 3"` etc.
- All images: `alt` text describing the content (e.g., "Donna app log showing transcript capture").
- Color contrast: all text on `#08080a` BG meets WCAG AA. Muted (`#8a8a93`) used only for de-emphasized secondary text, not interactive elements.
- `prefers-reduced-motion`: disables hero parallax, mount animations become instant fade-in (no translate).

## Mobile behavior

- Hero collage: reduce to 3 polaroids on `<md` screens. Wordmark scales down. Eyebrow stacks.
- About: stack — portrait full-width on top, carousel below. Pagination dots become a row.
- Work grid: 1 column, tiles stack in order Tile 1 → 2 → 3.
- Recognitions: table collapses to stacked rows (year/category as one line, detail below).
- Notes: stays as a vertical list — already mobile-friendly.
- Contact: "GET IN TOUCH" still bleeds (horizontal overflow allowed) and is horizontally scrollable on touch.
- Menu overlay: links list scrolls if it overflows.

## Out of scope (for this spec)

- Resume PDF generation. Recognitions section links to `/resume.pdf` which user must drop into `/public/`.
- New blog posts or content updates.
- `/projects` page redesign — only the FlagshipGrid → WorkGrid swap on homepage and the data update in `lib/projects.ts`.
- `/donna` page redesign — only the Composio mention scrub.
- Analytics, SEO additions beyond fixing the existing metadata.

## Open data dependencies (user provides before implementation)

- 9 hero/portrait images (paths listed in §1).
- Recognitions table rows.
- Social URLs (github, linkedin, x/twitter) for Contact section.
- (Optional) phone number for Contact section — default is to omit.
- (Optional) `/resume.pdf`.
- Confirmation that Aegis is publicly mentionable, and a one-line tagline + repo URL for it.
- Confirmation of Donna's one-line tagline + repo/landing URL.

## Success criteria

- `npm run build` passes with no type/lint errors.
- Homepage renders at 60fps on a 2020 MacBook Air (hero parallax doesn't drop frames).
- No "Composio" or "ComposioHQ" string remains anywhere in `app/`, `components/`, or `lib/` (verified by `grep -ri composio`).
- Lighthouse mobile score ≥ 90 for Performance and Accessibility on the homepage.
- Side-by-side with jopecuro.com, a viewer immediately recognizes the shared design language (oversized serif wordmark, dark BG with red accent, scattered hero, split About, bleeding contact type).
