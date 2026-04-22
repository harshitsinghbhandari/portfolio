/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#050508',
        bg2: '#08080f',
        'purple-deep': '#1a0a2e',
        'purple-mid': '#3d1a6e',
        purple: '#7c3aed',
        'purple-light': '#a855f7',
        'purple-glow': '#c084fc',
        accent: '#e879f9',
        cream: '#f0eaf8',
        muted: '#9a8aaa',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
        serif: ['Instrument Serif', 'serif'],
      },
      fontSize: {
        '2xs': ['9px', { lineHeight: '1.4' }],
        'xs2': ['10px', { lineHeight: '1.4' }],
        'xs': ['11px', { lineHeight: '1.4' }],
        'sm': ['13px', { lineHeight: '1.6' }],
        'base': ['15px', { lineHeight: '1.8' }],
      },
      letterSpacing: {
        label: '4px',
        tag: '2px',
        tight: '-0.5px',
      },
      maxWidth: {
        content: '1400px',
      },
      animation: {
        'fadeUp': 'fadeUp 0.8s ease forwards',
        'fadeIn': 'fadeIn 1s ease forwards',
        'rotateSlow': 'rotateSlow 20s linear infinite',
        'scrollAnim': 'scrollAnim 2s ease infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        rotateSlow: {
          to: { transform: 'rotate(360deg)' },
        },
        scrollAnim: {
          to: { left: '200%' },
        },
      },
    },
  },
  plugins: [],
}
