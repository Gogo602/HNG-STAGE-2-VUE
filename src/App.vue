<template>
  <div class="text-white bg-[#131022]">
    <Navbar />
    <main class="bg-gray-700">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from './components/Footer.vue'
import Navbar from './components/Navbar.vue'
</script>
