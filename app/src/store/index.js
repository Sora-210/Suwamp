import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    LoginHash: ''
  },
  getters: {
    getLoginStatus: function(state) {
      return (state.LoginHash === '') ? true : false;
    },
    getLoginHash: function(state) {
      return state.LoginHash;
    }
  },
  mutations: {
    setLoginHash: function(state, loginHash) {
      state.LoginHash = loginHash
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      key: 'suwamp',
      storage: window.sessionStorage
    })
  ]
})
