<template>
  <div>
    <p v-if="error" class="text-white bg-red-600 w-full text-center py-1">{{ error }}</p>
    <form @submit.prevent="handleUpdate">
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
      <button type="submit" class="text-center w-full py-2 bg-blue-600 rounded-md">
        Update Ticket
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useToast } from 'vue-toast-notification'
import TextInput from '../inputs/TextInput.vue'
import TextAreaInput from '../inputs/TextAreaInput.vue'

interface TTicket {
  id: string
  title: string
  description: string
  status: string
  createdAt: Date
  lastUpdated: Date
}

// Define props and events
const props = defineProps<{
  onClose: () => void
  ticket: TTicket
}>()

const emit = defineEmits(['close', 'ticketUpdated'])

const toast = useToast()

const title = ref('')
const description = ref('')
const status = ref('open')
const error = ref('')

// Watch for changes in the 'ticket' prop to update local state
watch(
  () => props.ticket,
  (newTicket) => {
    if (newTicket) {
      title.value = newTicket.title
      description.value = newTicket.description
      status.value = newTicket.status || 'open'
    }
  },
  { immediate: true },
)

const handleUpdate = () => {
  error.value = ''

  if (!title.value || !description.value) {
    error.value = 'Title and Description must not be empty'
    return
  }

  const updatedTicket = {
    ...props.ticket,
    title: title.value,
    description: description.value,
    status: status.value,
    lastUpdated: Date.now(),
  }

  const allTickets = localStorage.getItem('tickets')
  const tickets = allTickets ? JSON.parse(allTickets) : []

  const ticketIndex = tickets.findIndex((t: TTicket) => t.id === updatedTicket.id)

  if (ticketIndex > -1) {
    tickets[ticketIndex] = updatedTicket
  }

  localStorage.setItem('tickets', JSON.stringify(tickets))
  toast.success('Ticket Updated Successfully')

  // Emit the ticketUpdated event to the parent
  emit('ticketUpdated', updatedTicket)

  // Call the parent's onClose method
  props.onClose()
}
</script>
