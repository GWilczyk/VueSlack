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

import { db } from '@/js/firebase'

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
    async getMessages() {
      this.messagesLoaded = false

      unsubscribeMessagesSnapshots = onSnapshot(
        messagesCollectionQuery,
        (querySnapshot) => {
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
        },
        (error) => {
          console.log('Error: ', error.message)
          this.errors.push(error)
        }
      )
    },

    init(activeChannel) {
      messagesCollectionRef = collection(
        db,
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
        const docRef = doc(db, 'messages', activeChannel)
        const docSnap = await getDoc(docRef)

        if (!docSnap.exists()) {
          await setDoc(docRef, {})
        }

        await addDoc(
          collection(db, 'messages', activeChannel, 'messagesInChannel'),
          newMessage
        )
      } catch (error) {
        this.errors.push(error)
      }
    }
  }
})
