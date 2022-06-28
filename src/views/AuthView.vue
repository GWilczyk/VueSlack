<template>
  <div>
    <div class="jumbotron bg-primary text-white text-center py-4">
      <h2 class="lead display-3">VueSlack</h2>
      <p>Realtime communication at it's best!</p>
    </div>

    <!-- Errors status -->
    <div class="alert alert-danger mt-3" v-if="authStore.errors.length">
      <div :key="index" v-for="(error, index) in authStore.errors">
        {{ error.message }}
      </div>
    </div>

    <!-- Loading status -->
    <div class="text-center my-5" v-if="authStore.isLoading">
      <LoadingSpinner />
    </div>

    <div class="container-fluid">
      <!-- Login with Google -->
      <div class="col text-center">
        <div class="row mt-5">
          <button
            class="btn btn-outline-danger btn-lg col-3 mx-auto"
            @click="authStore.loginWithGoogle"
          >
            Login with Google
          </button>
        </div>
      </div>

      <!-- Login with Facebook -->
      <div class="col text-center">
        <div class="row mt-5">
          <button
            class="btn btn-outline-info btn-lg col-3 mx-auto"
            @click="authStore.loginWithFacebook"
          >
            Login with Facebook
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* imports */
import { useAuthStore } from '@/stores/authStore'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
/* store */
const authStore = useAuthStore()
</script>

<style scoped>
.btn,
.jumbotron {
  border-radius: 0;
}
</style>
