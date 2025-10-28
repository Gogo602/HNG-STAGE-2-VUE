<template>
  <section class="py-5 rounded-md">
    <div class="space-y-7">
      <div class="flex">
        <h2 class="font-semibold">Recent Tickets</h2>
      </div>
      <div class="overflow-hidden rounded-lg border border-gray-300">
        <table class="table-auto w-full border-collapse">
          <thead>
            <tr class="bg-gray-600 text-[14px]">
              <th class="border border-gray-300 text-left px-4 py-2 hidden lg:table-cell">
                Ticket
              </th>
              <th class="border border-gray-300 text-left px-4 py-2 lg:table-cell">Subject</th>
              <th class="border border-gray-300 text-left px-4 py-2 hidden lg:table-cell">
                Status
              </th>
              <th class="border border-gray-300 text-left px-4 py-2">Last Updated</th>
              <th class="border border-gray-300 text-left px-4 py-2 hidden md:table-cell">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="tickets && tickets.length > 0">
              <tr v-for="ticket in tickets" :key="ticket.id" class="text-[14px]">
                <td class="px-4 border border-gray-200 py-2 hidden lg:table-cell font-semibold">
                  #{{ ticket.id.slice(0, 8) }}...
                </td>
                <td class="px-4 border border-gray-200 py-2 lg:table-cell">
                  {{ ticket.title }}
                </td>
                <td class="px-4 py-2 border border-gray-200 hidden lg:table-cell gap-2">
                  <span :class="getStatusClass(ticket.status || 'open')">
                    {{ ticket.status || 'open' }}
                  </span>
                </td>
                <td class="px-4 border border-gray-200 py-2 text-center">
                  {{ new Date(ticket.lastUpdated).toLocaleDateString() }}
                </td>
                <td class="px-4 border border-gray-200 py-2 hidden md:table-cell text-center">
                  <button
                    @click="handleDelete(ticket.id)"
                    class="text-red-500 hover:cursor-pointer flex items-center gap-1"
                  >
                    <v-icon name="md-delete" />
                    Delete
                  </button>
                </td>
              </tr>
            </template>
            <tr v-else>
              <td colspan="5" class="py-10 text-center text-gray-500">
                <div class="flex flex-col items-center justify-center">
                  <v-icon name="fa-solid-house" size="40" class="text-blue-600 mb-2" />
                  <p>No tickets found.</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { OhVueIcon as VIcon, addIcons } from 'oh-vue-icons'
import { MdDelete } from 'oh-vue-icons/icons'

// Add icons for local use
addIcons(MdDelete)

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

// Lifecycle hook to fetch tickets on mount
onMounted(() => {
  const allTickets = localStorage.getItem('tickets')
  if (allTickets) {
    const parsedTickets: TTicket[] = JSON.parse(allTickets)
    tickets.value = parsedTickets.slice(0, 6)
  }
})

// Method to handle ticket deletion
const handleDelete = (id: string) => {
  tickets.value = tickets.value.filter((ticket) => ticket?.id !== id)
  localStorage.setItem('tickets', JSON.stringify(tickets.value))
}

// Method to get status-based CSS class
const getStatusClass = (status: string): string => {
  switch (status) {
    case 'open':
      return 'text-green-700'
    case 'in_progress':
      return 'text-yellow-700'
    case 'closed':
      return 'text-gray-300'
    default:
      return 'text-red-700'
  }
}
</script>
