/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        todo: "#111100",
        body: "#10303c",
        mainRed: "#EE7C75",
      },
    },
  },
  plugins: [],
}

