/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        '1/1': '100%',
        '1/3': '33.33333%',
        '2/3': '66.66667%'
      },
      spacing: {
        '5/6': '83.33333%'
      },
      width: {
        '2/1': '200%'
      }
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#E85D04",
          "secondary": "#FAA307",
          "accent": "#6A040F",
          "neutral": "#D9D9D9",
          "base-100": "#ffffff",
          "info": "#4404e8",
          "success": "#04e885",
          "warning": "#f59e0b",
          "error": "#DC2F02",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
  // daisyui: {
  //   base: false,
  //   darkTheme: "light",
  // }
}
