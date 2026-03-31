# Harshit Singh - Portfolio

A modern, performant portfolio website built with React, Vite, TypeScript, and Tailwind CSS.

## Features

- ✨ Custom cursor with trailing effect
- 🌌 Animated particle background with mouse-following nebula
- 🎴 3D tilt effects on project cards
- 📜 Smooth scroll reveal animations
- 🎨 Purple gradient theme with custom design system
- 📱 Fully responsive design
- ⚡ Built with Vite for optimal performance
- 🔤 Custom font stack (Syne, DM Mono, Instrument Serif)

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion + Custom CSS animations
- **Deployment**: GitHub Pages

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── CustomCursor.tsx        # Custom cursor with trail
│   ├── ParticleBackground.tsx  # Canvas particle animation
│   ├── Navbar.tsx              # Navigation bar
│   ├── Hero.tsx                # Hero section
│   ├── About.tsx               # About section
│   ├── Skills.tsx              # Skills section
│   ├── Projects.tsx            # Projects grid
│   ├── ProjectCard.tsx         # Individual project card with 3D tilt
│   └── Contact.tsx             # Contact section
├── data/
│   └── projects.ts             # Project data
├── App.tsx                     # Main app component
├── main.tsx                    # Entry point
└── index.css                   # Global styles
```

## Animations Preserved

All animations from the original design have been preserved:
- Hero section staggered fade-up animations
- Rotating JEE rank badge
- Scroll indicator with animated line
- Navigation scroll effect
- Project card hover effects with 3D tilt
- Skill tag interactions
- Scroll reveal animations using Intersection Observer

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch via GitHub Actions.

## License

© 2024 Harshit Singh Bhandari. All rights reserved.
