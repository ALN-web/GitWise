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
          950: '#070C15',
          900: '#0B1220', // Deep navy
          800: '#111C2E', // Dark surface
          700: '#1A2942',
          600: '#233857',
        },
        brand: {
          orange: '#F97316',
          'orange-hover': '#EA580C',
          'orange-light': '#FFF7ED',
          'orange-border': '#FED7AA',
          'orange-subtle': 'rgba(249, 115, 22, 0.1)',
        },
        surface: {
          light: '#F7F8FA',
          border: '#E5E7EB',
          text: '#172033',
          muted: '#667085',
        },
        verification: {
          success: '#10B981',
          'success-bg': '#ECFDF5',
          'success-border': '#A7F3D0',
          warning: '#F59E0B',
          'warning-bg': '#FFFBEB',
          'warning-border': '#FDE68A',
          error: '#EF4444',
          'error-bg': '#FEF2F2',
          'error-border': '#FECACA',
          info: '#3B82F6',
          'info-bg': '#EFF6FF',
          'info-border': '#BFDBFE',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 4px 12px -2px rgba(11, 18, 32, 0.05), 0 2px 6px -1px rgba(11, 18, 32, 0.03)',
        'elevated': '0 12px 28px -6px rgba(11, 18, 32, 0.08), 0 4px 12px -2px rgba(11, 18, 32, 0.04)',
      }
    },
  },
  plugins: [],
}
