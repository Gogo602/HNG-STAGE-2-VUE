<template>
  <section
    class="min-h-[90vh] flex items-center justify-center bg-[#131022] px-5 w-full max-w-[1440]"
  >
    <div class="w-full md:w-1/4">
      <div class="text-center my-7 font-semibold">
        <h2 class="text-2xl">Login</h2>
        <p>Enter your details to access your account</p>
      </div>
      <p v-if="error" class="text-white bg-red-600 w-full text-center py-1">{{ error }}</p>
      <form @submit.prevent="handleLogin" class="w-full">
        <EmailInput label="Email" name="email" id="email" v-model="email" required />
        <PasswordInput label="Password" name="password" id="password" v-model="password" required />
        <button type="submit" class="bg-blue-600 rounded-md w-full py-2">Login</button>
      </form>
      <p class="py-4 text-center font-semibold">
        Don't have an account? <RouterLink to="/register">Signup</RouterLink>
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import EmailInput from '@/components/inputs/EmailInput.vue'
import PasswordInput from '@/components/inputs/PasswordInput.vue'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const error = ref('')

const router = useRouter()
const route = useRoute()
const toast = useToast()
const auth = useAuthStore()

const handleLogin = (e: Event) => {
  e.preventDefault()
  error.value = ''

  const usersString = localStorage.getItem('users')
  const users = usersString ? JSON.parse(usersString) : []

  const user = users.find(
    (user: { email: string; password: string }) =>
      user.email === email.value && user.password === password.value,
  )

  if (user) {
    const sessionToken = crypto.randomUUID()
    const loginData = {
      userId: user.id,
      token: sessionToken,
    }

    auth.setSession(JSON.stringify(loginData))
    toast.success('Login successful!')
    const redirectPath = (route.query.redirect as string) || '/user'
    router.push(redirectPath)
  } else {
    error.value = 'Invalid email or password.'
    console.log(error.value)
  }
}
</script>
