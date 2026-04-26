# Blog System Design Spec

**Date:** 2026-04-26
**Status:** Draft
**Scope:** Add a `/blogs` section to theharshitsingh.com portfolio site

## Overview

Add a file-based blog system to the existing React + Vite + Tailwind portfolio site. Blog posts are authored as markdown files with frontmatter, committed to the repo, and rendered at build time. No CMS, no API, no admin UI — the filesystem is the CMS and git is the publishing workflow.

## Requirements

1. Support both Markdown and HTML content in blog posts
2. Backend-only authoring — create/manage posts via files in the repo
3. `/blogs` listing page and `/blogs/:slug` individual post pages
4. Design matches the existing site style (dark theme, purple accents, Syne/DM Mono/Instrument Serif fonts)

## Architecture Decision: Approach A (Vite glob + react-markdown)

**Chosen over:**
- MDX (`@mdx-js/rollup`) — overkill for a text blog, heavier setup
- Build-time JSON pre-processing — extra build step, runtime fetch, more moving parts

**Rationale:** Approach A uses `import.meta.glob` (already available in Vite) to discover markdown files at build time, `gray-matter` for frontmatter parsing, and `react-markdown` for rendering. Three new runtime dependencies. Zero build scripts. Follows the existing pattern of data-driven components (like `src/data/projects.ts`).

**Scale constraint:** All blog content is bundled into the JS output. This is fine for a personal blog with <100 posts. If the blog grows to hundreds of posts, migration to lazy-loaded JSON or an SSG framework would be warranted.

---

## 1. Routing & SPA Infrastructure

### Router Setup

Wrap the app in `react-router-dom`'s `BrowserRouter` in `main.tsx`. Route structure:

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Home` | Existing homepage (all current sections) |
| `/blogs` | `BlogList` | Blog listing page |
| `/blogs/:slug` | `BlogPost` | Individual blog post |

### Navbar Changes

- Add a "Blog" nav link that uses react-router `<Link to="/blogs">` for SPA navigation
- The Navbar detects the current route via `useLocation()`. On the homepage (`/`), section links remain as `#about`, `#projects`, etc. (anchor scroll). On any other page (`/blogs`, `/blogs/:slug`), the same links become `/#about`, `/#projects`, etc. — standard `<a href>` tags that trigger a full navigation back to the homepage with the anchor hash, which the browser scrolls to after the homepage loads.
- The "HS" logo links to `/` (homepage root) via react-router `<Link>`

### GitHub Pages SPA Fallback

GitHub Pages serves `404.html` for any unknown path. By copying `index.html` to `404.html` at build time, the SPA loads and react-router resolves the route client-side.

Implementation: update the `build` script in `package.json`:
```
"build": "tsc && vite build && cp dist/index.html dist/404.html"
```

---

## 2. Content Layer

### File Structure

```
content/
  blogs/
    my-first-post.md
    building-ai-agents.md
```

The filename (minus `.md`) becomes the URL slug: `my-first-post.md` -> `/blogs/my-first-post`.

### Frontmatter Schema

```yaml
---
title: "Building AI Agents at Scale"       # required, string
date: "2026-04-26"                          # required, ISO date string
description: "Short summary for cards"      # required, 1-2 sentences
tags: ["AI", "Open Source"]                 # required, string array
draft: false                                # optional, default false
---
```

- `draft: true` posts are visible in dev mode but excluded from production builds
- Posts are sorted by `date` descending (newest first)

### Blog Module (`src/lib/blog.ts`)

```typescript
// Pseudocode — exact implementation will use these primitives
import.meta.glob('/content/blogs/*.md', { eager: true, query: '?raw' })
// Returns Record<string, string> of file paths to raw markdown content

// Parse each file with gray-matter -> { data: frontmatter, content: markdown body }
// Extract slug from filename
// Export:
//   getAllPosts(): BlogPost[]  — sorted by date desc, drafts filtered in production
//   getPostBySlug(slug: string): BlogPost | undefined
```

**BlogPost type:**
```typescript
interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  content: string    // raw markdown body
  draft: boolean
}
```

### Vite Config Change

Add `content/` to the allowed filesystem paths so Vite can import files outside `src/`:
```typescript
server: {
  fs: {
    allow: ['content', '.']
  }
}
```

---

## 3. Blog Listing Page (`/blogs`)

### Layout

Full-width dark page. Same Navbar at top. Content centered, max-width ~900px.

### Header

Uses the established section header pattern:
```
05 · Blog                    ─────────────────
```
- Numbered label: `text-2xs tracking-[3px] text-purple-light`
- Heading: `font-syne text-[clamp(40px,5vw,72px)] font-extrabold tracking-[-2px]`
- Gradient line divider

### Post Cards

Single-column vertical stack. Each card contains:
- **Date**: `text-2xs tracking-[3px] text-purple-light opacity-70`
- **Title**: `font-syne text-[clamp(22px,2.5vw,32px)] font-bold tracking-tight`
- **Description**: `font-serif italic text-base text-muted`
- **Tags**: Pill badges matching project card style (`text-2xs tracking-[1.5px] uppercase px-3 py-[5px] border border-purple/30 rounded-[1px] text-purple-light bg-purple/[0.06]`)
- **"Read" link**: Arrow link matching project card pattern

Card styling: `border border-purple/20 bg-cream/[0.01] p-8 lg:p-12` with hover glow effect (radial gradient on hover). Cards use the `reveal` animation class for scroll-triggered fade-in.

The entire card is wrapped in a react-router `<Link>` to `/blogs/:slug`.

### Empty State

If no published posts exist: centered message "No posts yet." in `text-muted font-serif italic`.

### No Pagination

Not needed for a personal blog. Can be added later if the post count warrants it.

---

## 4. Blog Post Page (`/blogs/:slug`)

### Layout

Narrow reading column: max-width ~720px, centered. Same Navbar at top.

### Post Header

```
← Back to Blog

2026-04-26  ·  AI  ·  Open Source

Building AI Agents at Scale
How I approached the architecture for autonomous coding agents

─────────────────────────────────────
```

- **Back link**: `text-xs tracking-tag uppercase text-purple-light` with left arrow, links to `/blogs`
- **Date + tags**: inline, small muted text
- **Title**: `font-syne text-[clamp(32px,5vw,56px)] font-extrabold tracking-[-2px]`
- **Description**: `font-serif italic text-xl text-muted`
- **Divider**: gradient line below header

### Markdown Rendering

Using `react-markdown` with `rehype-raw` (for inline HTML support). Styling applied via a wrapper class with Tailwind:

| Element | Style |
|---------|-------|
| `h1`-`h6` | `font-syne`, sized appropriately, `text-cream` |
| `p` | `font-mono (DM Mono)`, `text-sm`, `text-cream/70`, `leading-[1.8]` |
| `a` | `text-purple-light`, hover `text-accent`, underline |
| `code` (inline) | `bg-purple/10 border border-purple/20 rounded px-1.5 py-0.5 text-purple-light font-mono text-xs` |
| `pre > code` | `bg-bg2 border border-purple/20 rounded p-4 overflow-x-auto block` |
| `blockquote` | `border-l-2 border-purple pl-6 font-serif italic text-muted` |
| `img` | `rounded border border-purple/20 max-w-full` |
| `ul/ol` | `text-cream/70`, purple bullet markers, left padding |
| `hr` | Gradient divider matching site pattern |
| `strong` | `text-cream font-bold` |
| `em` | `font-serif italic` |

### 404 Handling

If `getPostBySlug(slug)` returns `undefined`, display:
- "Post not found" heading
- Link back to `/blogs`

---

## 5. Dependencies & Build Changes

### New Dependencies

| Package | Type | Purpose |
|---------|------|---------|
| `react-router-dom` | runtime | Client-side routing |
| `react-markdown` | runtime | Markdown to React rendering |
| `gray-matter` | runtime | Frontmatter parsing |
| `rehype-raw` | runtime | Allow HTML inside markdown |

### Build Changes

- **`vite.config.ts`**: Add `server.fs.allow` for `content/` directory; add `assetsInclude` if needed for .md files
- **`package.json`**: Update build script to `tsc && vite build && cp dist/index.html dist/404.html`
- **`tailwind.config.js`**: No changes needed (markdown content is styled via React components, not Tailwind class scanning)

### GitHub Actions

No changes needed. The existing `npm ci && npm run build` pipeline handles everything — the 404.html copy is part of the build script.

---

## 6. Authoring Workflow

To create a new blog post:

1. Create `content/blogs/<slug>.md`
2. Add frontmatter: title, date, description, tags
3. Write content in markdown (HTML blocks allowed)
4. Optional: set `draft: true` while writing, set to `false` when ready
5. Commit and push to `main`
6. GitHub Actions builds and deploys automatically

No CLI tool, no API, no admin UI needed.

---

## 7. File Change Summary

### New Files

| File | Purpose |
|------|---------|
| `content/blogs/hello-world.md` | Example blog post |
| `src/lib/blog.ts` | Blog data layer (glob, parse, sort, filter) |
| `src/pages/Home.tsx` | Wrapper for existing homepage content (extracted from App.tsx) |
| `src/pages/BlogList.tsx` | Blog listing page component |
| `src/pages/BlogPost.tsx` | Individual post page component |

### Modified Files

| File | Change |
|------|--------|
| `src/main.tsx` | Wrap app with `BrowserRouter` |
| `src/App.tsx` | Add `Routes` and `Route` definitions, move homepage content to `Home.tsx` |
| `src/components/Navbar.tsx` | Add "Blog" link, make links routing-aware (react-router `Link` vs anchor) |
| `vite.config.ts` | Add `server.fs.allow` for content directory |
| `package.json` | Add dependencies, update build script for 404.html copy |
| `src/index.css` | Add markdown prose styling classes |

---

## 8. Out of Scope

- Syntax highlighting for code blocks (can be added later with `rehype-highlight` or `shiki`)
- RSS feed generation
- Search/filtering on the listing page
- Pagination
- Reading time estimate
- Table of contents
- Social sharing buttons
- Comments system
- SEO meta tags per post (can be added later with `react-helmet-async`)
