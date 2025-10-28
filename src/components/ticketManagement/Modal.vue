<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center z-1000 backdrop-blur-sm w-full"
  >
    <div
      @click.stop
      class="bg-gray-600 space-y-4 p-5 shadow-2xl max-w-lg w-full m-4 flex flex-col max-h-[95vh] overflow-hidden rounded-lg border"
    >
      <div class="flex items-center justify-between border-b-3 border-gray-300 pb-4">
        <h2 class="font-bold text-xl">{{ title }}</h2>
        <button @click="closeModal" class="text-4xl text-blue-700">&times;</button>
      </div>

      <div class="mt-3 overflow-y-scroll hide-bar">
        <!-- This is the slot where the parent component's content will be injected -->
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

// Define the props that the component expects
const props = defineProps<{
  isOpen: boolean
  title: string
}>()

// Define the custom event that this component can emit
const emit = defineEmits(['close'])

// Method to emit the 'close' event
const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
/* For WebKit browsers (Chrome, Safari, Opera) */
.hide-bar::-webkit-scrollbar {
  width: 0.5em; /* Or whatever width you want */
  height: 0.5em;
  display: none; /* Hide the scrollbar */
}

/* For Firefox */
.hide-bar {
  scrollbar-width: none; /* Hide the scrollbar */
}

/* For IE and Edge */
.hide-bar {
  -ms-overflow-style: none; /* Hide the scrollbar */
}
</style>
