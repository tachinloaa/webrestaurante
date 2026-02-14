/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D32F2F', // Deep Red
          hover: '#B71C1C',
          light: '#EF5350',
        },
        secondary: {
          DEFAULT: '#FF7043', // Warm Orange
          hover: '#F4511E',
        },
        cream: {
          DEFAULT: '#FFF3E0', // Warm Cream Background
          dark: '#FFE0B2',
        },
        stone: {
          800: '#3E2723', // Dark text
          900: '#261C19',
        },
        brand: {
          red: '#D32F2F',
          orange: '#FF7043',
          cream: '#FFF3E0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Or similar if I add fonts
        serif: ['Playfair Display', 'serif'], // Maybe for headings
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}
