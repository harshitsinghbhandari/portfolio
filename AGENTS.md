# AGENTS.md

## Project Overview

This is Harshit Singh's portfolio site. It uses Next.js 14 App Router, Tailwind,
Framer Motion, and MDX content for writing.

## Key Paths

- `app/page.tsx` - home page composition.
- `app/writing/page.tsx` - writing index.
- `app/writing/[slug]/page.tsx` - individual MDX post renderer.
- `content/writing/*.mdx` - blog post source files.
- `components/` - shared sections and bespoke project components.
- `lib/writing.ts` - MDX file loading, frontmatter parsing, and slug helpers.
- `tailwind.config.ts` and `app/globals.css` - design tokens and global styles.

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
```

Use `npm run build` before pushing layout or MDX rendering changes.

## Writing Page Rules

- Individual writing pages should use the full article layout in
  `app/writing/[slug]/page.tsx`.
- Prose text should stay readable, but wide content such as code blocks and
  tables should be allowed to use the wider article column.
- MDX posts may use GitHub-flavored Markdown. Keep `remark-gfm` wired into the
  post renderer so tables render as tables.
- Do not duplicate the post title in rendered content. `lib/writing.ts` strips a
  leading `#` heading because the page header already renders the title.

## Style Notes

- Keep the dark, restrained portfolio aesthetic.
- Prefer existing utility classes and tokens from `tailwind.config.ts`.
- Avoid unrelated redesigns when fixing content or rendering bugs.
- This repo does not maintain a changelog.
