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
    navbarTitle: 'My Space',
    isOffline: false,
    isArchived: false
  },
  getters: {
    isLoading: state => state.isLoading,
    showSidebar: state => state.showSidebar,
    title: state => state.navbarTitle,
    isOffline: state => state.isOffline,
    isArchived: state => state.isArchived
  },
  mutations: {
    toggleSidebar (state, bool) {
      state.showSidebar = bool
    },
    '_setLoading' (state, bool) {
      state.isLoading = bool
    },
    SET_TITLE (state, title) {
      state.navbarTitle = title
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
    },
    updateTitle ({ commit }, title) {
      commit('SET_TITLE', title)
    }
  }
})
