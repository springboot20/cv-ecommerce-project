import defaultTheme from "tailwindcss/defaultTheme";
import withMT from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */
const config = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./assets/*.svg"],
  dark: "class",
  theme: {
    screens: {
      xs: "480px",
      xlg: "992px",
      "2sxl": "1440px",
      ...defaultTheme.screens,
    },

    extend: {
      backgroundImage: {
        "nav-bg": "url('/src/assets/nav-bg.png')",
        "hero-bg": "url('/src/assets/Header.png')",
      },
      maxWidth: {
        "8xl": "90rem",
        "9xl": "94rem",
      },
      colors: {
        "light-green": "#05CCB9",
        "light-purple": "#A12AD8",
        "very-light-purple": "#C77FE8",
        ...defaultTheme.colors,
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
});

export default config;
