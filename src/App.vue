<script setup>
/* imports */
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
/* manage user authentication */
const authStore = useAuthStore()

onMounted(() => authStore.init())
// onMounted(() => {
//   userStore.init()
//   authStore.init()
// })
</script>

<template>
  <RouterView />
</template>
