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
      v-for="channel in getChannels"
    >
      {{ channel.channelName }}
    </button>
  </div>

  <!-- Modal Dialog -->
  <modal-dialog
    :showModal="showModal"
    :toggleModal="toggleModal"
  ></modal-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import ModalDialog from '@/components/ModalDialog'
import { getDatabase, off, onChildAdded, ref } from '@firebase/database'
import {
  CREATE_CHANNEL_RESET,
  CURRENT_CHANNEL_RESET,
  CURRENT_CHANNEL_SET,
  PUSH_CHANNEL_TO_CHANNELS
} from '@/store/mutation-types'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Channels',
  data() {
    return {
      showModal: false
    }
  },
  components: {
    'modal-dialog': ModalDialog
  },
  computed: {
    ...mapGetters(['getChannels', 'getCurrentChannel'])
  },
  methods: {
    ...mapActions([
      CREATE_CHANNEL_RESET,
      CURRENT_CHANNEL_RESET,
      CURRENT_CHANNEL_SET,
      PUSH_CHANNEL_TO_CHANNELS
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
      return channel.id === this.getCurrentChannel.id
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
      this.showModal = !this.showModal
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

<style scoped></style>
