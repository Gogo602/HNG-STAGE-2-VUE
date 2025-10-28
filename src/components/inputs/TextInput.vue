<template>
  <div class="mb-4">
    <label :for="name" class="block font-semibold">{{ label }}</label>
    <input
      type="text"
      :id="name"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :required="required"
      class="border border-gray-500 outline-0 focus:border-white w-full px-3 py-1.5 rounded-md"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  label: string
  name: string
  modelValue: string
  required?: boolean
}>()

const emit = defineEmits(['update:modelValue'])
</script>
