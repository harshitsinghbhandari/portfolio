# theharshitsingh.com — v2

Hybrid portfolio for Harshit Singh. Next.js 14 App Router, Tailwind, Framer
Motion, MDX. Bespoke React pages for flagship projects; a markdown pipeline
for writing.

## Architecture

```
app/
├── layout.tsx                  # Geist font, Navbar, Footer
├── page.tsx                    # Home — Hero, Flagship, Writing, About, Contact
├── projects/
│   └── donna/page.tsx          # Bespoke page (no markdown)
└── writing/
    ├── page.tsx                # Index of MDX posts
    └── [slug]/page.tsx         # MDX-rendered post

components/                     # Shared + bespoke /projects/donna pieces
content/writing/*.mdx           # All long-form writing lives here
lib/writing.ts                  # fs glob + gray-matter parsing
lib/projects.ts                 # Flagship project data
```

Two content modes:

- **Flagship projects** → bespoke React (`app/projects/<slug>/page.tsx`). Each
  flagship gets its own layout, animations, copy. No templates.
- **Writing** → drop an `.mdx` file in `content/writing/` and it appears at
  `/writing/<slug>` with full prose styling.

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run lint
```

## Authoring a post

1. Create `content/writing/<slug>.mdx`.
2. Add frontmatter:
   ```yaml
   ---
   title: "Post title"
   description: "One-line summary."
   date: 2026-05-14
   tags: ["agents", "local-ai"]
   readingTime: "6 min"
   draft: false
   ---
   ```
3. Write MDX. Standard markdown works; raw JSX components can be imported and
   used inline if needed.
4. `draft: true` posts only render in development.

## Adding a flagship project page

1. Add an entry to `lib/projects.ts` (set `bespoke: true`, point `href` at
   `/projects/<slug>`).
2. Create `app/projects/<slug>/page.tsx` and compose section components like
   `components/donna/*` does for Donna.

## Deployment

Targets **Vercel**. Push to `main` → Vercel auto-deploys. Custom domain
(`theharshitsingh.com`) needs to be re-pointed away from GitHub Pages — set
the apex/`www` records to Vercel's DNS in the registrar dashboard.

The old `/blogs/...` paths permanently redirect to `/writing/...` via
`next.config.mjs`.
