/** @type {import('tailwindcss').Config} */

{/* <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Roboto&display=swap" rel="stylesheet">

</link> */}
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
      fontFamily: {
        inter: ['inter', 'serif'],
        // montserrat: ['Montserrat', 'serif']
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'custom-shadow': '0px 0px 5px 0px rgba(0, 0, 0, 0.15)',
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

