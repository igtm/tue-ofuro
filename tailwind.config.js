module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          50: "var(--color-primary)",
          100: "var(--color-primary)",
          200: "var(--color-primary)",
          300: "var(--color-primary)",
          400: "var(--color-primary)",
          500: "var(--color-primary)",
          600: "var(--color-primary)",
          700: "var(--color-primary)",
          800: "var(--color-primary)",
          900: "var(--color-primary)",
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
      cursor: ["disabled"],
      opacity: ["disabled"],
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
