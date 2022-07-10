import { defineStore } from 'pinia'
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query
} from 'firebase/firestore'

import { firestoredb } from '@/js/firebase'

import { useAuthStore } from '@/stores/authStore'
import { useMessageStore } from '@/stores/messageStore'

let channelsCollectionRef, channelsCollectionQuery
let unsubscribeChannelsSnapshots = null

export const useChannelStore = defineStore('channelStore', {
  state: () => ({
    activeChannel: 0,
    channel: null,
    channels: [],
    channelsLoaded: false,
    errors: [],
    isPrivate: false,
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

    createPrivateChannel(user) {
      const date = new Date().getTime().toString()
      const channelId = this.getChannelId(user.id)

      const channel = {
        content: user.name,
        date,
        id: channelId
      }

      this.setPrivate(true)
      this.changeChannel(channel)
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
            this.channel = this.channels[0]
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

    getChannelId(userId) {
      const authStore = useAuthStore()

      /* use this format to create channel smallerUserId/biggerUserId */
      return userId < authStore.user.id
        ? `${userId}/${authStore.user.id}`
        : `${authStore.user.id}/${userId}`
    },

    init() {
      channelsCollectionRef = collection(firestoredb, 'channels')
      channelsCollectionQuery = query(channelsCollectionRef, orderBy('date'))

      this.getChannels()
    }
  },
  getters: {
    changeChannel: (state) => (channel) => {
      const messageStore = useMessageStore()

      messageStore.clearMessages()

      state.activeChannel = channel.id
      state.channel = channel

      messageStore.init(channel.id)
    },

    getChannelName: (state) => (channel) => {
      if (channel !== null) {
        return state.isPrivate
          ? `@ ${channel?.content}`
          : `# ${channel?.content}`
      }
    },

    isChannelActive: (state) => (channelId) =>
      channelId === state.activeChannel,

    setPrivate: (state) => (privacy) => (state.isPrivate = privacy)
  }
})
