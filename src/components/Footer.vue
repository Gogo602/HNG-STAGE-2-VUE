<template>
  <footer class="bg-[#131022] p-6 border-t border-gray-500">
    <div class="md:flex items-center justify-between space-y-5">
      <p>&copy; {{ year }} Ticket-App. All rights reserved.</p>

      <div class="flex items-center gap-5">
        <v-icon name="ri-at-line" />
        <v-icon name="fa6-solid-code" />
        <v-icon name="fa6-solid-camera" />
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { OhVueIcon as VIcon, addIcons } from 'oh-vue-icons'
import { RiAtLine } from 'oh-vue-icons/icons'

// Add the icons to the component's scope
addIcons(RiAtLine)

// Get the current year
const today: Date = new Date()
const year: number = today.getFullYear()
</script>
