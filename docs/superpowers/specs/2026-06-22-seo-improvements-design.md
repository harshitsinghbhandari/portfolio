# SEO Improvements Design

**Date:** 2026-06-22
**Site:** https://theharshitsingh.com (Next.js 14 app router, deployed on Vercel)
**Status:** Approved, ready for implementation plan

## Goal

Make the portfolio fully crawlable, eligible for rich results, and well-presented
when shared on social platforms. Use only native Next 14 app-router file
conventions. No new dependencies.

## Current state (audit findings)

- No `sitemap.xml` and no `robots.txt`.
- `twitter.card` is `summary_large_image` but no `openGraph.images` exists, so
  shares render as bare text links. `public/hsb.jpg` exists but is unused.
- No JSON-LD structured data anywhere (no Person, no Article).
- The homepage's only `<h1>` (`components/Hero.tsx`) animates the name as
  per-character `aria-hidden` spans with `aria-label="Harshit Singh,"`. Its
  indexable text is just the name plus a comma, carrying zero keywords.
- No `alternates.canonical` on any route. Duplicate-content risk from the
  GitHub Pages origin and the `*.theharshitsingh.com` subdomain redirects.
- Post metadata omits `authors` and `modifiedTime`.
- Em dashes appear in `layout.tsx` metadata strings (and MDX content), which
  violates the project's no-em-dash rule.
- Only `favicon.svg`; no apple-touch-icon or web manifest.

Working already (do not change): `metadataBase`, title `template`, per-page
titles/descriptions, server-rendered MDX, `lang="en"`, skip-to-content link,
image `alt` on the WorkGrid tile, `rel="noopener noreferrer"` on external links.

## Design

### 1. Crawl infrastructure

- **`app/robots.ts`**: allow all user agents, reference
  `https://theharshitsingh.com/sitemap.xml`.
- **`app/sitemap.ts`**: emit `/`, `/writing`, and one entry per post from
  `getAllPosts()`. Each post entry's `lastModified` derives from its `date`.
  Drafts are already excluded by the loader in production.

### 2. Social cards (auto-generated)

- **`app/opengraph-image.tsx`**: 1200x630 branded card via Next `ImageResponse`,
  showing the name and the "systems, agents, local-first AI" tagline.
- **`app/writing/[slug]/opengraph-image.tsx`**: per-post card rendering the post
  title and date.
- Next auto-wires these into both `og:image` and `twitter:image`. No static
  asset to maintain. This resolves the broken `summary_large_image` card.

### 3. Structured data (JSON-LD)

- **Person** schema on the homepage: name, url, jobTitle, affiliation
  (IIT Bombay), email, image (`hsb.jpg`), and `sameAs` =
  `[https://github.com/harshitsinghbhandari,
  https://www.linkedin.com/in/harshitsinghbhandari/,
  https://x.com/HSBhandari955]` (sourced from `components/ContactFinale.tsx`).
- **BlogPosting** schema on each post page: headline, description,
  datePublished, author (Harshit Singh), url, image (the generated OG image).
- Emitted as `<script type="application/ld+json">` rendered server-side.

### 4. Canonicals

Add `alternates.canonical` per route: `/`, `/writing`, `/writing/<slug>`.
`metadataBase` is already set, so relative canonicals resolve correctly.

### 5. On-page fixes

- **Hero H1** (`components/Hero.tsx`): keep the Ferrofluid letter animation.
  Add an `sr-only` keyword line inside or adjacent to the `<h1>` and enrich the
  `aria-label` so crawlers and screen readers receive "Harshit Singh, systems,
  agents, and local-first AI, IIT Bombay" instead of "Harshit Singh,".
- **Post metadata** (`app/writing/[slug]/page.tsx`): add `authors` and
  `modifiedTime` to `generateMetadata`.
- **Em dashes**: replace the `—` characters in `app/layout.tsx`
  (default title, template, OG title/description, Twitter title/description)
  with colons or commas. Produce a flagged list of em dashes remaining in MDX
  content for the user to address separately (not rewritten in this work).

### 6. Minor (included, low cost)

- **`app/manifest.ts`** plus an apple-touch-icon reference so mobile bookmarks
  and PWA install surfaces have proper icons.

## Out of scope

- Visible hero redesign (hidden-keyword approach chosen instead).
- Rewriting em dashes inside MDX post bodies (only flagged, not changed).
- Analytics and Google Search Console setup (note the manual step for the user:
  submit `https://theharshitsingh.com/sitemap.xml` in Search Console after deploy).

## Verification

- `next build` passes.
- `/robots.txt`, `/sitemap.xml`, and `/opengraph-image` render correctly.
- JSON-LD output matches the schema.org shape for Person and BlogPosting.
- One automated check left behind: an assertion that `sitemap.ts` output
  contains every slug returned by `getAllPosts()`.
