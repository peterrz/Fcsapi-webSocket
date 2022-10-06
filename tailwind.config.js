/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./public/**/*.html",
    "./public/*.html",
    "./src/**/*.js",
    "./src/*.js",
    "./src/**/*.html",
    "./src/*.html",
    "./public/**/*.js",
    "./public/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#669BBC",
        ...colors,
      },
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [],
};
