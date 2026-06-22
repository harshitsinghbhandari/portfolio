# SEO Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make theharshitsingh.com fully crawlable, rich-result eligible, and good-looking when shared, using only native Next 14 app-router file conventions.

**Architecture:** Add file-based metadata routes (`robots.ts`, `sitemap.ts`, generated `opengraph-image`/`apple-icon`, `manifest.ts`), inject JSON-LD `<script>` tags server-side on the homepage and post pages, add per-route canonicals, and enrich the hero H1 for crawlers. No new dependencies; all generation runs at build time.

**Tech Stack:** Next.js 14 (app router), TypeScript, `next/og` `ImageResponse` (ships with Next), `gray-matter` (already installed), Node `fetch` (built in).

## Global Constraints

- **No new dependencies.** Use only what `package.json` already declares.
- **No em dashes (`—`) or en dashes (`–`)** in any string, comment, or copy. Use colon, comma, or parentheses. (Project-wide rule.)
- **Canonical site origin:** `https://theharshitsingh.com` (already set as `metadataBase` in `app/layout.tsx`).
- **Social links** (verbatim, from `components/ContactFinale.tsx`): `https://github.com/harshitsinghbhandari`, `https://www.linkedin.com/in/harshitsinghbhandari/`, `https://x.com/HSBhandari955`.
- **Contact email:** `harshitsingh@iitb.ac.in` (the site's public contact, used in JSON-LD).
- **No test framework exists; do not add one.** Verify with `npm run build` and the `check:seo` script.
- **Brand colors** (from `components/Hero.tsx`): accent `#e63946`, text `#ededef`, muted `#8a8a93`, background `#0a0a0b`.

---

### Task 1: Crawl infrastructure (robots, sitemap, check script)

**Files:**
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`
- Create: `scripts/check-sitemap.mjs`
- Modify: `package.json` (add `check:seo` script)

**Interfaces:**
- Consumes: `getAllPosts()` from `lib/writing.ts` (returns `PostMeta[]` with `slug: string` and `date: string`; already filters drafts in production).
- Produces: routes `/robots.txt` and `/sitemap.xml`; npm script `check:seo`.

- [ ] **Step 1: Create `app/robots.ts`**

```ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://theharshitsingh.com/sitemap.xml',
    host: 'https://theharshitsingh.com',
  }
}
```

- [ ] **Step 2: Create `app/sitemap.ts`**

```ts
import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/writing'

const BASE = 'https://theharshitsingh.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${BASE}/writing/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/writing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...posts,
  ]
}
```

- [ ] **Step 3: Create `scripts/check-sitemap.mjs`**

This is the one runnable check. It reads published slugs from the filesystem and asserts each appears in the served sitemap. Path-based comparison so it works against any `SITE_URL`.

```js
// Verifies every published post appears in the served sitemap.
// Usage: SITE_URL=http://localhost:3000 node scripts/check-sitemap.mjs
//        (defaults to production)
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const SITE_URL = process.env.SITE_URL ?? 'https://theharshitsingh.com'
const WRITING_DIR = path.join(process.cwd(), 'content', 'writing')

const slugs = fs
  .readdirSync(WRITING_DIR)
  .filter((f) => f.endsWith('.mdx'))
  .filter((f) => matter(fs.readFileSync(path.join(WRITING_DIR, f), 'utf8')).data.draft !== true)
  .map((f) => f.replace(/\.mdx$/, ''))

const res = await fetch(`${SITE_URL}/sitemap.xml`)
if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`)
const xml = await res.text()

const missing = slugs.filter((slug) => !xml.includes(`/writing/${slug}`))
if (missing.length) {
  console.error('Missing from sitemap:\n' + missing.map((s) => `  ${s}`).join('\n'))
  process.exit(1)
}
console.log(`OK: all ${slugs.length} published posts are in the sitemap.`)
```

- [ ] **Step 4: Add the `check:seo` script to `package.json`**

In the `"scripts"` block, add the line:

```json
    "check:seo": "node scripts/check-sitemap.mjs",
```

- [ ] **Step 5: Build to verify the routes compile**

Run: `npm run build`
Expected: build succeeds; the route summary lists `/robots.txt` and `/sitemap.xml`.

- [ ] **Step 6: Run the sitemap check against a local server**

Run in one terminal: `npm run start` (after the Step 5 build)
Run in another: `SITE_URL=http://localhost:3000 npm run check:seo`
Expected: `OK: all 6 published posts are in the sitemap.` Stop the server afterward.

- [ ] **Step 7: Commit**

```bash
git add app/robots.ts app/sitemap.ts scripts/check-sitemap.mjs package.json
git commit -m "feat(seo): add robots.txt, sitemap, and sitemap check script"
```

---

### Task 2: Generated social cards and icons (OG images, apple-icon, manifest)

**Files:**
- Create: `app/opengraph-image.tsx`
- Create: `app/writing/[slug]/opengraph-image.tsx`
- Create: `app/apple-icon.tsx`
- Create: `app/manifest.ts`

**Interfaces:**
- Consumes: `getPostBySlug(slug)`, `getAllSlugs()`, `formatPostDate(date)` from `lib/writing.ts`.
- Produces: routes `/opengraph-image`, `/writing/<slug>/opengraph-image`, `/apple-icon`, `/manifest.webmanifest`. Next auto-injects the opengraph-image into both `og:image` and `twitter:image` for its segment.

> Note: the per-post image reads from the filesystem (`getPostBySlug`), so it must run on the Node runtime, not edge. Each Satori `div` with more than one child needs `display: 'flex'`.

- [ ] **Step 1: Create `app/opengraph-image.tsx` (homepage card)**

```tsx
import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt = 'Harshit Singh: Systems, Agents, Local-first AI'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#0a0a0b',
          color: '#ededef',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 28, color: '#8a8a93' }}>
          <div style={{ width: 14, height: 14, borderRadius: 9999, background: '#e63946' }} />
          theharshitsingh.com
        </div>
        <div style={{ display: 'flex', fontSize: 96, fontWeight: 700, marginTop: 24, letterSpacing: '-0.03em' }}>
          Harshit Singh
        </div>
        <div style={{ display: 'flex', fontSize: 40, marginTop: 16, color: '#8a8a93' }}>
          Systems, agents, and local-first AI
        </div>
        <div style={{ display: 'flex', fontSize: 28, marginTop: 40, color: '#8a8a93' }}>IIT Bombay</div>
      </div>
    ),
    { ...size },
  )
}
```

- [ ] **Step 2: Create `app/writing/[slug]/opengraph-image.tsx` (per-post card)**

```tsx
import { ImageResponse } from 'next/og'
import { formatPostDate, getAllSlugs, getPostBySlug } from '@/lib/writing'

export const runtime = 'nodejs'
export const alt = 'Writing by Harshit Singh'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export default function OgImage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  const title = post?.title ?? 'Writing'
  const date = post ? formatPostDate(post.date) : ''
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: '#0a0a0b',
          color: '#ededef',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 26, color: '#8a8a93' }}>
          <div style={{ width: 14, height: 14, borderRadius: 9999, background: '#e63946' }} />
          Harshit Singh · Writing
        </div>
        <div style={{ display: 'flex', fontSize: 64, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          {title}
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: '#8a8a93' }}>{date}</div>
      </div>
    ),
    { ...size },
  )
}
```

- [ ] **Step 3: Create `app/apple-icon.tsx` (generated touch icon)**

```tsx
import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0b',
          color: '#e63946',
          fontSize: 120,
          fontWeight: 700,
          fontFamily: 'sans-serif',
        }}
      >
        H
      </div>
    ),
    { ...size },
  )
}
```

- [ ] **Step 4: Create `app/manifest.ts`**

```ts
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Harshit Singh',
    short_name: 'Harshit',
    description: 'Harshit Singh: systems, agents, and local-first AI. IIT Bombay.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0b',
    theme_color: '#0a0a0b',
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  }
}
```

- [ ] **Step 5: Build to verify image routes generate**

Run: `npm run build`
Expected: build succeeds; route summary lists `/opengraph-image`, `/writing/[slug]/opengraph-image`, `/apple-icon`, `/manifest.webmanifest`. No "Failed to parse" or Satori errors.

- [ ] **Step 6: Spot-check one rendered image**

Run: `npm run start` then open `http://localhost:3000/opengraph-image` and `http://localhost:3000/writing/donna-briefing-cli/opengraph-image` in a browser.
Expected: a 1200x630 dark card with the name/title rendered. Stop the server afterward.

- [ ] **Step 7: Commit**

```bash
git add app/opengraph-image.tsx "app/writing/[slug]/opengraph-image.tsx" app/apple-icon.tsx app/manifest.ts
git commit -m "feat(seo): add generated OG images, apple-icon, and web manifest"
```

---

### Task 3: Structured data and canonicals

**Files:**
- Modify: `app/page.tsx` (add metadata export + Person JSON-LD)
- Modify: `app/writing/page.tsx:5-9` (add canonical)
- Modify: `app/writing/[slug]/page.tsx:16-35` (enrich metadata) and `:37-99` (add BlogPosting JSON-LD)

**Interfaces:**
- Consumes: `getPostBySlug(slug)` returning `Post` with `title, description, date, tags, slug`.
- Produces: `<script type="application/ld+json">` Person on `/`, BlogPosting on each post; `alternates.canonical` on all three routes.

- [ ] **Step 1: Rewrite `app/page.tsx` with metadata and Person JSON-LD**

```tsx
import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import AboutSplit from '@/components/AboutSplit'
import WorkGrid from '@/components/WorkGrid'
import NotesPreview from '@/components/NotesPreview'
import ContactFinale from '@/components/ContactFinale'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Harshit Singh',
  url: 'https://theharshitsingh.com',
  image: 'https://theharshitsingh.com/hsb.jpg',
  email: 'mailto:harshitsingh@iitb.ac.in',
  jobTitle: 'Systems and AI infrastructure engineer',
  affiliation: {
    '@type': 'CollegeOrUniversity',
    name: 'Indian Institute of Technology Bombay',
  },
  sameAs: [
    'https://github.com/harshitsinghbhandari',
    'https://www.linkedin.com/in/harshitsinghbhandari/',
    'https://x.com/HSBhandari955',
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <Hero />
      <AboutSplit />
      <WorkGrid />
      <NotesPreview />
      <ContactFinale />
    </>
  )
}
```

- [ ] **Step 2: Add canonical to `app/writing/page.tsx`**

Replace the existing `metadata` object (lines 5-9) with:

```tsx
export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Notes on building agents, local-first AI, and the systems that hold them up.',
  alternates: { canonical: '/writing' },
}
```

- [ ] **Step 3: Enrich `generateMetadata` in `app/writing/[slug]/page.tsx`**

Replace the `generateMetadata` function body's return (lines 19-34) with:

```tsx
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/writing/${params.slug}` },
    authors: [{ name: 'Harshit Singh', url: 'https://theharshitsingh.com' }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `/writing/${params.slug}`,
      publishedTime: post.date,
      modifiedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
```

- [ ] **Step 4: Add BlogPosting JSON-LD to the post page**

In `app/writing/[slug]/page.tsx`, inside `PostPage`, after the `if (!post) notFound()` line and before the `return (`, add:

```tsx
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: 'Harshit Singh', url: 'https://theharshitsingh.com' },
    url: `https://theharshitsingh.com/writing/${post.slug}`,
    image: `https://theharshitsingh.com/writing/${post.slug}/opengraph-image`,
    keywords: post.tags.join(', '),
  }
```

Then, immediately inside the returned `<article ...>` (as its first child), add:

```tsx
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
        />
```

- [ ] **Step 5: Build and verify**

Run: `npm run build`
Expected: build succeeds with no type errors.

- [ ] **Step 6: Verify JSON-LD and canonical in the rendered HTML**

Run: `npm run start`, then:
`curl -s http://localhost:3000/ | grep -o 'application/ld+json'` (expect one match)
`curl -s http://localhost:3000/writing/donna-briefing-cli | grep -o '"@type":"BlogPosting"'` (expect a match)
`curl -s http://localhost:3000/ | grep -o '<link rel="canonical"[^>]*>'` (expect canonical pointing to the homepage)
Stop the server afterward.

- [ ] **Step 7: Commit**

```bash
git add app/page.tsx app/writing/page.tsx "app/writing/[slug]/page.tsx"
git commit -m "feat(seo): add Person and BlogPosting JSON-LD plus canonical URLs"
```

---

### Task 4: On-page fixes (H1 keywords, em dash cleanup)

**Files:**
- Modify: `components/Hero.tsx:41` (h1 aria-label) and `:67` (add sr-only line)
- Modify: `app/layout.tsx:21-38` (em dash replacements in metadata strings)

**Interfaces:**
- Consumes: nothing new.
- Produces: a keyword-bearing, crawlable H1; em-dash-free metadata copy.

- [ ] **Step 1: Enrich the Hero H1 for crawlers**

In `components/Hero.tsx`, change the `<h1>` opening tag (line 41) from:

```tsx
        <h1 className="font-display text-display" aria-label={word + ','}>
```

to:

```tsx
        <h1
          className="font-display text-display"
          aria-label="Harshit Singh, systems, agents, and local-first AI, IIT Bombay"
        >
```

Then, just before the closing `</h1>` (after the accent-comma `motion.span`, around line 67), add a crawlable hidden line:

```tsx
          <span className="sr-only">
            Harshit Singh, systems, agents, and local-first AI engineer at IIT Bombay.
          </span>
```

- [ ] **Step 2: Remove em dashes from `app/layout.tsx` metadata**

Replace the `title.default`, `title.template`, `description`, `openGraph.title`, `openGraph.description`, `twitter.title`, and `twitter.description` values so none contain `—`. The metadata block (lines 18-42) becomes:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://theharshitsingh.com'),
  title: {
    default: 'Harshit Singh: Systems, Agents, Local-first AI',
    template: '%s · Harshit Singh',
  },
  description:
    'Harshit Singh: building systems, agents, and local-first AI. IIT Bombay.',
  openGraph: {
    type: 'website',
    url: 'https://theharshitsingh.com',
    siteName: 'Harshit Singh',
    title: 'Harshit Singh: Systems, Agents, Local-first AI',
    description: 'Building systems, agents, and local-first AI. IIT Bombay.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harshit Singh: Systems, Agents, Local-first AI',
    description: 'Building systems, agents, and local-first AI.',
  },
  icons: {
    icon: '/favicon.svg',
  },
}
```

- [ ] **Step 3: Confirm no em dashes remain in app code or components**

Run: `grep -rn "—" app/ components/`
Expected: no matches. (Content in `content/writing/*.mdx` is out of scope; see Step 5.)

- [ ] **Step 4: Build and verify**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 5: Produce the MDX em-dash report (no rewrite)**

Run: `grep -rn "—" content/writing/`
Record the output verbatim in the final summary so the user can fix post bodies separately. Do not edit the MDX files in this plan.

- [ ] **Step 6: Commit**

```bash
git add components/Hero.tsx app/layout.tsx
git commit -m "feat(seo): keyword-rich H1 and em-dash-free metadata copy"
```

---

## Post-implementation manual step (for the user, not the worker)

After deploy, submit `https://theharshitsingh.com/sitemap.xml` in Google Search Console, and run `npm run check:seo` (defaults to production) to confirm the live sitemap lists every post.

## Self-Review

**Spec coverage:**
- Crawl infra (robots, sitemap) → Task 1. ✓
- Auto-generated OG images → Task 2 (homepage + per-post). ✓
- Person + BlogPosting JSON-LD → Task 3. ✓
- Canonicals on all routes → Task 3 (Steps 1-3). ✓
- Hero H1 keywords → Task 4 (Step 1). ✓
- Post metadata authors/modifiedTime → Task 3 (Step 3). ✓
- Em dash cleanup + MDX flag list → Task 4 (Steps 2-5). ✓
- manifest + apple-touch-icon → Task 2 (Steps 3-4). ✓
- Verification check (sitemap contains all slugs) → Task 1 (Steps 3, 6). ✓
- Out-of-scope items (visible hero redesign, MDX body rewrites, Search Console) honored (flagged only). ✓

**Placeholder scan:** No TBD/TODO; all steps contain full code or exact commands.

**Type consistency:** `getAllPosts`, `getPostBySlug`, `getAllSlugs`, `formatPostDate` match `lib/writing.ts` signatures. `PostMeta.slug`/`date` used as typed (string). `MetadataRoute.*` types match Next 14 conventions. JSON-LD object shapes are consistent across files.
