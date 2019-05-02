import { auth, usersCollection } from '../firebaseConfig'

const state = {
  user: null
}
const getters = {
  user: state => state.user
}
const mutations = {
  /**
   * @method updateUser
   * @description Sets the user state from the user object contained in the payload.
   * @param {Object} payload - Firebase User wrapped in user object.
   */
  updateUser (state, payload) {
    const { user } = payload
    state.user = user
    console.log('User updated')
  }
}
const actions = {
  /**
   * @method login
   * @description Login using email and password, then commits the user object.
   * @param {Object} input - Needs an Object that contains the email and password string.
   */
  login ({ commit }, input) {
    const { email, password } = input
    auth.signInWithEmailAndPassword(email, password).then(user => {
      commit('updateUser', user)
    })
  },

  /**
   * @method updateUser
   * @description Update user store by gettin the user doc from firebase
   * @param {Object} firebaseUser - Firebase User document
   */

  updateUser ({ commit }, firebaseUser) {
    usersCollection.doc(firebaseUser.uid).get().then(user => {
      if (user.exists) {
        commit('updateUser', { user: { ...firebaseUser, ...user.data() } })
      }
    })
  },

  signUp ({ commit }, input) {
    const { firstName, lastName, email, password } = input
    // create new firebaseUser with email & password
    try {
      // Create new user with firebase
      auth.createUserWithEmailAndPassword(email, password).then(async firebaseUser => {
        await firebaseUser.user.updateProfile({ displayName: `${firstName} ${lastName}` })
        const userDoc = await usersCollection.doc(firebaseUser.user.uid).set({
          createdAt: Date.now()
        })
        const finalUser = { ...user, ...userDoc }
        commit('updateUser', finalUser)
      })
    } catch (e) {
      console.error(e)
    }
  },

  /**
   * @method logout
   * @description Logs Out the user and removes all stored data on the device.
   */
  logout ({ commit }) {
    commit('updateUser', null)
  }
}

export const user = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
