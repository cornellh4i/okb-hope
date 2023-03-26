/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['inter', 'serif'],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}