<template>
  <div>
    <single-message></single-message>

    <!-- <message-form></message-form> -->
  </div>
</template>

<script>
// import MessageForm from '@/components/messages/MessageForm'
import SingleMessage from '@/components/messages/SingleMessage'
import { getDatabase, ref } from '@firebase/database'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Messages',
  data() {
    return {
      messagesRef: ref(getDatabase(), 'messages')
    }
  },
  components: {
    // 'message-form': MessageForm,
    'single-message': SingleMessage
  }
}
</script>

<style scoped></style>
