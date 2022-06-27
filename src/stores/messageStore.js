import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc
} from 'firebase/firestore'
import { defineStore } from 'pinia'

import { db } from '@/js/firebase'

let messagesCollectionRef

export const useMessageStore = defineStore('messageStore', {
  state: () => ({
    message: '',
    messages: [],
    errors: []
  }),
  actions: {
    async sendMessage({ author, activeChannel }) {
      const newMessage = {
        content: this.message,
        timestamp: serverTimestamp(),
        author
      }

      messagesCollectionRef = collection(db, 'messages')
      /* check if activeChannel document exists in 'messages' collection */
      const docRef = doc(messagesCollectionRef, activeChannel)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        /* create activeChannel document in 'messages' collection */
        await setDoc(doc(messagesCollectionRef, activeChannel), {})
      }

      /* create sub-collection 'messagesInChannel' and put newMessage into it */
      await addDoc(collection(docRef, 'messagesInChannel'), newMessage)
    }
  }
})
