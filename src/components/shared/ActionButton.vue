<template>
    <button :class="buttonClass">
      {{ text }}
    </button>
  </template>
  
  <script>
  export default {
    name: "ActionButton",
    props: {
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
    @apply my-1.5 rounded-full text-white;
  }
  
  .primary {
    @apply text-white bg-verde-itam-2 ;
  }
  
  .secondary {
    @apply text-white bg-transparent hover:bg-verde-itam-2 hover:text-white;
  }
  </style>
  