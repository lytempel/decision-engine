<template>
  <div class="form-control">
    <label>{{ label }}</label>
    <input
      :value="modelValue"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  modelValue: any
  name: string
  type: string
  placeholder: string
}>()
defineEmits(['update:modelValue'])
</script>

<style scoped>
label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input {
  border: 1px solid #e9e9e9;
  border-radius: 0.25rem;
  display: block;
  margin-bottom: 0.5rem;
  outline: 0;
  padding: 1rem 0.5rem;
  width: 100%;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
