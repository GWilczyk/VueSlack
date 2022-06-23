import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView'
import LoginView from '@/views/LoginView'

const routes = [
  {
    path: '/',
    name: 'chat',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
