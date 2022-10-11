<template>
<label :class="alertClass">{{text}}</label>
</template>

<script>
export default{
    name: "CustomLabel",
    props: {
        text: {
            type: String,
            required: true
        },
        type: {
            type: String,
        required: false,
        default: "good",
        validator(value) {
          return ["good", "bad", "neutral"].includes(value);
        }
        }
    },
    computed: {
        alertClass() {
        return {
          [this.type]: true, //[this.type] permite que guarde el valor de la variable como llave
        };
      },
    }

}

</script>

<style scoped>
label {
  @apply text-center mb-6
}
.bad {
    @apply text-red-500 bg-opacity-25 decoration-red-500 
    ;
  }
</style>