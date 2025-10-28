import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/SignupView.vue'),
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/ticket-management',
      name: 'ticket-management',
      component: () => import('../views/TicketManagementView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from) => {
  const session = localStorage.getItem('session')
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !session) {
    return {
      name: 'login',
      // Store the path so the user can be redirected back after logging in
      query: { redirect: to.fullPath },
    }
  }

  // If the user is authenticated and tries to go to the login or register page, redirect to the dashboard
  if (session && (to.name === 'login' || to.name === 'register')) {
    return { name: 'user' }
  }
})

export default router
