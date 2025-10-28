<template>
  <section class="flex items-center justify-center bg-[#131022] px-5 py-7">
    <div class="flex flex-col space-y-5 z-2 relative">
      <div class="text-center text-md md:mt-0">
        <h2 class="text-xl font-bold py-5 text-blue-600">Core Features</h2>
        <p>
          Our platform is designed to provide a seamless and efficient ticketing experience.
          <br class="hidden sm:inline-block" />
          Here are some of the key features that make our app stand out.
        </p>
      </div>

      <div
        class="grid grid-cols-1 gap-7 px-2 py-10 z-1 md:px-25 mb-20 sm:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="item in features"
          :key="item.id"
          class="bg-[#1F1C2D]/60 rounded-lg p-5 border border-blue-600"
        >
          <div class="flex items-center gap-3 pb-5 font-bold text-2xl">
            <v-icon :name="item.icon" class="text-blue-600" />
            <h2>{{ item.title }}</h2>
          </div>
          <p>{{ item.desc }}</p>
        </div>
      </div>

      <div
        class="bg-blue-900 absolute w-30 h-40 rounded-full z-0 shadow-3xl blur-3xl -bottom-5 right-5"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { OhVueIcon as VIcon, addIcons } from 'oh-vue-icons'
import { AiNakala } from 'oh-vue-icons/icons'

addIcons(AiNakala)

const features = [
  {
    id: 1,
    icon: 'AiNakala',
    title: 'Easy Ticket Creation',
    desc: 'Create and design tickets in seconds with our user-friendly interface designed for speed and efficiency',
  },
  {
    id: 2,
    icon: 'AiNakala',
    title: 'Real-Time Updates',
    desc: 'Stay informed with live notifications and updates on ticket status, comments, and progress',
  },
  {
    id: 3,
    icon: 'AiNakala',
    title: 'Seamless Collaboration',
    desc: 'Work together with your team to resolve issues quickly and efficiently using shared inboxes and internal notes',
  },
]
</script>
