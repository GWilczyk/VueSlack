<template>
  <div class="modal-container" v-if="showModal">
    <div class="overlay" @click="toggleModal"></div>

    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <!-- Header -->
        <div class="modal-header">
          <h5 class="modal-title text-dark">Modal title</h5>
          <button
            aria-label="Close"
            class="btn-close"
            @click="toggleModal"
            data-dismiss="modal"
            type="button"
          ></button>
        </div>
        <!-- Body -->
        <div class="modal-body">
          <form>
            <div class="form-group">
              <input
                class="form-control"
                id="new_channel"
                name="new_channel"
                placeholder="Channel name…"
                type="text"
                :value="channel"
                @change="handleChannel"
              />
            </div>
            <!-- Errors status -->
            <ul class="list-group" v-if="this.hasErrors">
              <li
                class="list-group-item text-danger"
                :key="index"
                v-for="(error, index) in this.$store.state.errors"
              >
                {{ error.message }}
              </li>
            </ul>
          </form>
        </div>
        <!-- Footer -->
        <div class="modal-footer">
          <button class="btn btn-secondary" type="button" @click="toggleModal">
            Cancel
          </button>
          <button class="btn btn-primary" type="button" @click="createChannel">
            Add Channel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { child, getDatabase, push, ref, update } from 'firebase/database'

import {
  CREATE_CHANNEL_FAILED,
  CREATE_CHANNEL_REQUEST,
  CREATE_CHANNEL_SUCCESS,
  HANDLE_CHANNEL
} from '@/store/mutation-types'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Modal',
  props: ['showModal', 'toggleModal'],
  computed: {
    ...mapGetters(['hasErrors', 'isLoading']),
    ...mapState({
      channel: (state) => state.channel
    })
  },
  methods: {
    ...mapActions([
      CREATE_CHANNEL_FAILED,
      CREATE_CHANNEL_REQUEST,
      CREATE_CHANNEL_SUCCESS,
      HANDLE_CHANNEL
    ]),

    createChannel: async function () {
      try {
        this.CREATE_CHANNEL_REQUEST()

        const db = getDatabase()

        const newChannelKey = push(child(ref(db), 'channels')).key

        const updates = {}
        updates['/channels/' + newChannelKey] = {
          id: newChannelKey,
          channelName: this.channel
        }

        await update(ref(db), updates)

        await this.CREATE_CHANNEL_SUCCESS()
        this.toggleModal()
      } catch (error) {
        this.CREATE_CHANNEL_FAILED(error)
      }
    },

    handleChannel: function (event) {
      this.HANDLE_CHANNEL(event.target.value)
    }
  }
}
</script>

<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
}
</style>
