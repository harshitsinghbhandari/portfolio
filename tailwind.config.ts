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
        bg: '#000000',
        surface: '#0d0d0f',
        border: '#242428',
        text: '#ededf0',
        muted: '#8f8f97',
        subtle: '#5c5c63',
        accent: '#9d8cf0',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['11px', { lineHeight: '1.5', letterSpacing: '0.1em' }],
      },
      maxWidth: {
        page: '768px',
      },
    },
  },
  plugins: [typography],
}

export default config
