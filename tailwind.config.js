/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "verde-itam-1": "#006853",
        "verde-itam-2": "#028067",
        "gris-itam-1": "#f7f6f6",
        "rojo-complemento": "#80021b"
      },
    },
  },
  plugins: [],
};
