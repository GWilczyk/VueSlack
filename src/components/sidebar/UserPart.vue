<template>
  <div>
    <div class="text-light">
      <h4>Users</h4>
      <!-- Loading spinner -->
      <div v-if="!userStore.usersLoaded">
        <LoadingSpinner />
      </div>
      <!-- other users -->

      <div class="mt-4" v-else>
        <button
          class="list-group-item list-group-item-action"
          :class="{ active: isActive(user.id) }"
          @click.prevent="channelStore.createPrivateChannel(user)"
          :key="user.id"
          type="button"
          v-for="user in otherUsers"
        >
          <i
            :class="{
              'fa fa-circle online': isOnline(user),
              'fa fa-circle offline': !isOnline(user)
            }"
            aria-hidden="true"
          ></i>
          <span>
            <img class="img rounded-circle" :src="user.avatar" height="20" />
            <span
              ><a :class="{ 'text-light': isActive(user.id) }" href="#">{{
                user.name
              }}</a></span
            >
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
/* imports */
import { computed } from 'vue'

import { useAuthStore } from '@/stores/authStore'
import { useChannelStore } from '@/stores/channelStore'
import { useUserStore } from '@/stores/userStore'

import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
/* store */
const authStore = useAuthStore()
const channelStore = useChannelStore()
const userStore = useUserStore()
/* other users */
const otherUsers = computed(() =>
  userStore.users.filter((user) => user.id !== authStore.user.id)
)
/* online/offline status */
const isOnline = computed(() => (user) => user.status === 'online')
/* private messaging */
const isActive = computed(
  () => (userId) =>
    channelStore.activeChannel === channelStore.getChannelId(userId)
)
</script>

<style scoped>
.img {
  margin-left: 10px;
  margin-right: 10px;
}
.offline {
  color: red;
}
.online {
  color: green;
}
</style>
