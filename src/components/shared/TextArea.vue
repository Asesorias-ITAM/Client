<template>
    <textarea
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      rows="3"
      maxlength="240"
      class="max-h-64 text-lg font-normal rounded-lg border-2 mb-6 px-3 py-2 focus:outline-blue-500 dark:focus:outline-blue-500"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
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