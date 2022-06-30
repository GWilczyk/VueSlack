<template>
  <div class="media mt-3">
    <img
      alt="user"
      class="align-self-start"
      height="50"
      :src="props.message.author.avatar"
    />
    <div class="media-body">
      <h6 class="mt-0">
        <a href="#">{{ props.message.author.name }}</a> -
        {{ fromNow }}
      </h6>
      <p :class="{ 'self-message': selfMessage }">
        {{ props.message.content }}
      </p>
    </div>
  </div>
</template>

<script setup>
/* imports */
import moment from 'moment'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
/* props */
const props = defineProps({
  message: {
    type: Object,
    required: true
  }
})
/* store */
const authStore = useAuthStore()
/* format date */
const fromNow = computed(() =>
  moment(props.message.timestamp?.seconds * 1000).fromNow()
)
/* check if message has been written by the current user */
const selfMessage = computed(
  () => props.message.author.id === authStore.user.id
)
</script>

<style scoped>
.self-message {
  border-left: 5px solid red;
  padding: 0 10px;
}
img {
  margin-right: 12px;
}
.media {
  display: flex;
  align-items: center;
  align-content: center;
}
</style>
