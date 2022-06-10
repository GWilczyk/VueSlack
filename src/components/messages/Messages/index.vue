<template>
  <div>
    <single-message></single-message>

    <message-form></message-form>
  </div>
</template>

<script>
import MessageForm from '@/components/messages/MessageForm'
import SingleMessage from '@/components/messages/SingleMessage'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Messages',
  components: {
    'message-form': MessageForm,
    'single-message': SingleMessage
  }
}
</script>

<style scoped></style>
