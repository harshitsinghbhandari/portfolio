/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0c',
        bg2: '#111114',
        text: '#e8e6e3',
        muted: '#8a8780',
        accent: '#9b7cd3',
      },
      fontFamily: {
        display: ['Newsreader', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['10px', { lineHeight: '1.4' }],
        'xs': ['11px', { lineHeight: '1.5' }],
        'sm': ['13px', { lineHeight: '1.65' }],
        'base': ['15px', { lineHeight: '1.7' }],
        'h3': ['clamp(20px, 2.5vw, 28px)', { lineHeight: '1.25', letterSpacing: '-0.2px' }],
        'h2': ['clamp(28px, 4vw, 48px)', { lineHeight: '1.1', letterSpacing: '-0.4px' }],
        'h1': ['clamp(36px, 5vw, 64px)', { lineHeight: '1.08', letterSpacing: '-0.5px' }],
        'display': ['clamp(48px, 8vw, 104px)', { lineHeight: '1.02', letterSpacing: '-1px' }],
      },
      letterSpacing: {
        label: '4px',
        tag: '2px',
      },
      maxWidth: {
        content: '1200px',
      },
      animation: {
        'fadeUp': 'fadeUp 0.8s ease forwards',
        'fadeIn': 'fadeIn 1s ease forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
