import { authService } from '../_services/auth.service'

const state = {
  user: null
}
const getters = {
  user: state => state.user
}
const mutations = {
  updateUser: (state, payload) => {
    const { user } = payload
    state.user = user
    console.log('User updated')
  }
}
const actions = {
  // ///////////////
  // AUTHENTICATION
  // ///////////////
  login: ({ commit }, input) => {
    const { email, password } = input
    authService.loginWithForm(email, password).then(firebaseUser => {
      console.log('User resolved')
      commit('updateUser', { user: firebaseUser })
    })
  }
}

export const user = {
  state,
  getters,
  mutations,
  actions
}
