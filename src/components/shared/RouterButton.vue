<template>
    <router-link :to="destination" :class="buttonClass" class="btn hover:bg-menu-button-hover">
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
  
  .pressed {
    @apply bg-menu-button-hover;
  }
  </style>
  