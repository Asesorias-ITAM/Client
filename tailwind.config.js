/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /*Fondos*/
        "fondo-light-1": "#ffffff",
        "fondo-light-2": "#e1e1e1",
        "fondo-tarjeta-1": "#efefef",
        "fondo-tarjeta-2": "#dddddd",
        "verde-itam-1": "#028862",
        "verde-itam-2": "#006853",
        "verde-itam-3": "#00b591",
        "gris-itam-1": "#f7f6f6",
        
        "fondo-general-dark": "#373737",
        "fondo-dark-1": "#283243",
        "fondo-dark-2": "#4b5158",
        "fondo-dark-tarjeta-1": "#49494d",
        "fondo-dark-tarjeta-2": "#58585e",

        /*Highlighting*/
        "texto-hover-light-1": "#95959d", /*Al poner el mouse sobre el texto*/
        "texto-hover-dark-1": "#afafb6",

        /*Texto*/
        "texto-light-1": "#27272a", /*Texto estándar*/
        "texto-light-2": "#ffffff", /*Encabezados especiales*/
        
        "texto-dark-1": "#ffffff", /*Texto estándar*/
        "texto-dark-2": "#27272a", /*Encabezados especiales*/ 
        
        /*Botones*/
        "boton-tema-light": "#49494d", /*Botón para cambiar entre claro/oscuro*/ /*slate-800; 1e293b*/
        "boton-tema-dark": "#dddddd", /*slate-400; #94a3b8*/
        "menu-button-hover": "#0ead8e",
        "menu-button-seleccionado": "#fafafa",
        "card-button-hover": "#cccccf",
        "card-button-hover-dark": "#838387",

        /*Misc*/
        "borde-light-1": "#e5e7eb", /*Bordes de login y registro*/
        "borde-dark-1": "#3e434c",

        "color-prueba": "#80021B" /*Un color llamativo para comprobar que se realizó un cambio*/
      },
    },
  },
  plugins: [],
};
