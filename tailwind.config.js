module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./game-src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          // primary: "white",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          // primary: "black",
        },
      },
      "retro",
    ],
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
      cursor: ["disabled"],
      opacity: ["disabled"],
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/aspect-ratio")],
};
