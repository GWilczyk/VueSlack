import { defineStore } from 'pinia'
import {
  off,
  onChildAdded,
  onChildRemoved,
  onDisconnect,
  onValue,
  ref,
  set
} from 'firebase/database'

import { auth, firebasedb } from '@/js/firebase'

const connectedRef = ref(firebasedb, '.info/connected')
const presenceRef = ref(firebasedb, 'presence')
const usersRef = ref(firebasedb, 'users')

export const useUserStore = defineStore('userStore', {
  state: () => ({
    errors: [],
    users: [],
    usersLoaded: false
  }),
  actions: {
    async addUser(newUser) {
      try {
        await set(ref(firebasedb, 'users/' + newUser.id), newUser)
      } catch (error) {
        console.error('Error: ', error.message)
        this.errors.push(error)
      }
    },

    clearUsers() {
      /* unsubscribe from users listeners when logging out */
      off(usersRef)
      off(presenceRef)
      off(connectedRef)
      this.users = []
      this.usersLoaded = false
    },

    /* handle user's status (online/offline) */
    handleUserStatus(userId, connected = true) {
      const userIndex = this.users.findIndex((user) => user.id === userId)

      if (userIndex !== -1) {
        this.users[userIndex].status = connected ? 'online' : 'offline'
      }
    },

    init() {
      /* manage online/offline status */
      onValue(connectedRef, (snapshot) => {
        if (snapshot.val()) {
          /* We are connected (or reconnected)! */
          set(ref(firebasedb, `presence/${auth.currentUser.uid}`), true)

          onDisconnect(
            ref(firebasedb, `presence/${auth.currentUser.uid}`)
          ).remove()
        }
      })

      onChildAdded(usersRef, (data) => {
        this.usersLoaded = false
        this.users.push(data.val())
        this.usersLoaded = true
      })

      onChildRemoved(usersRef, (data) => {
        this.usersLoaded = false
        const indexOfUserToRemove = this.users.findIndex(
          (user) => user.id === data.val().id
        )

        this.users.splice(indexOfUserToRemove, 1)
        this.usersLoaded = true
      })

      onChildAdded(presenceRef, (snapshot) => {
        if (auth.currentUser.uid !== snapshot.key) {
          this.handleUserStatus(snapshot.key)
        }
      })

      onChildRemoved(presenceRef, (snapshot) => {
        if (auth.currentUser.uid !== snapshot.key) {
          this.handleUserStatus(snapshot.key, false)
        }
      })
    },

    removeUser() {
      try {
        set(ref(firebasedb, `presence/${auth.currentUser.uid}`), {})
      } catch (error) {
        console.error('Error: ', error.message)
        this.errors.push(error)
      }
    }
  }
})
