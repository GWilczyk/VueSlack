<template>
  <div>
    <SingleMessage />

    <MessageForm />
  </div>
</template>

<script setup>
import MessageForm from '@/components/messages/MessageForm.vue'
import SingleMessage from '@/components/messages/SingleMessage.vue'
// import { getDatabase, ref } from '@firebase/database'

// export default {
//   // eslint-disable-next-line vue/multi-word-component-names
//   name: 'Messages',
//   data() {
//     return {
//       messagesRef: ref(getDatabase(), 'messages')
//     }
//   },
//   components: {
//     // 'message-form': MessageForm,
//     'single-message': SingleMessage
//   }
// }
</script>

<style scoped></style>
