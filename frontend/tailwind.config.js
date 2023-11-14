/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'okb-blue': '#195BA5',
        'med-grey': '#9A9A9A',
        'light-blue': '#519AEB',
        'lightest-blue': '#D0DBEA',
        'okb-white': '#FFFDFD',
        'dark-grey': '#5F5F5F',
      },
      fontFamily: {
        inter: ['inter', 'serif'],
      },
      
      boxShadow: {
        'custom-shadow': '0px 3px 60px 0px rgba(0, 0, 0, 0.10)',
      },
      backgroundColor: {
        'okb-blue': '#195BA5',
      },
    },
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/typography')
  ],
  daisyui: {
    themes: ['light']
  }
}

