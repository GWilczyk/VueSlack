<template>
  <div>
    <h2 class="text-light">VuexSlack</h2>

    <hr />

    <div class="user-details">
      <img
        alt="User picture"
        class="rounded-circle"
        height="30"
        :src="currentUser?.photoURL"
        referrerpolicy="origin"
      />
      <span class="text-light">{{ currentUser?.displayName }}</span>
    </div>

    <hr />

    <button class="btn btn-outline-light" @click="handleLogout">Logout</button>

    <hr />

    <channels></channels>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { authInstance } from '@/firebase'
import { USER_LOGOUT } from '@/store/mutation-types'

import Channels from '@/components/sidebar/Channels'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Sidebar',
  components: {
    channels: Channels
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    handleLogout: function () {
      authInstance.signOut()
      this.$store.dispatch(USER_LOGOUT)
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 1px solid #f1f1f1;
}
img {
  margin-right: 10px;
}
.user-details {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
