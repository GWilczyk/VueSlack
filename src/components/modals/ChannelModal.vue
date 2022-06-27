/* eslint-disable no-undef */
<template>
  <div class="modal-container" v-if="props.modelValue">
    <div class="overlay"></div>

    <div
      class="modal-dialog modal-dialog-centered"
      role="document"
      ref="modalRef"
    >
      <div class="modal-content">
        <!-- Header -->
        <div class="modal-header">
          <h5 class="modal-title text-dark">Create A Channel</h5>
          <button
            aria-label="Close"
            class="btn-close"
            @click="closeModal"
            data-dismiss="modal"
            type="button"
          ></button>
        </div>
        <!-- Body -->
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <input
                class="form-control"
                id="new_channel"
                name="new_channel"
                placeholder="Channel name…"
                type="text"
                v-model="channelStore.newChannel"
                v-autofocus
              />
            </div>
            <!-- Errors status -->
            <ul class="list-group" v-if="channelStore.errors.length">
              <li
                class="list-group-item text-danger"
                :key="index"
                v-for="(error, index) in channelStore.errors"
              >
                {{ error.message }}
              </li>
            </ul>
          </form>
        </div>
        <!-- Footer -->
        <div class="modal-footer">
          <button class="btn btn-secondary" type="button" @click="closeModal">
            Cancel
          </button>
          <button class="btn btn-primary" type="button" @click="handleSubmit">
            Add Channel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* imports */
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { vAutofocus } from '@/directives/vAutofocus'

import { useChannelStore } from '@/stores/channelStore'
/* store */
const channelStore = useChannelStore()
/* props */
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
/* emits */
const emit = defineEmits(['update:modelValue'])
/* close modal */
const closeModal = () => {
  channelStore.newChannel = ''
  emit('update:modelValue', false)
}
/* click outside to close modal */
const modalRef = ref(null)
onClickOutside(modalRef, closeModal)
/* add new channel */
const handleSubmit = () => {
  channelStore.createChannel()
  channelStore.newChannel = ''
  closeModal()
}
</script>

<!--
<script>
import { child, getDatabase, push, ref, update } from 'firebase/database'

export default {
  methods: {
   
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
        this.closeModal()
      } catch (error) {
        this.CREATE_CHANNEL_FAILED(error)
      }
    },

    handleChannel: function (event) {
      this.HANDLE_CHANNEL(event.target.value)
    },   
  }
}
</script>
-->

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
  z-index: 120;
}
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 120;
}
.modal-content {
  z-index: 140;
}
</style>
