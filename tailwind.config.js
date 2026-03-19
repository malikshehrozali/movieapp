/** @type {import('tailwindcss').Config} */
module.exports = {
  // This line tells Tailwind to look at ALL files in the app folder
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
