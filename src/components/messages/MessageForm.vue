<template>
  <div class="message-form">
    <!-- file upload progress bar -->
    <div class="progress" v-if="fileUploadStore.uploadState">
      <div
        class="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        :style="progressStyle"
      >
        {{ uploadLabel }}
      </div>
    </div>

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
          <button
            class="btn btn-warning my-3"
            type="button"
            @click.prevent="modal.uploadFile = true"
            :disabled="fileUploadStore.uploadState === 'uploading'"
          >
            Upload
          </button>
        </div>
      </div>
    </form>
  </div>

  <!-- modal to upload a file -->
  <teleport to="#modal-container">
    <FileUploadModal v-if="modal.uploadFile" v-model="modal.uploadFile" />
  </teleport>
</template>

<script setup>
/* imports */
import { computed, onBeforeUnmount, reactive } from 'vue'
import { useChannelStore } from '@/stores/channelStore'
import { useFileUploadStore } from '@/stores/fileUploadStore'
import { useMessageStore } from '@/stores/messageStore'

import FileUploadModal from '@/components/modals/FileUploadModal.vue'

/* store */
const channelStore = useChannelStore()
const fileUploadStore = useFileUploadStore()
const messageStore = useMessageStore()

/* modal */
const modal = reactive({
  uploadFile: false
})

/* send message */
const sendMessage = () => {
  channelStore.activeChannel !== null &&
    messageStore.message.trim().length > 0 &&
    messageStore.sendMessage()

  /* reset message input */
  messageStore.message = ''
}

/* upload label */
const uploadLabel = computed(() => {
  switch (fileUploadStore.uploadState) {
    case 'uploading':
      return 'Uploading…'
    case 'error':
      return 'Error occurred!'
    case 'done':
      return 'Upload completed!'
    default:
      return ''
  }
})

/* progress style */
const progressStyle = computed(() => `width: ${fileUploadStore.progress}%`)

/* remove uploading listener */
onBeforeUnmount(() => {
  if (fileUploadStore.uploadTask !== null) {
    fileUploadStore.uploadTask.cancel()
    fileUploadStore.uploadTask = null
  }
})
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
  margin-bottom: -20px;
  margin-left: 33%;
}
.progress {
  border-radius: 0;
  margin-bottom: -16px;
  height: 36px;
}
input,
button {
  height: 50px;
  border-radius: 0;
}
</style>
