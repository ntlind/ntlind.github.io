/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2C7085",
        accent: "#5CD4C2",
        darkaccent: "#0C2C48",
        dark: "#04111c",
        accent2: "#4A9FB8",
        accent3: "#3DBAA3",
        accent4: "#1F5A6F",
        accent5: "#245C73",
        accent6: "#45D1BE",
        eggshell: "#F9F8F2",
      },
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      borderRadius: {
        10: "10px",
      },
      spacing: {
        page: "24px",
        "page-md": "48px",
        "page-lg": "80px",
      },
    },
  },
  plugins: [],
};
