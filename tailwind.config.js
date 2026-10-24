/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#040d1a',
          900: '#07172B', // Deep navy
          800: '#10263D', // Secondary navy
          700: '#1b3858',
          600: '#264c75',
        },
        brand: {
          orange: '#F36B16',
          'orange-hover': '#e05e0c',
          'orange-light': '#FFF5EE',
          'orange-border': '#FFD8BE',
        },
        surface: {
          light: '#F7F8FA',
          border: '#E7EAF0',
          text: '#172033',
          muted: '#667085',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(7, 23, 43, 0.06), 0 2px 6px -1px rgba(7, 23, 43, 0.04)',
        'floating': '0 20px 40px -15px rgba(7, 23, 43, 0.18), 0 0 1px 1px rgba(7, 23, 43, 0.05)',
      }
    },
  },
  plugins: [],
}
