import { createApp } from 'vue'
import App from '@/components/App.vue'

import router from '@/router'

import store from '@/store'
import { USER_LOGIN_SUCCESS } from '@/store/mutation-types'

import { authInstance } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

let app

const unsubscribe = onAuthStateChanged(authInstance, (user) => {
  if (!app) {
    app = createApp(App).use(store).use(router).mount('#app')
  }

  if (user) {
    store.dispatch(USER_LOGIN_SUCCESS, user)
  }

  unsubscribe()
})
