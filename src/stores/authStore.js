import { defineStore } from 'pinia'

import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from 'firebase/auth'

import { auth } from '@/js/firebase'
import { useChannelStore } from '@/stores/channelStore'
import { useMessageStore } from '@/stores/messageStore'
import { useUserStore } from '@/stores/userStore'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    errors: [],
    user: {},
    userLoaded: true
  }),
  actions: {
    init() {
      const channelStore = useChannelStore()
      const userStore = useUserStore()

      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = {
            avatar: user.photoURL,
            name: user.displayName,
            id: user.uid
          }
          /* add user to 'users' Firestore database */
          userStore.init()
          userStore.addUser(this.user)
          /* retrieve channels */
          channelStore.init()
          /* route to home view */
          this.router.push('/')
        } else {
          this.user = {}
          this.userLoaded = true
          this.router.push('/auth')
        }
      })
    },

    async loginWithFacebook() {
      try {
        this.userLoaded = false

        const provider = new FacebookAuthProvider()
        await signInWithPopup(auth, provider)
      } catch (error) {
        console.error(error)
        this.errors.push(error)
      } finally {
        this.userLoaded = true
      }
    },

    async loginWithGoogle() {
      try {
        this.userLoaded = false

        const provider = new GoogleAuthProvider()
        await signInWithPopup(auth, provider)

        // const { user } = await signInWithPopup(auth, provider)
        // const { displayName, photoURL, uid } = user

        // this.addUser({ avatar: photoURL, id: uid, name: displayName })
      } catch (error) {
        console.error(error)
        this.errors.push(error)
      } finally {
        this.userLoaded = true
      }
    },

    async logoutUser() {
      try {
        const channelStore = useChannelStore()
        const messageStore = useMessageStore()
        const userStore = useUserStore()

        messageStore.clearMessages()
        channelStore.clearChannels()
        userStore.removeUser(this.user.id.toString())
        userStore.clearUsers()

        await signOut(auth)
      } catch (error) {
        console.error('Error: ', error.message)
      }
    }
  }
})
