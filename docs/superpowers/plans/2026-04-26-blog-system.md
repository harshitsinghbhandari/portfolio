# Blog System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a file-based blog system with `/blogs` listing and `/blogs/:slug` post pages to theharshitsingh.com portfolio site.

**Architecture:** Markdown files with YAML frontmatter in `content/blogs/` are loaded at build time via Vite's `import.meta.glob`, parsed with the `yaml` package, and rendered with `react-markdown`. Client-side routing via `react-router-dom` handles `/`, `/blogs`, and `/blogs/:slug`. A `404.html` copy of `index.html` enables GitHub Pages SPA fallback.

**Tech Stack:** React 18, TypeScript, Vite 5, Tailwind CSS 3.4, react-router-dom, react-markdown, rehype-raw, yaml

---

## File Structure

### New Files

| File | Responsibility |
|------|---------------|
| `content/blogs/hello-world.md` | Example blog post with frontmatter |
| `src/lib/blog.ts` | Blog data layer — glob import, frontmatter parsing, `getAllPosts()`, `getPostBySlug()` |
| `src/pages/Home.tsx` | Homepage content extracted from App.tsx (Hero, About, Skills, Projects, Contact sections) |
| `src/pages/BlogList.tsx` | Blog listing page at `/blogs` |
| `src/pages/BlogPost.tsx` | Individual blog post page at `/blogs/:slug` |

### Modified Files

| File | Change |
|------|--------|
| `package.json` | Add 4 dependencies, update build script to copy 404.html |
| `src/main.tsx` | Wrap `<App />` with `<BrowserRouter>` |
| `src/App.tsx` | Replace inline sections with `<Routes>`, add `ScrollToTop`, update reveal observer to re-run on route change |
| `src/components/Navbar.tsx` | Add "Blog" link, make section links routing-aware, make logo a react-router Link off homepage |
| `src/index.css` | Add `.blog-prose` styles for markdown rendering |

---

### Task 1: Install Dependencies & Update Build Config

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install runtime dependencies**

Run:
```bash
npm install react-router-dom react-markdown rehype-raw yaml
```

Expected: `package.json` updated with 4 new dependencies, `package-lock.json` updated, exit code 0.

- [ ] **Step 2: Update build script for 404.html SPA fallback**

In `package.json`, change the `build` script from:
```json
"build": "tsc && vite build"
```
to:
```json
"build": "tsc && vite build && cp dist/index.html dist/404.html"
```

This ensures GitHub Pages serves the SPA shell for any unknown path, letting react-router handle routing client-side.

- [ ] **Step 3: Verify build still works**

Run:
```bash
npm run build
```

Expected: Build succeeds. `dist/index.html` and `dist/404.html` both exist with identical content.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add blog system dependencies and 404.html SPA fallback"
```

---

### Task 2: Create Blog Content Layer

**Files:**
- Create: `content/blogs/hello-world.md`
- Create: `src/lib/blog.ts`

- [ ] **Step 1: Create example blog post**

Create `content/blogs/hello-world.md`:

```markdown
---
title: "Hello World"
date: "2026-04-26"
description: "The first post on my new blog — a quick intro to what I'll be writing about."
tags: ["Meta"]
---

## Welcome

This is the first post on my blog. I'll be writing about AI agents, open source development, and things I learn as an engineering student at IIT Bombay.

### What to expect

- **Technical deep dives** — breakdowns of projects I'm building
- **Open source stories** — what I learn contributing to real codebases
- **Ideas and experiments** — things I'm curious about

Here's an example code block:

```python
def hello():
    print("Hello from the blog!")
```

And a blockquote:

> The best way to learn is to build things and write about them.

More coming soon. Stay tuned.
```

- [ ] **Step 2: Create the blog data module**

Create `src/lib/blog.ts`:

```typescript
import { parse as parseYaml } from 'yaml'

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  content: string
  draft: boolean
}

interface RawFrontmatter {
  title?: string
  date?: string
  description?: string
  tags?: string[]
  draft?: boolean
}

function parseFrontmatter(raw: string): { data: RawFrontmatter; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }
  return { data: parseYaml(match[1]) as RawFrontmatter, content: match[2].trim() }
}

const modules = import.meta.glob('/content/blogs/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const posts: BlogPost[] = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '')
    const { data, content } = parseFrontmatter(raw)
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? '1970-01-01',
      description: data.description ?? '',
      tags: data.tags ?? [],
      content,
      draft: data.draft ?? false,
    }
  })
  .filter((post) => import.meta.env.DEV || !post.draft)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export function getAllPosts(): BlogPost[] {
  return posts
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}
```

Key details:
- `import.meta.glob` with `query: '?raw'` and `import: 'default'` loads each `.md` file as a raw string at build time
- Slug is derived from the filename: `hello-world.md` → `hello-world`
- Drafts are shown in dev mode (`import.meta.env.DEV`) but filtered out in production builds
- Posts are sorted by date descending (newest first)

- [ ] **Step 3: Verify TypeScript compiles**

Run:
```bash
npx tsc --noEmit
```

Expected: No errors. If there are type errors related to `import.meta.glob` or the `yaml` package, fix them before proceeding.

- [ ] **Step 4: Commit**

```bash
git add content/blogs/hello-world.md src/lib/blog.ts
git commit -m "feat: add blog content layer with example post"
```

---

### Task 3: Set Up Routing Infrastructure

**Files:**
- Create: `src/pages/Home.tsx`
- Modify: `src/main.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create Home page component**

Extract the homepage content from `App.tsx` into `src/pages/Home.tsx`:

```typescript
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Contact from '../components/Contact'

const SectionDivider = () => (
  <div className="w-full px-6 md:px-10 lg:px-[60px] max-w-content mx-auto">
    <div className="h-px bg-gradient-to-r from-transparent via-purple/20 to-transparent" />
  </div>
)

const Home = () => {
  return (
    <>
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Contact />
    </>
  )
}

export default Home
```

- [ ] **Step 2: Wrap app with BrowserRouter**

Replace the contents of `src/main.tsx` with:

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
```

- [ ] **Step 3: Replace App.tsx with route definitions**

Replace the contents of `src/App.tsx` with:

```typescript
import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import CustomCursor from './components/CustomCursor'
import ParticleBackground from './components/ParticleBackground'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal:not(.visible)')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    reveals.forEach((r) => observer.observe(r))

    return () => observer.disconnect()
  }, [pathname])

  return (
    <div className="relative">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <ScrollToTop />
      <CustomCursor />
      <ParticleBackground />
      <Navbar />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:slug" element={<BlogPost />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
```

Key details:
- `ScrollToTop` resets scroll position on every route change (pathname-based, so hash-only changes on the homepage don't trigger it)
- The IntersectionObserver for `.reveal` animations now depends on `pathname` so it re-observes new elements after route changes. The `:not(.visible)` selector avoids re-observing elements that already animated in.
- `CustomCursor` and `ParticleBackground` remain global — they render on all pages for visual consistency
- Note: `BlogList` and `BlogPost` don't exist yet — they'll be created in Tasks 5 and 6. Create placeholder files to avoid TS errors:

Create temporary `src/pages/BlogList.tsx`:
```typescript
const BlogList = () => <div>Blog List (placeholder)</div>
export default BlogList
```

Create temporary `src/pages/BlogPost.tsx`:
```typescript
const BlogPost = () => <div>Blog Post (placeholder)</div>
export default BlogPost
```

- [ ] **Step 4: Verify the app compiles and the homepage still works**

Run:
```bash
npx tsc --noEmit
```

Expected: No errors.

Start the dev server and verify:
```bash
npm run dev
```

Check in browser:
- `http://localhost:5173/` — homepage renders exactly as before (all sections, animations, nav links work)
- `http://localhost:5173/blogs` — shows placeholder text
- `http://localhost:5173/blogs/test` — shows placeholder text
- Clicking nav section links on homepage still scrolls correctly

- [ ] **Step 5: Commit**

```bash
git add src/pages/Home.tsx src/pages/BlogList.tsx src/pages/BlogPost.tsx src/main.tsx src/App.tsx
git commit -m "feat: add react-router with Home page extraction and route structure"
```

---

### Task 4: Update Navbar for Routing

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Update Navbar to be routing-aware**

Replace the contents of `src/components/Navbar.tsx` with:

```typescript
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const sectionLinks = [
  { name: 'About', hash: '#about' },
  { name: 'Work', hash: '#projects' },
  { name: 'Stack', hash: '#skills' },
  { name: 'Contact', hash: '#contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] backdrop-blur-xl transition-all duration-300 ${
        scrolled ? 'border-b border-purple/20' : 'border-b border-transparent'
      }`}
    >
      <nav className="flex justify-between items-center px-6 md:px-10 lg:px-[60px] py-6 max-w-content mx-auto" aria-label="Main navigation">
        {isHome ? (
          <a href="#hero" className="font-syne font-extrabold text-lg tracking-tight gradient-text">
            HS
          </a>
        ) : (
          <Link to="/" className="font-syne font-extrabold text-lg tracking-tight gradient-text no-underline">
            HS
          </Link>
        )}

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-10 list-none">
          {sectionLinks.map((link) => (
            <li key={link.name}>
              <a
                href={isHome ? link.hash : `/${link.hash}`}
                className="text-xs tracking-tag uppercase text-muted no-underline transition-colors duration-300 relative hover:text-cream focus-visible:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/blogs"
              className={`text-xs tracking-tag uppercase no-underline transition-colors duration-300 relative hover:text-cream focus-visible:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-accent after:transition-all after:duration-300 hover:after:w-full ${
                location.pathname.startsWith('/blogs') ? 'text-cream after:w-full' : 'text-muted'
              }`}
            >
              Blog
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light rounded-sm"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={`block w-5 h-px bg-cream transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
          <span className={`block w-5 h-px bg-cream transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-cream transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-80 border-t border-purple/20' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col gap-6 px-6 py-8 list-none">
          {sectionLinks.map((link) => (
            <li key={link.name}>
              <a
                href={isHome ? link.hash : `/${link.hash}`}
                onClick={handleLinkClick}
                className="text-sm tracking-tag uppercase text-muted no-underline transition-colors duration-300 hover:text-cream focus-visible:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light rounded-sm"
              >
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/blogs"
              onClick={handleLinkClick}
              className={`text-sm tracking-tag uppercase no-underline transition-colors duration-300 hover:text-cream focus-visible:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light rounded-sm ${
                location.pathname.startsWith('/blogs') ? 'text-cream' : 'text-muted'
              }`}
            >
              Blog
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Navbar
```

Key details:
- `isHome` determines whether section links use `#hash` (same-page scroll) or `/#hash` (full navigation to homepage + scroll)
- The "HS" logo uses `<a href="#hero">` on homepage (scrolls to top) and `<Link to="/">` elsewhere (SPA navigation to homepage)
- "Blog" link uses `<Link to="/blogs">` for SPA navigation everywhere
- Blog link is highlighted (`text-cream after:w-full`) when on any `/blogs*` path
- Mobile menu `max-h` increased from `max-h-64` to `max-h-80` to accommodate the extra "Blog" link

- [ ] **Step 2: Verify navbar behavior**

Run dev server (`npm run dev`) and check in browser:

On homepage (`/`):
- "HS" logo scrolls to hero section
- About/Work/Stack/Contact links scroll to respective sections
- "Blog" link navigates to `/blogs`

On `/blogs`:
- "HS" logo navigates back to homepage
- About/Work/Stack/Contact links navigate to homepage and scroll to sections
- "Blog" link is highlighted (cream text, underline bar visible)

On mobile:
- Hamburger opens menu with all 5 links
- Menu closes after clicking any link

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: update navbar with Blog link and routing-aware section navigation"
```

---

### Task 5: Build Blog Listing Page

**Files:**
- Modify: `src/pages/BlogList.tsx` (replace placeholder)

- [ ] **Step 1: Implement the blog listing page**

Replace the contents of `src/pages/BlogList.tsx` with:

```typescript
import { Link } from 'react-router-dom'
import { getAllPosts } from '../lib/blog'

const BlogList = () => {
  const posts = getAllPosts()

  return (
    <section className="relative z-[1] min-h-screen py-32 lg:py-40 px-6 md:px-10 lg:px-[60px] max-w-[900px] mx-auto">
      <div className="flex items-baseline gap-6 mb-12 lg:mb-16 reveal">
        <span className="text-xs tracking-[3px] text-purple-light">05</span>
        <h2 className="font-syne text-[clamp(40px,5vw,72px)] font-extrabold tracking-[-2px] leading-[1]">
          Blog
        </h2>
        <div className="flex-1 h-px bg-purple/20" />
      </div>

      {posts.length === 0 ? (
        <p className="text-muted font-serif italic text-center py-20">No posts yet.</p>
      ) : (
        <div className="flex flex-col gap-0.5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blogs/${post.slug}`}
              className="reveal block p-8 lg:p-12 border border-purple/20 bg-cream/[0.01] no-underline transition-all duration-300 hover:border-purple/50 hover:bg-purple/[0.03]"
            >
              <p className="text-2xs tracking-[3px] text-purple-light opacity-70 mb-4">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <h3 className="font-syne text-[clamp(22px,2.5vw,32px)] font-bold tracking-tight text-cream mb-3 leading-[1.15]">
                {post.title}
              </h3>
              <p className="font-serif italic text-base text-muted mb-5">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-2xs tracking-[1.5px] uppercase px-3 py-[5px] border border-purple/30 rounded-[1px] text-purple-light bg-purple/[0.06]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-2 text-xs tracking-tag uppercase text-purple-light transition-all duration-300 group-hover:gap-4">
                Read
                <svg
                  className="w-[14px] h-[14px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}

export default BlogList
```

Key details:
- Uses the site's section header pattern (numbered label + heading + gradient line)
- Post cards use the same border/bg treatment as project cards but simpler (no 3D tilt or radial gradient tracking)
- Each card is a `<Link>` wrapping the full card content for easy clicking
- Empty state shows a centered italic message
- Tags use the exact same pill badge styling as project cards

- [ ] **Step 2: Verify in browser**

Navigate to `http://localhost:5173/blogs`:
- Should show the "Blog" header with the "05" label
- The "Hello World" example post card should appear with date, title, description, and "Meta" tag
- Clicking the card navigates to `/blogs/hello-world` (placeholder for now)
- Reveal animation fires on scroll/load

- [ ] **Step 3: Commit**

```bash
git add src/pages/BlogList.tsx
git commit -m "feat: implement blog listing page with post cards"
```

---

### Task 6: Build Blog Post Page & Prose Styles

**Files:**
- Modify: `src/index.css` (add prose styles)
- Modify: `src/pages/BlogPost.tsx` (replace placeholder)

- [ ] **Step 1: Add markdown prose styles to index.css**

Add the following at the end of `src/index.css`, inside a new `@layer components` block (or append to the existing one):

```css
@layer components {
  .blog-prose h1 {
    @apply font-syne text-[clamp(28px,4vw,40px)] font-extrabold tracking-[-1px] text-cream mt-12 mb-4;
  }
  .blog-prose h2 {
    @apply font-syne text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.5px] text-cream mt-10 mb-4;
  }
  .blog-prose h3 {
    @apply font-syne text-[clamp(20px,2.5vw,26px)] font-bold text-cream mt-8 mb-3;
  }
  .blog-prose h4 {
    @apply font-syne text-lg font-bold text-cream mt-6 mb-2;
  }
  .blog-prose p {
    @apply text-sm text-cream/70 leading-[1.8] mb-6;
  }
  .blog-prose a {
    @apply text-purple-light underline decoration-purple/30 underline-offset-2 transition-colors duration-300 hover:text-accent hover:decoration-accent/50;
  }
  .blog-prose strong {
    @apply text-cream font-bold;
  }
  .blog-prose em {
    @apply font-serif italic;
  }
  .blog-prose blockquote {
    @apply border-l-2 border-purple pl-6 my-6;
  }
  .blog-prose blockquote p {
    @apply font-serif italic text-muted;
  }
  .blog-prose code {
    @apply bg-purple/10 border border-purple/20 rounded px-1.5 py-0.5 text-purple-light font-mono text-xs;
  }
  .blog-prose pre {
    @apply bg-bg2 border border-purple/20 rounded p-4 overflow-x-auto my-6;
  }
  .blog-prose pre code {
    @apply bg-transparent border-0 rounded-none p-0 text-cream/80 text-xs leading-[1.7];
  }
  .blog-prose ul {
    @apply list-disc list-outside text-cream/70 text-sm leading-[1.8] mb-6 pl-6;
  }
  .blog-prose ol {
    @apply list-decimal list-outside text-cream/70 text-sm leading-[1.8] mb-6 pl-6;
  }
  .blog-prose li {
    @apply mb-2;
  }
  .blog-prose img {
    @apply rounded border border-purple/20 max-w-full my-6;
  }
  .blog-prose hr {
    @apply h-px bg-gradient-to-r from-transparent via-purple/20 to-transparent border-0 my-8;
  }
}
```

Note: If `src/index.css` already has an `@layer components` block, merge these rules into it rather than creating a second block with the same name.

- [ ] **Step 2: Implement the blog post page**

Replace the contents of `src/pages/BlogPost.tsx` with:

```typescript
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { getPostBySlug } from '../lib/blog'

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return (
      <section className="relative z-[1] min-h-screen py-32 lg:py-40 px-6 md:px-10 lg:px-[60px] max-w-[720px] mx-auto text-center">
        <h1 className="font-syne text-[clamp(32px,5vw,56px)] font-extrabold tracking-[-2px] text-cream mb-6">
          Post not found
        </h1>
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-xs tracking-tag uppercase text-purple-light no-underline transition-colors duration-300 hover:text-accent"
        >
          <svg
            className="w-[14px] h-[14px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>
      </section>
    )
  }

  return (
    <article className="relative z-[1] min-h-screen py-32 lg:py-40 px-6 md:px-10 lg:px-[60px] max-w-[720px] mx-auto">
      <Link
        to="/blogs"
        className="inline-flex items-center gap-2 text-xs tracking-tag uppercase text-purple-light no-underline transition-colors duration-300 hover:text-accent mb-12"
      >
        <svg
          className="w-[14px] h-[14px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Blog
      </Link>

      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-2xs tracking-[3px] text-purple-light opacity-70">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-2xs tracking-[1.5px] uppercase text-muted"
            >
              &middot; {tag}
            </span>
          ))}
        </div>
        <h1 className="font-syne text-[clamp(32px,5vw,56px)] font-extrabold tracking-[-2px] leading-[1.05] text-cream mb-4">
          {post.title}
        </h1>
        <p className="font-serif italic text-xl text-muted">
          {post.description}
        </p>
        <div className="mt-8 h-px bg-gradient-to-r from-purple/40 via-purple/20 to-transparent" />
      </header>

      <div className="blog-prose">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}

export default BlogPost
```

Key details:
- Shows a "not found" state with back link if the slug doesn't match any post
- Post header shows: back link, date + tags, title, description, gradient divider
- Markdown content is rendered inside a `<div className="blog-prose">` which applies all the typography styles from Step 1
- `rehypeRaw` plugin enables raw HTML blocks within markdown content
- The `<article>` element is semantically correct for blog post content

- [ ] **Step 3: Verify in browser**

Navigate to `http://localhost:5173/blogs/hello-world`:
- Back link at top navigates to `/blogs`
- Date shows "April 26, 2026"
- Tags show "Meta"
- Title shows "Hello World"
- Description shows below the title in italic
- Gradient divider below header
- Markdown renders correctly: `## Welcome` heading, bullet list, code block, blockquote
- Code block has dark background with purple border
- Blockquote has purple left border

Navigate to `http://localhost:5173/blogs/nonexistent`:
- Shows "Post not found" heading
- Back to Blog link navigates to `/blogs`

- [ ] **Step 4: Commit**

```bash
git add src/index.css src/pages/BlogPost.tsx
git commit -m "feat: implement blog post page with markdown rendering and prose styles"
```

---

### Task 7: Full Build Verification

**Files:** None (verification only)

- [ ] **Step 1: Run TypeScript check**

Run:
```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 2: Run production build**

Run:
```bash
npm run build
```

Expected: Build succeeds. Check output:
```bash
ls dist/404.html
```
Expected: File exists.

- [ ] **Step 3: Preview production build**

Run:
```bash
npm run preview
```

Verify in browser at `http://localhost:4173`:
- Homepage (`/`) — all sections render, nav works, animations fire
- Blog listing (`/blogs`) — shows example post card
- Blog post (`/blogs/hello-world`) — full post renders with styled markdown
- Not found (`/blogs/nonexistent`) — shows "Post not found"
- Nav links work correctly on all pages
- "Blog" nav link highlighted on blog pages
- Back to Blog link works on post page

- [ ] **Step 4: Run lint**

Run:
```bash
npm run lint
```

Expected: No errors. If there are lint issues, fix them before committing.

- [ ] **Step 5: Final commit (if any lint fixes were needed)**

```bash
git add -A
git commit -m "fix: resolve lint issues in blog system"
```

Only create this commit if Step 4 required fixes. Skip if lint passes clean.
