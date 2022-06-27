import { defineStore } from 'pinia'
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query
} from 'firebase/firestore'

import { db } from '@/js/firebase'

let channelsCollectionRef, channelsCollectionQuery
let unsubscribeSnapshots = null

export const useChannelStore = defineStore('channelStore', {
  state: () => ({
    activeChannel: 0,
    channels: [],
    channelsLoaded: false,
    newChannel: '',
    errors: []
  }),
  actions: {
    clearChannels() {
      this.channels = []
      this.newChannel = ''

      /* unsubscribe from any active listener when logging out */
      if (unsubscribeSnapshots) {
        unsubscribeSnapshots()
      }
    },
    async createChannel() {
      const date = new Date().getTime().toString()
      await addDoc(channelsCollectionRef, {
        content: this.newChannel,
        date
      })
    },
    getChannels() {
      this.channelsLoaded = false

      unsubscribeSnapshots = onSnapshot(
        channelsCollectionQuery,
        (querySnapshot) => {
          let channels = []

          querySnapshot.forEach((doc) => {
            const channel = {
              id: doc.id,
              content: doc.data().content
            }
            channels.push(channel)
          })

          this.channels = channels
          this.channels.length && (this.activeChannel = this.channels[0].id)

          this.channelsLoaded = true
        },
        (error) => {
          console.error(error)
        }
      )
    },
    init() {
      channelsCollectionRef = collection(db, 'channels')
      channelsCollectionQuery = query(channelsCollectionRef, orderBy('date'))

      this.getChannels()
    }
  }
})
