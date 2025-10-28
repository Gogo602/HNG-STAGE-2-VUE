<template>
  <section class="relative min-h-screen flex items-center justify-center bg-[#131022] px-5 py-2">
    <div class="bg-blue-900 absolute w-30 h-30 rounded-full z-0 shadow-2xl blur-2xl inset-0" />
    <div class="flex flex-col space-y-5 z-2 relative">
      <div class="text-center -mt-15 text-md md:mt-0">
        <h2 class="text-3xl font-bold py-5 md:text-4xl">Your Ticketing, Simplified</h2>
        <p>
          The ultimate solution for managing and tracking your support Tickets.
          <br class="hidden md:inline" />
          Streamline your workflow and enhance customer satisfaction with our intuitive platform.
        </p>
      </div>

      <ul class="flex items-center justify-center gap-5 font-semibold">
        <li class="bg-[#5435EE] rounded-lg px-5 py-2">
          <RouterLink to="/register">Get Started</RouterLink>
        </li>
        <li class="bg-gray-500 rounded-lg px-6 py-2">
          <RouterLink to="/login">Login</RouterLink>
        </li>
      </ul>
      <div class="bg-blue-900 absolute w-20 h-20 rounded-full z-0 shadow-3xl blur-3xl inset-0" />
      <div
        class="bg-blue-900 absolute w-20 h-20 rounded-full z-0 shadow-3xl blur-3xl top-30 right-5"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'
</script>
