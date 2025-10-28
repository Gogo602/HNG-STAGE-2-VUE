<template>
  <div class="mb-4">
    <label :for="name" class="block font-semibold mb-1">{{ label }}</label>
    <input
      type="email"
      :id="name"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :required="required"
      class="border border-gray-500 outline-0 focus:border-white w-full px-3 py-1.5 rounded-md"
    />
  </div>
</template>

<script lang="ts" setup>
// Props definition using type-based declaration
// This replaces the React props interface and component signature
const props = defineProps<{
  label: string
  name: string
  modelValue: string
  required?: boolean
}>()

// Define the custom event that v-model listens for
const emit = defineEmits(['update:modelValue'])
</script>
