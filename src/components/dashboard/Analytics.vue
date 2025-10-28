<template>
  <section class="grid grid-cols-1 gap-6 md:px-20 md:grid-cols-2 lg:grid-cols-3">
    <Card
      title="Total Tickets"
      :icon="AiOverleaf"
      :total="totalTickets"
      percentage="+1% from Last Month"
    />
    <Card
      title="Open Tickets"
      :icon="AiOverleaf"
      :total="openedTicket"
      percentage="Currently active"
    />
    <Card
      title="Resolved Tickets"
      :icon="AiOverleaf"
      :total="resolvedTicket"
      percentage="3% resolution rate"
    />
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import Card from './Card.vue'
import { AiOverleaf } from 'oh-vue-icons/icons'

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

// Lifecycle hook to load tickets from local storage
onMounted(() => {
  const allTickets = localStorage.getItem('tickets')
  const parsedTickets = allTickets ? JSON.parse(allTickets) : []
  tickets.value = parsedTickets.slice(0, 6)
})

// Computed properties for ticket counts
const totalTickets = computed(() => tickets.value.length || 0)

const openedTicket = computed(
  () => tickets.value.filter((ticket) => ticket.status === 'open').length,
)

const resolvedTicket = computed(
  () => tickets.value.filter((ticket) => ticket.status === 'closed').length,
)
</script>
