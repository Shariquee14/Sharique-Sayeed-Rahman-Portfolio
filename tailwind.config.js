/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          light: '#ececee',
          dark: '#0d0d0f',
          surface: '#f5f5f7',
        },
        brand: {
          red: '#ea3826',
          redDark: '#c72b1b',
          black: '#121212',
          charcoal: '#1a1a1a',
          muted: '#737373',
          border: '#e0e0e0',
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'card': '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 15px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 35px 60px -15px rgba(0, 0, 0, 0.35), 0 0 25px rgba(234, 56, 38, 0.15)',
        'red-glow': '0 0 40px rgba(234, 56, 38, 0.35)',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 4s ease-in-out infinite',
        'spin-slow': 'spin-slow 40s linear infinite',
      }
    },
  },
  plugins: [],
}
