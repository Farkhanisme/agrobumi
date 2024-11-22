/** @type {import('tailwindcss').Config} */
import theme from "./theme.js";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        taprom: ["Taprom", "serif"],
        volkhov: ["Volkhov", "serif"],
      },
      colors: theme.colors,
    },
  },
  plugins: [],
};
