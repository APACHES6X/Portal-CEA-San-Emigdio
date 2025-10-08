/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ffffff',
        },
        greenbrand: {
          50: '#f3fdf7',
          100: '#e6fbef',
          200: '#c7f6d6',
          300: '#95e9b0',
          400: '#5fd07f',
          500: '#2bbf57',
          600: '#229a46',
          700: '#1b7a36',
          800: '#155f2b',
          900: '#10b981',
        }
      },
    },
  },
  plugins: [],
}