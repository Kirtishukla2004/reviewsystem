/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'ui-sans-serif'],
        body:    ['DM Sans', 'ui-sans-serif'],
      },
      colors: {
        base:    '#08080f',
        surface: '#0f0f1a',
        surface2:'#16162a',
        cyan:    '#00ffe0',
        lime:    '#b8ff57',
      },
      boxShadow: {
        cyan:  '0 0 24px rgba(0,255,224,0.2)',
        'cyan-lg': '0 0 40px rgba(0,255,224,0.3)',
      },
      keyframes: {
        fadein: {
          '0%':   { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 12px rgba(0,255,224,0.2)' },
          '50%':       { boxShadow: '0 0 28px rgba(0,255,224,0.45)' },
        },
      },
      animation: {
        fadein:      'fadein 0.5s ease forwards',
        'pulse-glow':'pulse-glow 2.5s ease infinite',
      },
    },
  },
  plugins: [],
};