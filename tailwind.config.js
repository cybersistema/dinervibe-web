/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette - warm, sophisticated
        burgundy: {
          50: '#fdf2f4',
          100: '#fce7ea',
          200: '#f9d2d9',
          300: '#f4adb9',
          400: '#ec7d93',
          500: '#e04d6f',
          600: '#c9365a',
          700: '#a82a4a',
          800: '#8c2641',
          900: '#722f37', // Primary burgundy
          950: '#44151d',
        },
        cream: {
          50: '#fefdfb',
          100: '#fdfbf7',
          200: '#faf7f2', // Primary cream
          300: '#f5f0e6',
          400: '#ebe3d3',
          500: '#ddd1bb',
          600: '#c4b599',
          700: '#a69474',
          800: '#8a7a5f',
          900: '#72654f',
        },
        gold: {
          50: '#fdfbeb',
          100: '#faf5c7',
          200: '#f6ea91',
          300: '#f0d951',
          400: '#e9c522',
          500: '#c9a227', // Primary gold
          600: '#b18b1b',
          700: '#8d6719',
          800: '#75521c',
          900: '#64441d',
        },
        charcoal: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#2c2c2c', // Primary charcoal
          950: '#1a1a1a',
        },
        // Grade colors
        grade: {
          aplus: '#1e5631',
          a: '#2d5a3d',
          aminus: '#3d6b4f',
          bplus: '#5a7a3a',
          b: '#7a8a2a',
          bminus: '#9a8a1a',
          cplus: '#b87333',
          c: '#cc5500',
          cminus: '#cc3300',
          d: '#a83232',
          f: '#8b0000',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.4s ease-out forwards',
        'slide-in-right': 'slideInRight 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
