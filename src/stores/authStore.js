import { defineStore } from 'pinia'

import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from 'firebase/auth'

import { auth } from '@/js/firebase'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: {},
    isLoading: false,
    errors: []
  }),
  actions: {
    init() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = {
            avatar: user.photoURL,
            displayName: user.displayName,
            id: user.uid
          }

          this.router.push('/')
        } else {
          this.user = {}
          this.router.replace('/auth')
        }
      })
    },
    async loginWithFacebook() {
      try {
        this.isLoading = true
        const provider = new FacebookAuthProvider()
        await signInWithPopup(auth, provider)
        this.isLoading = false
      } catch (error) {
        console.error(error)
        this.errors.push(error)
        this.isLoading = false
      }
    },
    async loginWithGoogle() {
      try {
        this.isLoading = true
        const provider = new GoogleAuthProvider()
        await signInWithPopup(auth, provider)
        this.isLoading = false
      } catch (error) {
        console.error(error)
        this.errors.push(error)
        this.isLoading = false
      }
    },
    async logoutUser() {
      try {
        await signOut(auth)
      } catch (error) {
        console.error(error)
      }
    }
  }
})
