/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'growDown 300ms ease-in-out forwards',
      },
        colors: {
          'regal-blue': '#142635',
        },
    },
  },
  plugins: [],
}
