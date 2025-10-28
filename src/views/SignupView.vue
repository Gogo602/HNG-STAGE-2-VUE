<template>
  <section
    class="min-h-[90vh] flex items-center justify-center bg-[#131022] px-5 w-full max-w-[1440]"
  >
    <div class="w-full md:w-1/4">
      <div class="text-center mb-5 mt-17 font-semibold">
        <h2 class="text-2xl">Register</h2>
        <p>Create an account and enjoy seamless Ticketing</p>
      </div>
      <form @submit.prevent="handleSubmit" class="w-full">
        <TextInput label="Full Name" name="name" id="name" v-model="name" required />
        <EmailInput label="Email" name="email" id="email" v-model="email" required />
        <PasswordInput label="Password" name="password" id="password" v-model="password" required />
        <button type="submit" class="bg-blue-600 rounded-md w-full py-2">Signup</button>
      </form>
      <p class="py-4 text-center font-semibold">
        Already have an account? <RouterLink to="/login">login</RouterLink>
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import EmailInput from '../components/inputs/EmailInput.vue'
import PasswordInput from '../components/inputs/PasswordInput.vue'
import TextInput from '../components/inputs/TextInput.vue'

const name = ref('')
const email = ref('')
const password = ref('')

const router = useRouter()

const handleSubmit = () => {
  const id: string = crypto.randomUUID()
  const data = {
    id,
    name: name.value,
    email: email.value,
    password: password.value,
  }

  // Retrieve existing users
  const existingUsers = localStorage.getItem('users')
  const users = existingUsers ? JSON.parse(existingUsers) : []

  // Add the new user
  users.push(data)

  // Save the updated users
  localStorage.setItem('users', JSON.stringify(users))

  router.push('/login')
}
</script>
