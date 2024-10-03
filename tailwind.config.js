/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], 
  theme: {
    extend: {
      colors: {
        primary: {
          lightBlue: "rgba(3, 165, 224, 1)",
          darkBlue: "#0049FC",
          lightGray: "#00000050",
        },
      },
      boxShadow: {
        dashboard: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'welcome':"url('/src/assets/images/dashboard/welcome-bg.png')"
      }
    },
  },
  plugins: [],
}

