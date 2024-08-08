/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':"#0e0b33",
        'secondary':"#1a183d",
        'secondary-light':"#28264e",
        'accent-primary':"#4631c5",
        'accent-secondary':"#4631c5",
      },
    },
  },
  plugins: [],
}

