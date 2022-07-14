<template>
  <button
    class="btn btn-outline-primary"
    @click.prevent="modal.addChannel = true"
  >
    Add Channel
  </button>

  <!-- Show list of channels -->
  <div class="mt-4">
    <!-- Loading spinner -->
    <div v-if="!channelStore.channelsLoaded">
      <LoadingSpinner />
    </div>

    <button
      class="list-group-item list-group-item-action"
      :class="{ active: channelStore.isChannelActive(channel.id) }"
      @click="handleClick(channel)"
      :key="channel.id"
      type="button"
      v-for="channel in channelStore.channels"
      v-else
    >
      {{ channel.content }}
    </button>
  </div>

  <!-- modal to add new channel -->
  <teleport to="#modal-container">
    <ChannelModal v-if="modal.addChannel" v-model="modal.addChannel" />
  </teleport>
</template>

<script setup>
/* imports */
import { reactive } from 'vue'
import { useChannelStore } from '@/stores/channelStore'

import ChannelModal from '@/components/modals/ChannelModal.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
/* store */
const channelStore = useChannelStore()
/* modal */
const modal = reactive({
  addChannel: false
})
/* handle click */
const handleClick = (channel) => {
  channelStore.setPrivate(false)
  channelStore.changeChannel(channel)
}
</script>

<style scoped>
button.active {
  z-index: 0;
}
</style>
