<template>
  <button class="btn btn-outline-primary" @click="toggleModal">
    Add Channel
  </button>

  <!-- Show list of channels -->
  <div class="mt-4">
    <button
      class="list-group-item list-group-item-action"
      :class="{ active: isChannelActive(channel) }"
      @click="setActiveChannel(channel)"
      :key="channel.id"
      type="button"
      v-for="channel in channels"
    >
      {{ channel.channelName }}
    </button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import { getDatabase, off, onChildAdded, ref } from '@firebase/database'
import {
  CREATE_CHANNEL_RESET,
  CURRENT_CHANNEL_RESET,
  CURRENT_CHANNEL_SET,
  PUSH_CHANNEL_TO_CHANNELS,
  SHOW_CHANNEL_MODAL
} from '@/store/mutation-types'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Channels',
  computed: {
    ...mapState(['channels', 'currentChannel', 'showModal'])
  },
  methods: {
    ...mapActions([
      CREATE_CHANNEL_RESET,
      CURRENT_CHANNEL_RESET,
      CURRENT_CHANNEL_SET,
      PUSH_CHANNEL_TO_CHANNELS,
      SHOW_CHANNEL_MODAL
    ]),

    addChannelsListener: function () {
      const database = getDatabase()
      const channelsRef = ref(database, 'channels')

      onChildAdded(channelsRef, (snapshot) => {
        this.PUSH_CHANNEL_TO_CHANNELS(snapshot.val())
        this.CURRENT_CHANNEL_RESET()
      })
    },

    isChannelActive: function (channel) {
      return channel.id === this.currentChannel.id
    },

    removeChannelsListener: function () {
      const database = getDatabase()
      const channelsRef = ref(database, 'channels')

      off(channelsRef)
    },

    setActiveChannel: function (channel) {
      this.CURRENT_CHANNEL_SET(channel)
    },

    toggleModal: function () {
      /* Resets modal input when closing */
      this.showModal && this.CREATE_CHANNEL_RESET()
      this.SHOW_CHANNEL_MODAL()
    }
  },
  mounted() {
    this.addChannelsListener()
  },
  beforeUnmount() {
    this.removeChannelsListener()
  }
}
</script>

<style scoped>
button.active {
  z-index: 0;
}
</style>
