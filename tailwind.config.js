import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grey100: "#F3F4F8",
        grey200: "#D2D4DA",
        grey300: "#B3B5BD",
        grey400: "#9496A1",
        grey500: "#777986",
        grey600: "#5B5D6B",
        grey700: "#404252",
        grey800: "#282A3A",
        grey900: "#101223",
        grey1000: "#000000",
        yellow1: "#FFD400",
        yellow2: "#FFFCDF",
        blue1: "#0051FF",
        blue2: "#EAF0FF",
        error: "#FF3E3E",
      },
      maxWidth: {
        "max-size": "500px",
      },
      minWidth: {
        "min-size": "360px",
      },
    },
    fontFamily: {
      pretendard: ["Pretendard", ...defaultTheme.fontFamily.sans],
      hsBombaram: ["HSBombaram", ...defaultTheme.fontFamily.sans],
    },
    fontSize: {
      xs: "0.5625rem",
      sm: "0.75rem",
      md: "0.9375rem",
      lg: "1.125rem",
      xl: "1.375rem",
    },
  },
  plugins: [],
};
