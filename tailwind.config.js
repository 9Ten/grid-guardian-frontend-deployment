/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pea: {
          50:  '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#5B2D8E',
          800: '#4a2373',
          900: '#4c1d95',
        },
      },
    },
  },
  plugins: [],
}
