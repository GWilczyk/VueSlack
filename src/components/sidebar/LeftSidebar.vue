<template>
  <div>
    <h2 class="text-light">VueSlack</h2>

    <hr />

    <div class="user-details">
      <img
        alt="User picture"
        class="rounded-circle"
        height="30"
        :src="authStore.user.avatar"
        referrerpolicy="origin"
      />
      <span class="text-light">{{ authStore.user.name }}</span>
    </div>

    <hr />

    <button class="btn btn-outline-light" @click="authStore.logoutUser">
      Logout
    </button>

    <hr />

    <ChannelPart />

    <hr />

    <UserPart />
  </div>
</template>

<script setup>
/* imports */
import { useAuthStore } from '@/stores/authStore'

import ChannelPart from '@/components/sidebar/ChannelPart.vue'
import UserPart from '@/components/sidebar/UserPart.vue'
/* store */
const authStore = useAuthStore()
</script>

<style scoped>
hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 1px solid #f1f1f1;
}
img {
  margin-right: 10px;
}
.user-details {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
