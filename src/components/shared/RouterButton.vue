<template>
    <router-link :to="destination" :class="buttonClass" class="btn">
      {{ text }}
    </router-link >
  </template>
  
<script>
  export default {
    name: "RouterButton",
    props: {
      text: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: false,
        default: "unPressed",
        validator(value) {
          return ["unPressed", "pressed"].includes(value);
        },
      },
      destination:{
        type: String,
        required: true
      }
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
  .btn {
    @apply text-white rounded-full font-bold;
  }
  
  .unPressed {
    @apply bg-verde-itam-2
      hover:bg-rojo-complemento;
  }
  
  .pressed {
    @apply bg-rojo-complemento;
  }
  </style>
  