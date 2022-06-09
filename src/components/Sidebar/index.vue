<template>
  <div>
    <h2 class="text-light">VuexSlack</h2>

    <hr style="border: 1px solid #333" />

    <div class="user-details">
      <img
        alt="User picture"
        class="rounded-circle"
        height="30"
        :src="getCurrentUser?.photoURL"
        referrerpolicy="origin"
      />
      <span class="text-light">{{ getCurrentUser?.displayName }}</span>
    </div>

    <hr style="border: 1px solid #333" />

    <button class="btn btn-outline-light" @click="handleLogout">Logout</button>
  </div>
</template>

<script>
import { authInstance } from '@/firebase'
import { USER_LOGOUT } from '@/store/mutation-types'
import { mapGetters } from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Sidebar',
  computed: {
    ...mapGetters(['getCurrentUser'])
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
img {
  margin-right: 10px;
}
.user-details {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
