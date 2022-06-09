import { createStore } from 'vuex'
import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT
} from '@/store/mutation-types'

export default createStore({
  state: {
    currentUser: null,
    errors: [],
    loading: false
  },
  getters: {
    getCurrentUser: (state) => state.currentUser,
    hasErrors: (state) => state.errors.length > 0,
    isLoading: (state) => state.loading
  },
  mutations: {
    [USER_LOGIN_FAILED](state, { error }) {
      state.loading = false
      state.currentUser = null
      state.errors.push({ code: error.code, message: error.message })
    },
    [USER_LOGIN_REQUEST](state) {
      state.loading = true
      state.currentUser = null
      state.errors = []
    },
    [USER_LOGIN_SUCCESS](state, { user }) {
      state.loading = false
      state.currentUser = user
    },
    [USER_LOGOUT](state) {
      state.loading = false
      state.currentUser = null
      state.errors = []
    }
  },
  actions: {
    [USER_LOGIN_FAILED]({ commit }, error) {
      commit(USER_LOGIN_FAILED, { error })
    },
    [USER_LOGIN_REQUEST]({ commit }) {
      commit(USER_LOGIN_REQUEST)
    },
    [USER_LOGIN_SUCCESS]({ commit }, user) {
      commit(USER_LOGIN_SUCCESS, { user })
    },
    [USER_LOGOUT]({ commit }) {
      commit(USER_LOGOUT)
    }
  },
  modules: {}
})
