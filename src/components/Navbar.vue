<template>
  <nav
    class="md:flex items-center justify-between space-y-5 bg-[#131022] px-5 py-3 fixed z-10 w-full border-b backdrop-blur"
  >
    <h3 class="text-xl font-bold pt-1">
      <RouterLink v-if="session" to="/user">Dashboard</RouterLink>
      <RouterLink v-else to="/">Ticket-Apps</RouterLink>
    </h3>

    <ul v-if="session" class="flex items-center justify-between gap-5 font-semibold">
      <li class="bg-[#5435EE] rounded-lg px-5 py-2">
        <RouterLink to="ticket-management">Manage Tickets</RouterLink>
      </li>
      <li class="bg-[#5435EE] rounded-lg px-5 py-2 hover:cursor-pointer">
        <button @click="handleLogout" class="hover:cursor-pointer">Logout</button>
      </li>
    </ul>

    <ul v-else class="flex items-center justify-between gap-5 font-semibold">
      <li class="bg-gray-500 rounded-lg px-5 py-2">
        <RouterLink to="/login">Login</RouterLink>
      </li>
      <li class="bg-[#5435EE] rounded-lg px-5 py-2">
        <RouterLink to="/register">Get Started</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'

const router = useRouter()
const toast = useToast()

const session = ref(localStorage.getItem('session'))

watchEffect(() => {
  session.value = localStorage.getItem('session')
})

const handleLogout = () => {
  localStorage.removeItem('session')
  toast.success('Logout successful')
  router.push('/')
}
</script>
