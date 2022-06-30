import { defineStore } from 'pinia'
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc
} from 'firebase/firestore'

import { db } from '@/js/firebase'

let usersCollectionRef, usersCollectionQuery
let unsubscribeUsersSnapshots = null

export const useUserStore = defineStore('userStore', {
  state: () => ({
    errors: [],
    users: [],
    usersLoaded: false
  }),
  actions: {
    async addUser(user) {
      const newUser = { ...user, status: 'offline' }
      await setDoc(doc(db, 'users', user.id), newUser)
    },

    clearUsers() {
      /* unsubscribe from users listener when logging out */
      if (unsubscribeUsersSnapshots) {
        unsubscribeUsersSnapshots()
      }
      this.users = []
      this.usersLoaded = false
    },

    getUsers() {
      this.usersLoaded = false

      unsubscribeUsersSnapshots = onSnapshot(
        usersCollectionQuery,
        (querySnapshot) => {
          let users = []

          querySnapshot.forEach((doc) => users.push(doc.data()))

          this.users = users
          this.usersLoaded = true
        },
        (error) => {
          console.error('Error: ', error.message)
          this.errors.push(error)
        }
      )
    },

    init() {
      usersCollectionRef = collection(db, 'users')
      usersCollectionQuery = query(usersCollectionRef)

      this.getUsers()
    },

    async removeUser(userId) {
      await deleteDoc(doc(db, 'users', userId))
    }
  }
})
