import { createStore } from 'vuex'
import {
  CREATE_CHANNEL_FAILED,
  CREATE_CHANNEL_REQUEST,
  CREATE_CHANNEL_RESET,
  CREATE_CHANNEL_SUCCESS,
  CURRENT_CHANNEL_RESET,
  CURRENT_CHANNEL_SET,
  HANDLE_CHANNEL,
  HANDLE_MESSAGE,
  PUSH_CHANNEL_TO_CHANNELS,
  SAVE_USER_TO_DB_REQUEST,
  SAVE_USER_TO_DB_SUCCESS,
  SHOW_CHANNEL_MODAL,
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT
} from '@/store/mutation-types'

export default createStore({
  state: {
    channel: '',
    channels: [],
    currentChannel: null,
    currentUser: null,
    errors: [],
    loading: false,
    message: '',
    showModal: false
  },
  getters: {
    getChannels: (state) => state.channels,
    currentChannel: (state) => state.currentChannel,
    currentUser: (state) => state.currentUser,
    hasErrors: (state) => state.errors.length > 0,
    isLoading: (state) => state.loading,
    showModal: (state) => state.showModal
  },
  mutations: {
    [CREATE_CHANNEL_FAILED](state, { error }) {
      state.channel = ''
      state.errors.push({ message: error.message })
      state.loading = false
    },
    [CREATE_CHANNEL_REQUEST](state) {
      state.errors = []
      state.loading = true
    },
    [CREATE_CHANNEL_RESET](state) {
      state.channel = ''
      state.errors = []
      state.loading = false
    },
    [CREATE_CHANNEL_SUCCESS](state) {
      state.channel = ''
      state.errors = []
      state.loading = false
    },
    [CURRENT_CHANNEL_RESET](state) {
      state.currentChannel = state.channels[0]
    },
    [CURRENT_CHANNEL_SET](state, { channel }) {
      state.currentChannel = channel
    },
    [HANDLE_CHANNEL](state, { value }) {
      state.channel = value
    },
    [HANDLE_MESSAGE](state, { value }) {
      state.message = value
    },
    [PUSH_CHANNEL_TO_CHANNELS](state, { value }) {
      state.channels.push(value)
    },
    [SAVE_USER_TO_DB_REQUEST](state) {
      state.errors = []
      state.loading = true
    },
    [SAVE_USER_TO_DB_SUCCESS](state) {
      state.errors = []
      state.loading = false
    },
    [SHOW_CHANNEL_MODAL](state) {
      state.showModal = !state.showModal
    },
    [USER_LOGIN_FAILED](state, { error }) {
      state.currentUser = null
      state.errors.push({ code: error.code, message: error.message })
      state.loading = false
    },
    [USER_LOGIN_REQUEST](state) {
      state.currentUser = null
      state.errors = []
      state.loading = true
    },
    [USER_LOGIN_SUCCESS](state, { user }) {
      state.currentUser = user
      state.loading = false
    },
    [USER_LOGOUT](state) {
      state.currentUser = null
      state.errors = []
      state.loading = false
    }
  },
  actions: {
    [CREATE_CHANNEL_FAILED]({ commit }, error) {
      commit(CREATE_CHANNEL_FAILED, { error })
    },
    [CREATE_CHANNEL_REQUEST]({ commit }) {
      commit(CREATE_CHANNEL_REQUEST)
    },
    [CREATE_CHANNEL_RESET]({ commit }) {
      commit(CREATE_CHANNEL_RESET)
    },
    [CREATE_CHANNEL_SUCCESS]({ commit }) {
      commit(CREATE_CHANNEL_SUCCESS)
    },
    [CURRENT_CHANNEL_RESET]({ commit }) {
      commit(CURRENT_CHANNEL_RESET)
    },
    [CURRENT_CHANNEL_SET]({ commit }, channel) {
      commit(CURRENT_CHANNEL_SET, { channel })
    },
    [HANDLE_CHANNEL]({ commit }, value) {
      commit(HANDLE_CHANNEL, { value })
    },
    [HANDLE_MESSAGE]({ commit }, value) {
      commit(HANDLE_MESSAGE, { value })
    },
    [PUSH_CHANNEL_TO_CHANNELS]({ commit }, value) {
      commit(PUSH_CHANNEL_TO_CHANNELS, { value })
    },
    [SAVE_USER_TO_DB_SUCCESS]({ commit }) {
      commit(SAVE_USER_TO_DB_SUCCESS)
    },
    [SHOW_CHANNEL_MODAL]({ commit }) {
      commit(SHOW_CHANNEL_MODAL)
    },
    [USER_LOGIN_FAILED]({ commit }, error) {
      commit(USER_LOGIN_FAILED, { error })
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
