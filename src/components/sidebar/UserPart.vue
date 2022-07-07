<template>
  <div>
    <div class="text-light">
      <h4>Users</h4>
      <!-- Loading spinner -->
      <div v-if="!userStore.usersLoaded">
        <LoadingSpinner />
      </div>
      <!-- other users -->
      <ul class="nav flex-column" v-else>
        <li :key="user.id" v-for="user in otherUsers">
          <span>
            <img class="img rounded-circle" :src="user.avatar" height="20" />
            <span
              :class="{
                'text-primary': isOnline(user),
                'text-danger': !isOnline(user)
              }"
              >{{ user.name }}</span
            >
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
/* online/offline status */
const isOnline = computed(() => (user) => user.status === 'online')
</script>

<style scoped>
.img {
  margin-right: 10px;
}
</style>
