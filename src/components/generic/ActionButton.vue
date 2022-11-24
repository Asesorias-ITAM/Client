<template>
    <button :class="buttonClass">
      {{ text }}
    </button>
  </template>
  
  <script>
  export default {
    name: "ActionButton",
    props: {
      id: {
        type: String,
        require: true,
      },
      text: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: false,
        default: "primary",
        validator(value) {
          return ["primary", "secondary"].includes(value);
        },
      },
    },
    computed: {
      buttonClass() {
        return {
          [this.type]: true, //[this.type] permite que guarde el valor de la variable como llave
        };
      },
    },
  };
  </script>
  
  <style scoped>
  button {
    @apply text-white outline rounded-full hover:font-bold dark:outline-fondo-dark-2 hover:bg-fondo-light-1;
  }
  
  .primary {
    @apply bg-verde-itam-1 
      hover:text-verde-itam-2 hover:outline-verde-itam-2;
  }
  
  .secondary {
    @apply bg-color-prueba hover:text-color-prueba hover:outline-color-prueba;
  }
  </style>
  