/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#6366F1",
        accent: "#818CF8",
        background: "#FFFFFF",
        surface: "#F9FAFB",
        muted: "#6B7280"
      }
    }
  },
  plugins: []
};
