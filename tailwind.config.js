/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /*Fondos*/
        "fondo-light-1": "#ffffff",
        "verde-itam-1": "#006853",
        "verde-itam-2": "#028067",
        "gris-itam-1": "#f7f6f6",
        
        "fondo-dark-1": "#283243",
        "fondo-dark-2": "#4b5158",

        /*Highlighting*/
        "rojo-complemento": "#80021b",
        "texto-hover-light-1": "#95959d", /*Al poner el mouse sobre el texto*/
        "texto-hover-dark-1": "#afafb6", /*Al poner el mouse sobre el texto*/

        /*Texto*/
        "texto-light-1": "#27272a", /*Texto estándar*/
        "texto-light-2": "#ffffff", /*Encabezados especiales*/
        
        "texto-dark-1": "#ffffff", /*Texto estándar*/
        "texto-dark-2": "#27272a", /*Encabezados especiales*/ 
        
        /*Botones*/
        "boton-tema-light": "#1e293b", /*Botón para cambiar entre claro/oscuro*/ /*slate-800*/
        "boton-tema-dark": "#94a3b8", /*slate-400*/

        /*Misc*/
        "borde-light-1": "#e5e7eb", /*Bordes de login y registro*/
        "borde-dark-1": "#3e434c",

        "color-prueba": "#ff0000" /*Un color llamativo para comprobar que se realizó un cambio*/
      },
    },
  },
  plugins: [],
};
