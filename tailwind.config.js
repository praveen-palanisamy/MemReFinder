const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./renderer/**/*.{js,ts,jsx,tsx}",
    "./renderer/pages/**/*.{js,ts,jsx,tsx}",
    "./renderer/components/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {},
  },
  darkMode: "class",
  keyframes: {
    blink: {
      "0%, 100%": { opacity: 1 },
      "50%": { opacity: 0 },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      {
        mytheme: {
          primary: "#fbbf24",
          secondary: "#b5e57e",
          accent: "#d6b251",
          neutral: "#322541",
          "base-100": "#1f2937",
          info: "#51c2ec",
          success: "#25ad94",
          warning: "#f1c241",
          error: "#f24131",
        },
      },
    ],
  },
};
