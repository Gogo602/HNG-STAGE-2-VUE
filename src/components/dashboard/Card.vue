<template>
  <div class="bg-gray-600 rounded-md">
    <div class="p-6 space-y-5">
      <div class="flex items-center justify-between">
        <h3 class="font-bold">{{ title }}</h3>
        <!-- Render icon dynamically using the <component> element -->
        <component :is="icon" v-if="icon" />
      </div>
      <div>
        <p class="font-bold text-4xl">{{ total }}</p>
        <p class="text-sm">{{ percentage }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import type { Component } from 'vue'

interface TCard {
  title: string
  icon: Component | null // Use Vue's Component type
  total: number
  percentage: string
}

const props = defineProps<TCard>()
</script>
