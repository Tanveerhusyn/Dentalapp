/** @format */

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.js", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      serif: ['"Roboto Slab"', "serif"],
      body: ["Roboto", "sans-serif"],
    },
    extend: {
      width: {
        '710': '710px',
       }
    },
  },
  plugins: [require("daisyui"),
            require('tailwind-scrollbar-hide')],
  variants: {
    extend: {},
  },
  daisyui: {
    styled: true,
  },
  corePlugins: {
    // ...
    boxShadow: false,
  },
};
