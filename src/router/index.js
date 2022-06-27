import { createRouter, createWebHashHistory } from 'vue-router'

import { useAuthStore } from '@/stores/authStore'

import HomeView from '@/views/HomeView.vue'
import AuthView from '@/views/AuthView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

/* navigation guard */
router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  if (authStore.user.id && to.name === 'auth') {
    return false
  }

  if (!authStore.user.id && to.name !== 'auth') {
    return {
      name: 'auth'
    }
  }
})

export default router
