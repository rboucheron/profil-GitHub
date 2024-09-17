/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.edge",
    "./resources/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [ 'Instrument Sans', 'sans-serif' ],
      },
      colors: {
        primary: {
          DEFAULT: '#5A45FF',
          lighter: '#a599ff',
        },
      },
    },
  },
  plugins: [],
}
