<template>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      class="placeholder:flex placeholder:flex-wrap text-lg font-normal border-2 mb-6 focus:outline-blue-500"
      @input="$emit('update:modelValue', $event.target.value)"
    />
</template>

<script>
export default {
  name: "TextInput",
  props: {
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
    modelValue: {
      type: String,
      required: true,
    },
    type:{
      type: String,
      required: false,
      default: "text"
    }
  },
  emits: ["update:modelValue"],
  

  
};


</script>