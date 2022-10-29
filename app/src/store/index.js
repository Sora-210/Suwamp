import Vue from 'vue'
import Vuex from 'vuex'

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
  }
})
