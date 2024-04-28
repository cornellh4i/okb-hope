/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");


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
        'off-white': '#F5F5F5',
      },
      fontFamily: {
        inter: ['inter', 'serif'],
        montserrat: ['montserrat', ...defaultTheme.fontFamily.sans],
      },

      boxShadow: {
        'custom-shadow': '0px 0px 5px 0px rgba(0, 0, 0, 0.15)',
        'navbar-shadow': '0px 3px 60px 0px rgba(0, 0, 0, 0.10)',
      },
      backgroundColor: {
        'okb-blue': '#195BA5',
      },
      maxWidth: {
        '200': '200px',
      }
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

