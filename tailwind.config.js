/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': { 'max': '767px' },
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {
      fontFamily: {
        'inter': 'Inter',
      },
      colors: {
        'primary': '#151515',
      },
      keyframes: {
        staggeredSlideIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'staggered-slide-in': 'staggeredSlideIn 0.4s ease-out forwards',
      },

    },
  },
  plugins: [],
}