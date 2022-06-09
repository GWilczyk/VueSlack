import { createStore } from 'vuex'
import {
  SAVE_USER_TO_DB_REQUEST,
  SAVE_USER_TO_DB_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT
} from '@/store/mutation-types'
import { getDatabase, ref } from 'firebase/database'

export default createStore({
  state: {
    currentUser: null,
    errors: [],
    loading: false,
    usersRef: ref(getDatabase(), 'users')
  },
  getters: {
    getCurrentUser: (state) => state.currentUser,
    getUsersRef: (state) => state.usersRef,
    hasErrors: (state) => state.errors.length > 0,
    isLoading: (state) => state.loading
  },
  mutations: {
    [SAVE_USER_TO_DB_REQUEST](state) {
      state.loading = true
      state.errors = []
    },
    [SAVE_USER_TO_DB_SUCCESS](state) {
      state.loading = false
      state.errors = []
    },
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
    [SAVE_USER_TO_DB_REQUEST]({ commit }) {
      commit(SAVE_USER_TO_DB_REQUEST)
    },
    [SAVE_USER_TO_DB_SUCCESS]({ commit }) {
      commit(SAVE_USER_TO_DB_SUCCESS)
    },
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
