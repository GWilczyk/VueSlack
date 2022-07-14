import { defineStore } from 'pinia'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

import { firebaseStorage } from '@/js/firebase'

import mime from 'mime'
import { v4 as uuidv4 } from 'uuid'

import { useChannelStore } from '@/stores/channelStore'
import { useMessageStore } from '@/stores/messageStore'

export const useFileUploadStore = defineStore('fileUploadStore', {
  state: () => ({
    authorized: ['image/jpeg', 'image/jpg', 'image/png'],
    errors: [],
    file: null,
    progress: 0,
    uploadState: '',
    uploadTask: null
  }),
  actions: {
    addFile(event) {
      const files = event.target.files

      if (files.length === 1) {
        this.file = files[0]
      }
    },

    /* folder directory to store files in firebase storage */
    getPath(channelId, isPrivate) {
      return isPrivate ? `chat/private/${channelId}` : 'chat/public'
    },

    isValid(filename) {
      return this.authorized.includes(mime.getType(filename))
    },

    sendFile() {
      if (this.isValid(this.file.name)) {
        const metadata = {
          contentType: mime.getType(this.file.name)
        }

        this.uploadFile(this.file, metadata)
      }
    },

    uploadFile(file, metadata) {
      const channelStore = useChannelStore()
      const messageStore = useMessageStore()

      const filePath = `${this.getPath(
        channelStore.activeChannel,
        channelStore.isPrivate
      )}/${uuidv4()}.${mime.getExtension(metadata.contentType)}`

      const storageRef = ref(firebaseStorage, filePath)

      this.uploadState = 'uploading'
      this.uploadTask = uploadBytesResumable(storageRef, file, metadata)

      this.uploadTask.on(
        'state_changed',
        (snapshot) => {
          this.progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        (error) => {
          this.uploadState = 'error'
          this.uploadTask = null
          this.file = null
          this.errors.push(error.message)
        },
        /* upload finished */
        async () => {
          this.uploadState = 'done'

          setTimeout(() => {
            if (this.uploadState === 'done') {
              this.uploadState = ''
            }
          }, 3000)

          const fileURL = await getDownloadURL(this.uploadTask.snapshot.ref)
          this.uploadTask = null

          return messageStore.sendMessage(fileURL)
        }
      )
    }
  }
})
