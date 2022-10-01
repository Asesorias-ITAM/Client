<template>
    <input
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      class="w-full text-lg font-normal border-2 mb-6 focus:outline-blue-500"
      @input="handleInput"
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
  },
  emits: ["update:modelValue"],
  methods: {
    handleInput($event) {
      this.$emit("update:modelValue", $event.target.value);
    },
  },
};


</script>