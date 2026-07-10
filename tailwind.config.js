/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    { pattern: /^bg-(red|orange|amber|green|teal|blue|indigo|pink)-(100|400|500|950)$/ },
    { pattern: /^dark:bg-(red|orange|amber|green|teal|blue|indigo|pink)-(950)$/ },
    { pattern: /^dark:bg-(red|orange|amber|green|teal|blue|indigo|pink)-950\/40$/ },
    { pattern: /^text-(red|orange|amber|green|teal|blue|indigo|pink)-(400|600)$/ },
    { pattern: /^dark:text-(red|orange|amber|green|teal|blue|indigo|pink)-(300|400)$/ },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
      },
      boxShadow: {
        'soft': '0 2px 12px -2px rgba(0, 0, 0, 0.08)',
        'card': '0 4px 24px -4px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 12px 36px -6px rgba(0, 0, 0, 0.12)',
        'glow': '0 0 24px -4px rgba(99, 102, 241, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
