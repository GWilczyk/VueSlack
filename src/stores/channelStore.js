import { defineStore } from 'pinia'
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query
} from 'firebase/firestore'

import { db } from '@/js/firebase'
import { useMessageStore } from '@/stores/messageStore'

let channelsCollectionRef, channelsCollectionQuery
let unsubscribeChannelsSnapshots = null

export const useChannelStore = defineStore('channelStore', {
  state: () => ({
    activeChannel: 0,
    channels: [],
    channelsLoaded: false,
    errors: [],
    newChannel: ''
  }),
  actions: {
    clearChannels() {
      /* unsubscribe from channels listener when logging out */
      if (unsubscribeChannelsSnapshots) {
        unsubscribeChannelsSnapshots()
      }

      this.channels = []
      this.newChannel = ''
      this.channelsLoaded = false
      this.activeChannel = 0
    },

    async createChannel() {
      try {
        const date = new Date().getTime().toString()
        await addDoc(channelsCollectionRef, {
          content: this.newChannel,
          date
        })
      } catch (error) {
        console.error('Error: ', error.message)
        this.errors.push(error)
      }
    },

    getChannels() {
      const messageStore = useMessageStore()

      this.channelsLoaded = false

      unsubscribeChannelsSnapshots = onSnapshot(
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
          if (this.channels.length) {
            /* initialize active channel */
            this.activeChannel = this.channels[0].id
            /* initialize message store */
            this.channels.length && messageStore.init(this.activeChannel)
          }

          this.channelsLoaded = true
        },
        (error) => {
          console.error('Error: ', error.message)
          this.errors.push(error)
        }
      )
    },

    init() {
      channelsCollectionRef = collection(db, 'channels')
      channelsCollectionQuery = query(channelsCollectionRef, orderBy('date'))

      this.getChannels()
    }
  },
  getters: {
    isChannelActive: (state) => (channelId) =>
      channelId === state.activeChannel,
    changeChannel: (state) => (channelId) => {
      const messageStore = useMessageStore()
      messageStore.clearMessages()

      state.activeChannel = channelId

      messageStore.init(channelId)
    }
  }
})
