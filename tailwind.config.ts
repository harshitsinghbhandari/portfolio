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
        bg: '#0b0b0d',
        surface: '#141416',
        border: '#232327',
        text: '#e9e9ec',
        muted: '#8f8f98',
        subtle: '#63636b',
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
