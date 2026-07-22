# theharshitsingh.com

One-page personal site for Harshit Singh. Next.js 14 App Router, Tailwind CSS,
Geist Sans and Geist Mono.

## Architecture

```
app/
├── layout.tsx          # Geist fonts, Navbar, Footer, metadata
├── page.tsx             # The only route: name, tagline, bio
├── robots.ts             # Crawler rules
├── sitemap.ts            # Just the homepage
├── manifest.ts            # PWA manifest
├── opengraph-image.tsx    # Root OG image
├── apple-icon.tsx         # Apple touch icon
└── llms.txt/route.ts      # Plain-text LLM-facing summary

components/                # Navbar, Footer
lib/person.ts               # SITE_URL, PERSON_ID, personLd (schema.org)
```

Every path other than `/` permanently redirects to `/` via `next.config.mjs`,
except `/tools` and `/static`, which `vercel.json` redirects to subdomains at
the Vercel edge, and the meta endpoints listed above.

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run lint
```

Always run `npm run build` before pushing.

## Deployment

Targets **Vercel**. Push to `main` and Vercel auto-deploys. `vercel.json`
holds the `/tools` and `/static` subdomain redirects; leave it alone.
