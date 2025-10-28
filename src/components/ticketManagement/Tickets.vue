<template>
  <section class="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
    <template v-if="tickets && tickets.length > 0">
      <div
        v-for="ticket in tickets"
        :key="ticket.id"
        class="bg-[#1F1C2D]/60 rounded-lg p-3 border border-blue-600"
      >
        <div class="flex items-center justify-between gap-3 pb-5 font-bold">
          <h2>{{ ticket.title }}</h2>
          <p class="text-sm">
            <span :class="getStatusClass(ticket.status || 'open')">
              {{ ticket.status || 'open' }}
            </span>
          </p>
        </div>
        <p>{{ ticket.description }}</p>
        <div class="flex items-center gap-5 mt-2 font-bold">
          <button
            @click="handleEditClick(ticket)"
            class="text-white hover:cursor-pointer flex items-center gap-1"
          >
            <v-icon name="fa-solid-pen" /> Edit
          </button>
          <button
            @click="handleDelete(ticket.id)"
            class="text-red-500 hover:cursor-pointer flex items-center gap-1"
          >
            <v-icon name="md-delete" /> Delete
          </button>
        </div>
      </div>
    </template>
    <div v-else class="py-10 text-center text-gray-500 md:col-span-3 lg:col-span-4">
      <div class="flex flex-col items-center justify-center">
        <v-icon name="fa-solid-house" size="40" class="text-blue-600 mb-2" />
        <p>No tickets found.</p>
      </div>
    </div>

    <Modal
      title="Edit Ticket"
      :isOpen="isModalOpen"
      @close="toggleModal"
      v-if="isModalOpen && editingTicket"
    >
      <EditTicket
        :ticket="editingTicket"
        @close="toggleModal"
        @ticketUpdated="handleTicketUpdated"
      />
    </Modal>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { OhVueIcon as VIcon, addIcons } from 'oh-vue-icons'
import { MdDelete, HiPencil } from 'oh-vue-icons/icons'
import { useToast } from 'vue-toast-notification'
import Modal from './Modal.vue'
import EditTicket from './EditTicket.vue'

// Add icons for local use
addIcons(MdDelete, HiPencil)

interface TTicket {
  id: string
  title: string
  description: string
  status: string
  createdAt: Date
  lastUpdated: Date
}

// State
const tickets = ref<TTicket[]>([])
const isModalOpen = ref(false)
const editingTicket = ref<TTicket | null>(null)
const toast = useToast()

// Lifecycle hook to fetch tickets on mount
onMounted(() => {
  const allTickets = localStorage.getItem('tickets')
  if (allTickets) {
    tickets.value = JSON.parse(allTickets)
  }
})

// Method to toggle modal visibility
const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
  if (!isModalOpen.value) {
    editingTicket.value = null
  }
}

// Method to handle edit button click
const handleEditClick = (ticket: TTicket) => {
  editingTicket.value = ticket
  isModalOpen.value = true
}

// Method to handle ticket deletion
const handleDelete = (id: string) => {
  tickets.value = tickets.value.filter((ticket) => ticket.id !== id)
  localStorage.setItem('tickets', JSON.stringify(tickets.value))
  toast.error('Ticket Deleted')
}

// Method to handle ticket updates from the EditTicket component
const handleTicketUpdated = (updatedTicket: TTicket) => {
  const index = tickets.value.findIndex((t) => t.id === updatedTicket.id)
  if (index !== -1) {
    tickets.value[index] = updatedTicket
  }
  localStorage.setItem('tickets', JSON.stringify(tickets.value))
}

// Method to get status-based CSS class
const getStatusClass = (status: string): string => {
  switch (status) {
    case 'open':
      return 'text-green-700 bg-green-200 px-3 py-1 rounded-lg'
    case 'in_progress':
      return 'text-yellow-700 bg-yellow-200 px-3 py-1 rounded-lg'
    case 'closed':
      return 'text-gray-300 bg-gray-200 px-3 py-1 rounded-lg'
    default:
      return 'text-red-700 bg-red-200 px-3 py-1 rounded-lg'
  }
}
</script>
