<template>
  <button class="btn btn-outline-primary" @click="modal.addChannel = true">
    Add Channel
  </button>

  <!-- Show list of channels -->
  <div class="mt-4">
    <!-- Loading spinner -->
    <div class="text-center" v-if="!channelStore.channelsLoaded">
      <div class="spinner-border text-primary" role="status" />
    </div>

    <button
      class="list-group-item list-group-item-action"
      :class="{ active: isChannelActive(channel.id) }"
      @click="setChannelActive(channel.id)"
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
/* store */
const channelStore = useChannelStore()
/* modal */
const modal = reactive({
  addChannel: false
})
/* handle active channel display */
const isChannelActive = (channelId) => channelId === channelStore.activeChannel

const setChannelActive = (channelId) => (channelStore.activeChannel = channelId)

// export default {
//   computed: {
//     ...mapState(['channels', 'currentChannel', 'showModal'])
//   },
//   methods: {

//     addChannelsListener: function () {
//       const database = getDatabase()
//       const channelsRef = ref(database, 'channels')

//       onChildAdded(channelsRef, (snapshot) => {
//         this.PUSH_CHANNEL_TO_CHANNELS(snapshot.val())
//         this.CURRENT_CHANNEL_RESET()
//       })
//     },

//     removeChannelsListener: function () {
//       const database = getDatabase()
//       const channelsRef = ref(database, 'channels')

//       off(channelsRef)
//     },
//   },
//   mounted() {
//     this.addChannelsListener()
//   },
//   beforeUnmount() {
//     this.removeChannelsListener()
//   }
// }
</script>

<style scoped>
button.active {
  z-index: 0;
}
</style>
