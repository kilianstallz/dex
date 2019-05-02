import Vue from 'vue'
import Vuex from 'vuex'
import { user } from './_store/user.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  },
  state: {
    isLoading: false,
    showSidebar: false
  },
  getters: {
    isLoading: state => state.isLoading,
    showSidebar: state => state.showSidebar
  },
  mutations: {
    toggleSidebar (state, bool) {
      state.showSidebar = bool
    }
  },
  actions: {
    /**
     * @method toggleSidebar
     * @param {bool} bool - Sidebar Toggle State
     * @default false
     */
    toggleSidebar ({ commit }, bool = false) {
      commit('toggleSidebar', bool)
    }
  }
})
