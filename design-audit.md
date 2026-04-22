# Design System Audit — Harshit Singh Portfolio

**Audited:** 2026-04-22
**Stack:** React 18 + Vite + Tailwind CSS 3.4 + TypeScript
**Live domain:** theharshitsingh.com

---

## 1. Critical Bugs

### 1.1 Scroll-reveal animation is completely broken

`App.tsx` sets up an `IntersectionObserver` that adds a `.visible` class to `.reveal` elements, but **neither `.reveal` nor `.visible` have any CSS definitions anywhere in the codebase** (not in `index.css`, not in `tailwind.config.js`, nowhere). Every section that uses `className="reveal"` (About, Skills, Projects, Contact) has no entrance animation — the observer fires, adds the class, and nothing visible happens.

**Fix:** Add CSS rules in `index.css`, e.g.:

```css
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### 1.2 Framer Motion is installed but never used

`framer-motion` is listed as a production dependency in `package.json` but is **not imported in any file**. This adds ~140 KB (minified) to the bundle for zero benefit. Either use it (replacing the manual IntersectionObserver + CSS approach) or remove it.

---

## 2. Visual Design & Color Palette

### Strengths
- The dark theme with purple accent gradient is cohesive and modern.
- The color token system in `tailwind.config.js` (`bg`, `bg2`, `purple-deep`, `purple-mid`, `purple`, `purple-light`, `purple-glow`, `accent`, `white`, `muted`) is well-organized.
- Gradient text effects (`gradient-text`, `gradient-text-primary`) are used consistently for emphasis.

### Issues & Suggestions

| Issue | Details | Suggestion |
|-------|---------|------------|
| **Monochromatic palette lacks hierarchy** | Everything is purple. Headers, tags, links, stats, labels — all sit in the same purple family. There is no secondary or tertiary accent to create visual differentiation between interactive, informational, and decorative elements. | Introduce a warm accent (e.g., amber/gold `#f59e0b`) or a cool complement (e.g., cyan `#06b6d4`) for CTAs or secondary highlights to break the monotony. |
| **Background is nearly pure black (`#050508`)** | Very dark backgrounds strain eyes in well-lit environments and make it hard to distinguish section boundaries. | Consider `#0a0a12` or `#0c0c18` — still very dark but with slightly more luminance to give depth. |
| **`white` token is not actually white** | The `white` color is defined as `#f0eaf8` (a warm lavender tint). This creates confusion when writing Tailwind utilities — `text-white` gives purple-tinted white, not the Tailwind default. | Rename to `cream` or `off-white` and keep Tailwind's default `white` intact. Or use `extend` more carefully so the override is intentional. |
| **No dark/light mode support** | The site is exclusively dark. Some visitors (especially recruiters viewing in bright offices) would benefit from a light mode toggle. | Add a `dark:` Tailwind strategy and a theme toggle in the navbar. Even a simple `prefers-color-scheme` media query would help. |

---

## 3. Typography

### Strengths
- Three distinct font families (`Syne` for headings, `DM Mono` for body, `Instrument Serif` for accents/subtitles) create a clear typographic hierarchy.
- `clamp()` is used effectively for responsive heading sizes.

### Issues & Suggestions

| Issue | Details | Suggestion |
|-------|---------|------------|
| **Monospace body text is hard to read** | `DM Mono` as the default body font (`font-family: 'DM Mono', monospace` on `body`) trades readability for aesthetics. Monospace fonts are optimized for code, not paragraphs. Long descriptions in project cards become fatiguing to read. | Use `DM Mono` for labels, tags, and small UI text. Switch body/paragraph text to a clean sans-serif (e.g., `Inter`, `DM Sans`) or use `Instrument Serif` for body copy. |
| **No `font-display: swap`** | The Google Fonts import doesn't specify `display=swap` in the URL. On slow connections, text may be invisible during font loading (FOIT). | Add `&display=swap` to the Google Fonts URL (already present — confirmed `display=swap` is in the import). Actually, re-checking: it IS there. Good. |
| **Font weight explosion** | Syne loads weights 400-800, DM Mono loads 300-500. If only bold/extrabold is used for Syne, the lighter weights are dead code adding to load time. | Audit actual usage: Syne uses `font-extrabold` (800) and `font-bold` (700). Drop 400, 500, 600. DM Mono uses primarily 400. Drop 300 and 500 if unused. |
| **Inconsistent text sizing** | Sizes are specified as arbitrary values: `text-[11px]`, `text-[10px]`, `text-[13px]`, `text-[15px]`, `text-[9px]`. These don't map to a type scale and make it hard to maintain consistency. | Define a type scale in `tailwind.config.js` (`fontSize` extend) with named sizes: `xs2` (9px), `xs` (10-11px), `sm` (13px), `base` (15px), etc. Then use those tokens instead of arbitrary values. |
| **Tracking (letter-spacing) overuse** | Almost every text element has custom tracking: `tracking-[4px]`, `tracking-[3px]`, `tracking-[2px]`, `tracking-[1px]`, `tracking-[1.5px]`. This creates a noisy typographic rhythm. | Standardize on 2-3 tracking values and define them as Tailwind tokens. E.g., `tracking-label` (3px), `tracking-tag` (1.5px). |

---

## 4. Spacing & Layout

### Strengths
- Consistent `px-[60px]` horizontal padding across all sections creates visual alignment.
- `py-[120px]` section padding gives generous breathing room.
- The 2-column grid in About and Projects works well on desktop.

### Issues & Suggestions

| Issue | Details | Suggestion |
|-------|---------|------------|
| **Fixed pixel padding breaks on small screens** | `px-[60px]` is hardcoded everywhere. On a 375px mobile screen, that leaves only 255px of content width — extremely cramped. | Use responsive padding: `px-6 sm:px-10 lg:px-[60px]`. Same for section vertical padding: `py-16 lg:py-[120px]`. |
| **Section dividers use inline styles** | The dividers in `App.tsx` use `style={{ width: 'calc(100% - 120px)', marginLeft: '60px' }}`. These should be Tailwind classes. | Replace with `className="mx-[60px]"` or better yet, make them responsive as well. |
| **No max-width container** | Content stretches to full viewport width on ultra-wide monitors (2560px+). The hero heading at 10vw on a 4K screen is enormous. | Add a `max-w-7xl mx-auto` container or define a custom `max-w-content` in the Tailwind config (e.g., 1400px). |
| **Magic numbers everywhere** | `mt-[52px]`, `py-[14px]`, `gap-8`, `bottom-10`, `right-20`, `mb-16` — spacing values are arbitrary and inconsistent. | Define a spacing scale and stick to it. Document the rhythm (e.g., 4/8/16/24/48/96). |
| **`max-[900px]` breakpoint is non-standard** | The 900px breakpoint used for mobile layout changes (`max-[900px]:grid-cols-1`, `max-[900px]:hidden`) doesn't align with Tailwind's default breakpoints (640, 768, 1024, 1280). | Use `md:` (768px) or `lg:` (1024px) breakpoints for consistency, or define `900` as a custom breakpoint in `tailwind.config.js`. |

---

## 5. Responsiveness

### Issues

| Issue | Details | Suggestion |
|-------|---------|------------|
| **No mobile hamburger menu** | The navbar renders a horizontal `<ul>` with 4 links at all screen sizes. On mobile, these links overflow or become too small to tap. | Add a hamburger menu toggle for screens below `md` (768px). Hide the `<ul>` behind a slide-in or dropdown menu. |
| **Hero skills row wraps poorly** | The "AI Agents / Full-Stack Development / Systems & AI" row with dividers doesn't stack on mobile. The dividers (`w-10 h-px`) make no sense in a vertical layout. | Make this `flex-wrap` with a different separator on mobile, or stack vertically. |
| **Floating badge is binary** | The JEE rank badge uses `max-[900px]:hidden` — it's either fully visible or completely gone. No intermediate state. | Show it below the hero content on mobile instead of hiding it. Alternatively, reduce its size and reposition it. |
| **About photo is hidden on mobile** | `max-[900px]:hidden` completely removes the photo. Visitors on mobile never see it. | Show a smaller version at the top of the About section on mobile. |
| **60px padding on mobile** | As noted above, all sections use `px-[60px]` with no mobile override. | Add responsive padding classes. |
| **Footer layout breaks** | The three-column footer layout (`flex justify-between`) at `max-[900px]` switches to a column, but the text-center alignment is only applied via `max-[900px]:text-center`, missing the flex direction change. | Test on actual mobile widths to ensure the fallback layout is clean. |

---

## 6. Accessibility (a11y)

### Issues

| Severity | Issue | Details | Suggestion |
|----------|-------|---------|------------|
| **Critical** | **`cursor: none` on body** | `body { cursor: none }` hides the system cursor globally and replaces it with a custom `<div>`. This is an accessibility disaster: screen magnifier users lose their cursor, touchpad/trackpad users get confused, and anyone who disables JS sees no cursor at all. | Remove `cursor: none` from body. Keep the custom cursor as an enhancement but let it layer on top of (not replace) the native cursor. Or apply `cursor: none` only when the custom cursor is confirmed to be active. |
| **Critical** | **No skip-to-content link** | There is no skip navigation link for keyboard/screen reader users. | Add a visually hidden "Skip to main content" `<a>` as the first focusable element. |
| **High** | **No ARIA landmarks** | The app uses `<section>` tags but no `<main>`, `<header>`, or `<footer>` elements. Screen readers can't navigate by landmarks. | Wrap the navbar in `<header>`, the content sections in `<main>`, and the footer in `<footer>`. |
| **High** | **Color contrast** | `text-muted` (`#7a6a8a`) on `bg` (`#050508`) has a contrast ratio of approximately 3.5:1 — below WCAG AA minimum (4.5:1 for normal text). Many labels, subtitles, and descriptions use this color. | Lighten `muted` to at least `#9a8aaa` (~5:1 ratio) or use a different color for text vs decorative elements. |
| **High** | **No focus styles** | No custom focus indicators are defined. Since the site uses `cursor: none` and custom visual language, default browser focus rings may be invisible or clash. | Add explicit `focus-visible:` styles (e.g., `focus-visible:ring-2 focus-visible:ring-purple-light focus-visible:outline-none`) to all interactive elements. |
| **Medium** | **Social links lack accessible names** | GitHub and LinkedIn links in Contact have visible text, which is good. However, the SVG icons use `aria-hidden="true"` correctly. No issues here. | No action needed for these specific links. |
| **Medium** | **Stat card `infinity` symbol** | The `∞` character in the "Ideas Brewing" stat may not be announced correctly by all screen readers. | Add `aria-label="Infinity"` or use the word "Endless" instead. |
| **Low** | **`<em>` used for visual styling, not emphasis** | In Contact, `<em className="not-italic gradient-text">` strips italic and uses the tag purely for styling. Semantically misleading. | Use `<span>` instead. |

---

## 7. Animations & Interactions

### Strengths
- The particle background canvas is visually striking and performant (120 particles, connection lines at <120px distance).
- The project card 3D tilt effect on hover is smooth (perspective 800px, 8deg rotation).
- Custom cursor with trailing circle creates a premium feel.

### Issues & Suggestions

| Issue | Details | Suggestion |
|-------|---------|------------|
| **No `prefers-reduced-motion` support** | Users who enable "Reduce Motion" in their OS still see all animations: particles, fade-ups, cursor trail, 3D tilts, rotating badge. | Wrap animations in `@media (prefers-reduced-motion: reduce)` to disable or tone them down. In Tailwind: `motion-reduce:animate-none`. |
| **Particles are always-on with O(n^2) loop** | `drawConnections()` runs nested loops over 120 particles (14,400 iterations per frame) on every `requestAnimationFrame` call. On low-power devices or phones, this tanks frame rate. | Reduce particle count on mobile (`window.innerWidth < 768 ? 40 : 120`). Use spatial partitioning or limit connection checks. Add a performance budget check. |
| **Custom cursor doesn't work on touch devices** | `cursor: none` hides the cursor, but on mobile (touch) there is no cursor to replace. The custom cursor div just sits at (0,0) or last touch position, serving no purpose. | Detect touch devices and disable the custom cursor entirely. `('ontouchstart' in window)` or `matchMedia('(pointer: coarse)')`. |
| **`animate-fadeUp` uses `opacity: 0` as initial state** | Elements start invisible and only animate in after their delay. If JS fails to load or runs slowly, content is permanently invisible. | Use a fallback: set content to visible by default, then add the animation class only after JS confirms it's ready. |
| **Scroll-reveal has no stagger** | All `.reveal` elements within the same viewport become visible simultaneously. There's no stagger or cascade. | Add incremental `transition-delay` to child elements within each section. |

---

## 8. Component Architecture & Code Quality

| Issue | Details | Suggestion |
|-------|---------|------------|
| **Direct DOM manipulation in React** | `App.tsx` uses `document.querySelectorAll('.reveal')` with an IntersectionObserver — bypassing React's declarative model. `CustomCursor.tsx` and `ProjectCard.tsx` also manipulate DOM directly. | Use React refs and `useInView` hooks (from `framer-motion` or `react-intersection-observer`). Since `framer-motion` is already installed, leverage `motion.div` with `whileInView`. |
| **Inline styles mixed with Tailwind** | Several components mix `style={{ }}` props with Tailwind classes (animation delays, calc widths, cursor positioning). This creates two competing styling systems. | Move animation delays into CSS custom properties or Tailwind arbitrary properties. Replace calc-based widths with responsive Tailwind classes. |
| **No component for section dividers** | The gradient divider is copy-pasted 4 times in `App.tsx` with identical inline styles. | Extract a `<SectionDivider />` component. |
| **`key={idx}` anti-pattern** | Projects and skills use array index as `key`. Since these lists are static this doesn't cause bugs, but it's a bad habit. | Use a unique identifier (project title slug, skill name) as the key. |

---

## 9. Performance

| Issue | Details | Suggestion |
|-------|---------|------------|
| **Google Fonts blocks rendering** | The `@import url(...)` in `index.css` is render-blocking. The browser must fetch the CSS file before painting any text. | Move to `<link rel="preconnect">` + `<link rel="stylesheet">` in `index.html` `<head>`, or self-host the fonts. |
| **No image optimization** | `hsb.jpg` is served as-is from `/public`. No `srcset`, no WebP/AVIF, no lazy loading. | Add `loading="lazy"`, provide `width`/`height` attributes to prevent layout shift, and consider converting to WebP. |
| **Canvas runs continuously** | `ParticleBackground` never pauses — it renders on every frame even when the tab is backgrounded (though `requestAnimationFrame` throttles this, the JS still runs). | Add `document.hidden` check in the animation loop to fully pause when the tab isn't visible. |
| **No code splitting** | All components are bundled into a single chunk. For a small site this is acceptable, but the canvas/particle code could be lazy-loaded. | Consider `React.lazy()` for `ParticleBackground` since it's non-critical. |

---

## 10. SEO & Meta

| Issue | Details | Suggestion |
|-------|---------|------------|
| **Minimal `<head>` metadata** | No `<meta name="description">`, no Open Graph tags, no Twitter card tags. Sharing on LinkedIn or Twitter will show a blank preview. | Add `description`, `og:title`, `og:description`, `og:image`, `twitter:card` meta tags. |
| **Favicon is generic** | `vite.svg` (the Vite logo) is the favicon. | Replace with a custom favicon matching the "HS" brand in the navbar. |
| **No structured data** | No JSON-LD or microdata for Person schema. | Add basic `Person` structured data for better search engine understanding. |
| **SPA with no SSR/prerendering** | The entire app is client-rendered. Search engines may not index the content effectively. | Consider `vite-plugin-ssr` or at minimum `vite-plugin-prerender` to generate static HTML for key routes. |

---

## 11. UX & Content

| Issue | Details | Suggestion |
|-------|---------|------------|
| **No resume/CV download** | A portfolio for internship applications should prominently feature a downloadable resume. | Add a "Download Resume" button in the hero or about section. |
| **Email is the only contact method** | No contact form, no Twitter/X, no way to reach out other than email. | Consider adding a simple contact form (even a mailto form) and/or Twitter link. |
| **"Open to Internships - 2026" is outdated** | The contact section says "Open to Internships - 2026." If the site persists, this date becomes stale. | Make the year dynamic or remove the specific year. |
| **Project numbering inconsistency** | Section headers use numbers (Skills = 02, Work = 03) but About has no number, and there's no 01 section. | Add consistent section numbering starting from the About section, or remove numbers entirely. |
| **No blog or writing section** | For an engineer building credibility, a blog/writing section demonstrates depth of thought. | Consider adding a blog or linking to external writing (Medium, dev.to, etc.) |
| **Footer repeats GitHub URL as plain text** | The footer shows `github.com/harshitsinghbhandari` as text alongside a clickable GitHub icon link above. Redundant. | Remove the plain text URL or make it a clickable link. |

---

## Summary: Priority Matrix

### P0 — Must Fix (broken functionality)
1. Add `.reveal` / `.visible` CSS definitions (scroll-reveal is non-functional)
2. Remove or conditionally apply `cursor: none` (accessibility blocker)
3. Add responsive padding for mobile viewports
4. Add mobile navigation (hamburger menu)

### P1 — High Impact (quality & professionalism)
5. Add `prefers-reduced-motion` support
6. Improve color contrast for `muted` text to meet WCAG AA
7. Add semantic HTML landmarks (`<main>`, `<header>`, `<footer>`)
8. Add Open Graph / Twitter meta tags
9. Add skip-to-content link
10. Remove unused `framer-motion` dependency OR actually use it

### P2 — Medium Impact (polish)
11. Add a max-width container for ultra-wide screens
12. Standardize type scale (replace arbitrary pixel values with tokens)
13. Standardize breakpoints (replace `max-[900px]` with standard Tailwind breakpoints)
14. Disable custom cursor and particles on touch/low-power devices
15. Optimize font loading (preconnect, subset unused weights)
16. Replace generic Vite favicon with custom branding
17. Add resume download button

### P3 — Nice to Have (enhancements)
18. Add light/dark mode toggle
19. Add a secondary accent color to break purple monotony
20. Introduce staggered scroll-reveal animations
21. Lazy-load `ParticleBackground`
22. Add structured data (JSON-LD)
23. Add image optimization (WebP, srcset, lazy loading)
24. Consider SSG/prerendering for SEO
