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
    @apply text-white;
  }
  
  .primary {
    @apply text-white outline rounded-full bg-verde-itam-2
     hover:bg-white hover:text-verde-itam-2 hover:outline-verde-itam-2 hover:font-bold;
  }
  
  .secondary {
    @apply text-white bg-transparent hover:bg-verde-itam-2 hover:text-white;
  }
  </style>
  