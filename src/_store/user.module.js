import { auth, usersCollection, timestamp, googleAuthProvider } from '../firebaseConfig'

const state = {
  user: null,
  navbarTitle: 'My Stack'
}
const getters = {
  user: state => state.user
}
const mutations = {
  /**
   * @method UPDATE_USER
   * @description Sets the user state from the user object contained in the payload.
   * @param {Object} payload - Firebase User wrapped in user object.
   */
  'UPDATE_USER' (state, payload) {
    const { user } = payload
    state.user = user
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

  async updateUser ({ commit }, firebaseUser) {
    try {
      let user = await usersCollection.doc(firebaseUser.uid).get()
      if (user.exists) { commit('UPDATE_USER', { user: { ...firebaseUser, ...user.data() } }) }
    } catch (e) {
      if (e) console.log('An error occured while fetching the user data')
    }
  },

  signUp ({ commit }, input) {
    const { firstName, lastName, email, password } = input
    // create new firebaseUser with email & password
    try {
      // Create new user with firebase
      auth.createUserWithEmailAndPassword(email, password).then(async firebaseUser => {
        await firebaseUser.user.updateProfile({ displayName: `${firstName} ${lastName}` })
        const userDoc = await usersCollection.doc(firebaseUser.user.uid).set({
          firestoreDoc: 'created',
          created: timestamp()
        })
        console.log(userDoc)
        const finalUser = { ...user, ...userDoc }
        commit('updateUser', finalUser)
      })
    } catch (e) {
      console.error(e)
    }
  },

  async signInWithGoogle ({ commit }) {
    try {
      // TASK: ADD firebase function to create userDoc when new user signs up.
      const user = await auth.signInWithPopup(googleAuthProvider)
      const userDoc = await usersCollection.doc(user.user.uid).get()
      if (!userDoc.exists) {
        usersCollection.doc(user.user.uid).set({
          firestoreDoc: 'created',
          created: timestamp()
        })
      }
    } catch (e) {
      console.log(e)
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
