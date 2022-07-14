import { defineStore } from 'pinia'
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp
} from 'firebase/firestore'

import { firestoredb } from '@/js/firebase'
import { nextTick } from 'vue'

import { useAuthStore } from '@/stores/authStore'
import { useChannelStore } from '@/stores/channelStore'

let messagesCollectionRef, messagesCollectionQuery

let unsubscribeMessagesSnapshots = null

export const useMessageStore = defineStore('messageStore', {
  state: () => ({
    errors: [],
    message: '',
    messages: [],
    messagesLoaded: false
  }),
  actions: {
    clearMessages() {
      /* unsubscribe from messages listener when logging out or
      changing channel */
      unsubscribeMessagesSnapshots && unsubscribeMessagesSnapshots()

      this.messages = []
      this.message = ''
      this.messagesLoaded = false
    },

    createMessage(fileURL) {
      const authStore = useAuthStore()
      const author = authStore.user

      const message = {
        author,
        timestamp: serverTimestamp()
      }

      if (fileURL) {
        /* either send message with image */
        message['image'] = fileURL
      } else {
        /* or message with text */
        message['content'] = this.message
      }

      return message
    },

    getMessages() {
      this.messagesLoaded = false

      unsubscribeMessagesSnapshots = onSnapshot(
        messagesCollectionQuery,
        async (querySnapshot) => {
          let messages = []

          querySnapshot.forEach((queryDocumentSnapshot) => {
            const message = {
              id: queryDocumentSnapshot.id,
              ...queryDocumentSnapshot.data()
            }

            messages.push(message)
          })

          this.messages = messages

          this.messagesLoaded = true

          /* to scroll to the last message when loading the page */
          await nextTick(() => {
            // eslint-disable-next-line no-undef
            $('html, body').scrollTop($(document).height())
          })
        },
        (error) => {
          console.log('Error: ', error.message)
          this.errors.push(error)
        }
      )
    },

    init(activeChannel) {
      const channelStore = useChannelStore()

      messagesCollectionRef = channelStore.isPrivate
        ? collection(firestoredb, `privateMessages/${activeChannel}`)
        : collection(
            firestoredb,
            'messages',
            activeChannel,
            'messagesInChannel'
          )

      messagesCollectionQuery = query(
        messagesCollectionRef,
        orderBy('timestamp')
      )

      this.getMessages()
    },

    async sendMessage(fileURL = '') {
      try {
        await addDoc(messagesCollectionRef, this.createMessage(fileURL))

        /* scroll down to show this last new message */
        await nextTick(() => {
          // eslint-disable-next-line no-undef
          $('html, body').scrollTop($(document).height())
        })
      } catch (error) {
        this.errors.push(error)
      }
    }
  }
})
