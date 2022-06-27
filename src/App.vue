<script setup>
/* imports */
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useChannelStore } from '@/stores/channelStore'
/* manage user authentication */
const authStore = useAuthStore()
onMounted(() => authStore.init())
/* Retrieve channels */
const channelStore = useChannelStore()
onMounted(() => channelStore.init())
</script>

<template>
  <RouterView />
</template>
