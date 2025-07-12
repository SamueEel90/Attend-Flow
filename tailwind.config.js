/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#1E1E24',
        backgroundLight: '#2F2F36',
        greenPalette: {
          50:  '#d8f3dc', // nyanza
          100: '#b7e4c7', // celadon
          200: '#95d5b2', // celadon-2
          300: '#74c69d', // mint
          400: '#52b788', // mint-2
          500: '#40916c', // sea-green
          600: '#2d6a4f', // dartmouth-green
          700: '#1b4332', // brunswick-green
          800: '#081c15', // dark-green
        },
        yellowPalette: {
          400: '#ffd166', // pastel yellow
          500: '#ffc300', // stronger yellow
        },
        redPalette: {
          400: '#ff6b6b', // light red
          500: '#c1121f', // strong red
        },
      },
    },
  },
  plugins: [],
}