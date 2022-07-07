import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'

// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'

import { auth } from '@/js/firebase'

const pinia = createPinia()
pinia.use(({ store }) => (store.router = markRaw(router)))

let app

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(pinia).use(router).mount('#app')
  }
})
