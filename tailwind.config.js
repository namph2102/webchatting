/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '990px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    container: {
      padding: {
        DEFAULT: '0rem',
        '2xl': '1rem',
        '3xl': '3rem',
      },
    },
    fontFamily: {
      main: ['Open Sans', 'sans-serif'],
    },

    extend: {},
    colors: {
      ...colors,
      transparent: 'transparent',
      current: 'currentColor',
      main: '#4EAC6D',
      'status-online': '#06d6a0',
      menu: '#2E2E2E',
      aside: '#262626',
      bg: '#2A2B2E',
      darklight: '#262626',
      white: '#adb5bd',
    },
  },
  plugins: [],
};
