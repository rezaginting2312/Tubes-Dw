/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",  // Semua file HTML di direktori root
    "./src/**/*.js", // Jika ada file JS di folder src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

