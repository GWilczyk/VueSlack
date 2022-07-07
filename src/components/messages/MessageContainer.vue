<template>
  <div>
    <div class="mt-3 mb-5">
      <!-- Loading spinner -->
      <div v-if="!messageStore.messagesLoaded">
        <LoadingSpinner />
      </div>

      <SingleMessage
        :key="message.id"
        :message="message"
        v-for="message in messageStore.messages"
        v-else
      />
    </div>

    <MessageForm />
  </div>
</template>

<script setup>
/* imports */
import { onBeforeUnmount } from 'vue'
import { useMessageStore } from '@/stores/messageStore'

import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import MessageForm from '@/components/messages/MessageForm.vue'
import SingleMessage from '@/components/messages/SingleMessage.vue'
/* stores */
const messageStore = useMessageStore()

onBeforeUnmount(() => {
  messageStore.clearMessages()
})
</script>

<style scoped></style>
