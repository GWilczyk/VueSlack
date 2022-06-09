import { createRouter, createWebHistory } from 'vue-router'

import ChatView from '@/components/views/ChatView'
import LoginView from '@/components/views/LoginView'

import { authInstance } from '@/firebase'

const routes = [
  {
    path: '/',
    name: 'chat',
    component: ChatView,
    beforeEnter: (to, from, next) => {
      if (!authInstance.currentUser) {
        next('/login')
      } else {
        next()
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    beforeEnter: (to, from, next) => {
      if (authInstance.currentUser) {
        /* Reject the navigation */
        return false
      } else {
        next()
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
