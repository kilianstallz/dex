import { auth, usersCollection, timestamp, googleAuthProvider } from '../firebaseConfig'

const state = {
  user: null
}
const getters = {
  user: state => state.user,
  uid: () => {
    if (auth.currentUser) return auth.currentUser.uid
  }
}
const mutations = {
  'UPDATE_USER' (state, payload) {
    state.user = payload
  }
}
const actions = {
  login ({ commit }, input) {
    const { email, password } = input
    auth.signInWithEmailAndPassword(email, password).then(user => {
      commit('updateUser', user)
    })
  },

  async updateUser ({ commit }, firebaseUser) {
    try {
      if (auth.currentUser) {
        let user = await usersCollection.doc(auth.currentUser.uid).get()
        if (user.exists) { commit('UPDATE_USER', { ...firebaseUser, ...user.data() }) }
      } else {
        throw new Error('Could not get user')
      }
    } catch (e) {
      if (e) console.log('An error occured while fetching the user data', e)
    }
  },

  signUp ({ dispatch }, input) {
    const { firstName, lastName, email, password } = input
    // create new firebaseUser with email & password
    try {
      // Create new user with firebase
      auth.createUserWithEmailAndPassword(email, password).then(async firebaseUser => {
        if (firebaseUser.user) {
          await firebaseUser.user.updateProfile({ displayName: `${firstName} ${lastName}` })
          await usersCollection.doc(firebaseUser.user.uid).set({
            firestoreDoc: 'created',
            created: timestamp
          })
          dispatch('updateUser')
        } else {
          throw new Error('Could not fetch user')
        }
      })
    } catch (e) {
      console.error(e)
    }
  },

  async signInWithGoogle ({ commit }) {
    try {
      // TASK: ADD firebase function to create userDoc when new user signs up.
      const user = await auth.signInWithPopup(googleAuthProvider)
      if (user.user) {
        const userDoc = await usersCollection.doc(user.user.uid).get()
        if (!userDoc.exists) {
          usersCollection.doc(user.user.uid).set({
            firestoreDoc: 'created',
            created: timestamp
          })
        }
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
