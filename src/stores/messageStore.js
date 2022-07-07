import { defineStore } from 'pinia'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc
} from 'firebase/firestore'

import { firestoredb } from '@/js/firebase'
import { nextTick } from 'vue'

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
      /* unsubscribe from messages listener when logging out */
      if (unsubscribeMessagesSnapshots) {
        unsubscribeMessagesSnapshots()
      }
      this.messages = []
      this.message = ''
      this.messagesLoaded = false
    },
    getMessages() {
      this.messagesLoaded = false

      unsubscribeMessagesSnapshots = onSnapshot(
        messagesCollectionQuery,
        async (querySnapshot) => {
          let messages = []

          querySnapshot.forEach((msg) => {
            const message = {
              id: msg.id,
              ...msg.data()
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
      messagesCollectionRef = collection(
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

    async sendMessage({ author, activeChannel }) {
      try {
        const newMessage = {
          author,
          content: this.message,
          timestamp: serverTimestamp()
        }
        /* check if 'activeChannel' document exists */
        const docRef = doc(firestoredb, 'messages', activeChannel)
        const docSnap = await getDoc(docRef)
        if (!docSnap.exists()) {
          await setDoc(docRef, {})
        }
        await addDoc(
          collection(
            firestoredb,
            'messages',
            activeChannel,
            'messagesInChannel'
          ),
          newMessage
        )

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
