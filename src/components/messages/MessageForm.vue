<template>
  <div class="message-form">
    <form>
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

  if (channelStore.activeChannel !== null && messageStore.message.length > 0) {
    messageStore.sendMessage({
      author,
      activeChannel: channelStore.activeChannel
    })

    messageStore.message = ''
  }
}
</script>

<!--
<script>
import { getCurrentInstance } from 'vue'

import { mapActions, mapGetters } from 'vuex'
import { HANDLE_MESSAGE } from '@/store/mutation-types'
import { push, serverTimestamp, set } from '@firebase/database'

export default {
  name: 'MessageForm',
  computed: {
    // ...mapState(['message']),
    ...mapGetters(['currentChannel', 'currentUser'])
  },
  setup() {
    const instance = getCurrentInstance()
    const { messagesRef } = instance.parent.data

    const sendMessage = () => {
      const newMessage = {
        content: this.message,
        timestamp: serverTimestamp(),
        user: {
          avatar: this.currentUser.photoURL,
          name: this.currentUser.displayName,
          id: this.currentUser.uid
        }
      }
      if (this.currentChannel !== null && this.message.length > 0) {
        const newMessageRef = push(messagesRef)
        set(newMessageRef, newMessage)
      }
    }

    return sendMessage
  },
  // computed: {
  //   ...mapState(['message']),
  //   ...mapGetters(['currentChannel', 'currentUser'])
  // },
  methods: {
    ...mapActions([HANDLE_MESSAGE]),
    handleMessage: function (event) {
      this.HANDLE_MESSAGE(event.target.value)
    }
    // sendMessage: function () {
    //   const newMessage = {
    //     content: this.message,
    //     timestamp: serverTimestamp(),
    //     user: {
    //       avatar: this.currentUser.photoURL,
    //       name: this.currentUser.displayName,
    //       id: this.currentUser.uid
    //     }
    //   }
    //   console.log('🚀 ~ file: index.vue ~ line 75 ~ newMessage', newMessage)
    //   const instance = getCurrentInstance()
    //   const { messagesRef } = instance.parent.data

    //   if (this.currentChannel !== null && this.message.length > 0) {
    //     const newMessageRef = push(messagesRef)
    //     set(newMessageRef, newMessage)
    //   }
    // }
  }
}
</script>
-->

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
