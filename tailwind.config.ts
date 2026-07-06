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
        bg: '#0a0a0b',
        surface: '#111113',
        border: '#1e1e22',
        text: '#f1efea',
        muted: '#8a8a93',
        subtle: '#5b5b63',
        accent: '#c8443f',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
        serif: ['var(--font-newsreader)', 'ui-serif', 'Georgia', 'serif'],
      },
      fontSize: {
        '2xs': ['10px', { lineHeight: '1.4', letterSpacing: '0.08em' }],
        hero: ['clamp(38px, 6vw, 80px)', { lineHeight: '1.04', letterSpacing: '-0.02em' }],
        section: ['clamp(26px, 3vw, 44px)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        title: ['clamp(24px, 2.6vw, 40px)', { lineHeight: '1.06', letterSpacing: '-0.02em' }],
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
