import Vue from 'vue'
import Vuex from 'vuex'
import { user } from './_store/user.module'
import { data } from './_store/data.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    data
  },
  state: {
    isLoading: false,
    showSidebar: false,
    navbarTitle: ''
  },
  getters: {
    isLoading: state => state.isLoading,
    showSidebar: state => state.showSidebar
  },
  mutations: {
    toggleSidebar (state, bool) {
      state.showSidebar = bool
    },
    '_setLoading' (state, bool) {
      state.isLoading = bool
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
    },
    setLoadingState ({ commit }, isLoading = false) {
      commit('_setLoading')
    }
  }
})
