module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        h1: ['32px', '45px'],
        base: ['16px', '24px'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}