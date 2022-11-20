<template>
  <div class="flex-initial hover:bg-menu-button-hover">
    <button :class="buttonClass" class="flex-initial">
      {{ text }}
    </button>
  </div>
</template>

<script>
  export default {
    name: "MenuButton",
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
    @apply text-white rounded-full font-bold;
  }
  
  .unPressed {
    /*@apply bg-verde-itam-2*/
  }
  
  .pressed {
    @apply bg-menu-button-hover;
  }
  </style>
  