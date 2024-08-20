const { transform } = require("next/dist/build/swc");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        fadeInDown: {
          "0%": {
            transform: "translateY(-20px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        fadeInLeft: {
          "0%": {
            transform: "translateX(100px)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        bouncex: {
          "0%": {
            transform: "translateX(-25%)",
          },
          "50%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-25%)",
          },
        },
      },
      animation: {
        fadeInDown: "fadeInDown 0.3s ease-in-out",
        fadeInLeft: "fadeInLeft 0.3s ease-in-out",
        bouncex: "bouncex 1s infinite",
      },
    },
  },
  plugins: [],
};
