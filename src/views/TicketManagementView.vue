<template>
  <section class="bg-[#131022] flex justify-center min-h-screen w-full px-5 max-w-[1440] pb-5">
    <div class="w-full mt-32 space-y-5 md:mt-25">
      <div class="flex items-center justify-between font-semibold w-full">
        <h2 class="text-2xl">Manage Tickets</h2>
        <button
          @click="toggleModal"
          class="bg-blue-600 rounded-md py-2 px-2 text-white hover:cursor-pointer md:px-5"
        >
          + Create Ticket
        </button>
      </div>

      <Analytics />

      <div class="space-y-5 mt-10">
        <h3 class="font-bold text-2xl">Available Tickets</h3>
        <Tickets />
      </div>
    </div>
  </section>

  <Modal title="Create Ticket" :isOpen="isModalOpen" @close="toggleModal">
    <CreateTicket @close="toggleModal" />
  </Modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Analytics from '../components/dashboard/Analytics.vue'
import Modal from '../components/ticketManagement/Modal.vue'
import CreateTicket from '../components/ticketManagement/CreateTicket.vue'
import Tickets from '../components/ticketManagement/Tickets.vue'

const isModalOpen = ref(false)

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}
</script>
