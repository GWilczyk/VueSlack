<template>
  <div>
    <div class="jumbotron bg-primary text-white text-center py-4">
      <h2 class="lead display-3">Slack Clone</h2>
      <p>Realtime communication at it's best!</p>
    </div>

    <!-- Errors status -->
    <div class="alert alert-danger mt-3" v-if="this.hasErrors">
      <div :key="index" v-for="(error, index) in this.$store.state.errors">
        {{ error.message }}
      </div>
    </div>

    <!-- Loading status -->
    <div class="alert alert-info mt-3" v-if="this.isLoading">Processing…</div>

    <div class="container-fluid">
      <!-- Login with Google -->
      <div class="row mt-5">
        <div class="col text-center">
          <button
            class="btn btn-outline-danger btn-lg"
            @click="handleGoogleLogin"
          >
            Login with Google
          </button>
        </div>
      </div>

      <!-- Login with Facebook -->
      <div class="row mt-5">
        <div class="col text-center">
          <button
            class="btn btn-outline-info btn-lg"
            @click="handleFacebookLogin"
          >
            Login with Facebook
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'

import { authInstance } from '@/firebase'
import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS
} from '@/store/mutation-types'

export default {
  name: 'LoginView',
  computed: {
    ...mapGetters(['hasErrors', 'isLoading'])
  },
  methods: {
    ...mapActions([USER_LOGIN_FAILED, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS]),
    handleFacebookLogin: function () {
      const FacebookProvider = new FacebookAuthProvider()

      this.USER_LOGIN_REQUEST()

      signInWithPopup(authInstance, FacebookProvider)
        .then((response) => {
          this.USER_LOGIN_SUCCESS(response.user)
          this.$router.push('/')
        })
        .catch((error) => {
          this.USER_LOGIN_FAILED(error)
        })
    },
    handleGoogleLogin: function () {
      const GoogleProvider = new GoogleAuthProvider()

      this.USER_LOGIN_REQUEST()

      signInWithPopup(authInstance, GoogleProvider)
        .then((response) => {
          this.USER_LOGIN_SUCCESS(response.user)
          this.$router.push('/')
        })
        .catch((error) => {
          this.USER_LOGIN_FAILED(error)
        })
    }
  }
}
</script>

<style scoped>
.btn,
.jumbotron {
  border-radius: 0;
}
</style>
