<template>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      maxlength="100"
      class="text-lg font-normal border-2 rounded-lg mb-6 px-3 focus:outline-blue-500 dark:focus:border-blue-500"
      @input="$emit('update:modelValue', $event.target.value)"
      :disabled="disabled"
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
    },
    disabled:{
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ["update:modelValue"],
  

  
};


</script>