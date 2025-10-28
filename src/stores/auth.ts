import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const session = ref(localStorage.getItem('session'))

  function setSession(newSession: string | null) {
    session.value = newSession
    if (newSession) {
      localStorage.setItem('session', newSession)
    } else {
      localStorage.removeItem('session')
    }
  }

  function getSession() {
    return session.value
  }

  return { session, setSession, getSession }
})
