import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#08080a',
        surface: '#0e0e11',
        border: '#1e1e23',
        text: '#ededef',
        muted: '#8a8a93',
        subtle: '#5b5b63',
        accent: '#e63946',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
        serif: ['var(--font-instrument-serif)', 'ui-serif', 'Georgia', 'serif'],
      },
      fontSize: {
        '2xs': ['10px', { lineHeight: '1.4', letterSpacing: '0.08em' }],
        display: ['clamp(72px, 11vw, 180px)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        section: ['clamp(80px, 14vw, 220px)', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        finale: ['clamp(120px, 22vw, 360px)', { lineHeight: '0.88', letterSpacing: '-0.04em' }],
      },
      maxWidth: {
        prose: '720px',
        page: '1100px',
      },
    },
  },
  plugins: [typography],
}

export default config
