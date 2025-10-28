<template>
  <div>
    <p v-if="error" class="text-white bg-red-600 w-full text-center py-1">{{ error }}</p>
    <form @submit.prevent="handleCreate">
      <TextInput label="Title" name="title" id="title" v-model="title" required />

      <div class="my-5">
        <label for="status" class="block font-semibold mb-1">Select Status</label>
        <select
          name="status"
          id="status"
          v-model="status"
          class="w-full border border-gray-500 rounded-md outline-0 px-3 py-1.5 focus:border-white"
        >
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <TextAreaInput
        label="Description"
        name="description"
        id="description"
        v-model="description"
        required
      />
      <button type="submit" class="text-center w-full py-2 bg-blue-600 rounded-md">Create</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import TextInput from '../inputs/TextInput.vue'
import TextAreaInput from '../inputs/TextAreaInput.vue'

// Define the custom event that the parent component will listen for
const emit = defineEmits(['close'])

const toast = useToast()

const title = ref('')
const description = ref('')
const status = ref('open') // Set a default status
const error = ref('')

const handleCreate = () => {
  error.value = ''

  if (!title.value || !description.value) {
    error.value = 'Title or Description must not be empty'
    return
  }

  const newTicket = {
    id: crypto.randomUUID(),
    title: title.value,
    description: description.value,
    status: status.value,
    createdAt: Date.now(),
    lastUpdated: Date.now(),
  }

  // Retrieve existing tickets
  const existingTicketsString = localStorage.getItem('tickets')
  const tickets = existingTicketsString ? JSON.parse(existingTicketsString) : []

  // Add the new ticket
  tickets.push(newTicket)

  // Save the updated array of tickets
  localStorage.setItem('tickets', JSON.stringify(tickets))
  toast.success('Ticket Created Successfully')
  console.log('Ticket created and stored in localStorage:', newTicket)

  // Clear form fields and close the modal
  title.value = ''
  description.value = ''
  emit('close')
}
</script>
