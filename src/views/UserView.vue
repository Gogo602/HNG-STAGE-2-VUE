<script setup lang="ts">
import Analytics from '@/components/dashboard/Analytics.vue'
import RecentTicket from '@/components/dashboard/RecentTicket.vue'
</script>

<template>
  <section className="bg-[#131022] flex justify-center min-h-screen w-full px-5 max-w-[1440]">
    <div className="w-full mt-32 space-y-5 md:mt-25">
      <div className="flex items-center justify-between font-bold w-full">
        <h2 className="text-2xl">Dashboard</h2>
      </div>
      <Analytics />
      <RecentTicket />
    </div>
  </section>
</template>
