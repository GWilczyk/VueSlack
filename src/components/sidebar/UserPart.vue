<template>
  <div>
    <div class="text-light">
      <h4>Users</h4>
      <!-- Loading spinner -->
      <div v-if="!userStore.usersLoaded">
        <LoadingSpinner />
      </div>

      <ul class="nav flex-column" v-else>
        <li :key="user.id" v-for="user in otherUsers">
          <span>
            <img class="img rounded-circle" :src="user.avatar" height="20" />
            <span class="text-primary">{{ user.name }}</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
/* imports */
import { computed } from 'vue'

import { useAuthStore } from '@/stores/authStore'
import { useUserStore } from '@/stores/userStore'

import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
/* store */
const authStore = useAuthStore()
const userStore = useUserStore()
/* other users */
const otherUsers = computed(() =>
  userStore.users.filter((user) => user.id !== authStore.user.id)
)
</script>

<style scoped>
.img {
  margin-right: 10px;
}
</style>
