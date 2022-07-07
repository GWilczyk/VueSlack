<template>
  <div class="message-form">
    <form @submit.prevent="sendMessage">
      <div class="input-group">
        <input
          class="form-control my-3"
          id="message"
          name="message"
          placeholder="Write your text…"
          type="text"
          v-model.trim="messageStore.message"
        />

        <div class="input-group-append">
          <button
            class="btn btn-primary px-4 my-3"
            @click="sendMessage"
            type="button"
          >
            Send
          </button>
        </div>

        <div class="input-group-append">
          <button class="btn btn-warning my-3" type="button">Upload</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
/* imports */

import { useAuthStore } from '@/stores/authStore'
import { useChannelStore } from '@/stores/channelStore'
import { useMessageStore } from '@/stores/messageStore'
/* store */
const authStore = useAuthStore()
const channelStore = useChannelStore()
const messageStore = useMessageStore()
/* send message */
const sendMessage = () => {
  const author = authStore.user
  const activeChannel = channelStore.activeChannel

  if (
    channelStore.activeChannel !== null &&
    messageStore.message.trim().length > 0
  ) {
    messageStore.sendMessage({
      author,
      activeChannel
    })

    /* reset message input */
    messageStore.message = ''
  }
}
</script>

<style scoped>
.message-form {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 67%;
  z-index: 100;
  color: #fff;
  text-align: center;
  margin-bottom: -16px;
  margin-left: 33%;
}
input,
button {
  height: 50px;
  border-radius: 0;
}
</style>
