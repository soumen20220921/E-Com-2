/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
   theme: {
    extend: {
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.01)' },
        },
        'glow-button': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.4)' },
        },
        'fade-in': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 4s ease-in-out infinite',
        'glow-button': 'glow-button 2s ease-in-out infinite',
        'fade-in': 'fade-in 1s ease-out forwards',
      },
    },
  },
  plugins: [],
}