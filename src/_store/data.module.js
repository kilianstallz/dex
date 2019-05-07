import { stacksCollection, auth } from '../firebaseConfig'
import router from '../router'
import firebase from 'firebase/app'
import 'firebase/firestore'

const state = {
  stacks: null,
  _loadingStacks: false
}
const getters = {
  allStacks: state => state.stacks,
  loadingStacks: state => state._loadingStacks
}
const mutations = {
  updateStacks (state, stacksObj) {
    const { stacks } = stacksObj
    state.stacks = stacks
  },
  _loadingStacks (state, status = false) {
    state._loadingStacks = status
  }
}
const actions = {
  async getAllStacks ({ commit }) {
    let stacks = []
    try {
      commit('_loadingStacks', true)
      const uid = await auth.currentUser.uid
      const stacksSnapshot = await stacksCollection.where('creator', '==', uid).orderBy('created', 'desc').get()
      stacksSnapshot.forEach(stack => {
        stacks.push(stack.data())
      })
      commit('updateStacks', { stacks })
      commit('_loadingStacks')
    } catch (e) { console.log(e) }
  },

  /**
   * @method createStack
   * @param {*} dispatch
   * @param {Object} stack - Object containing stack info data - icon, shortName, fullName
   */
  async createStack ({ dispatch }, stack) {
    const time = firebase.firestore.Timestamp.now()
    try {
      const { shortName, fullName, icon } = stack.stack
      console.log(shortName, fullName, icon)
      const uid = auth.currentUser.uid

      stacksCollection.add({
        creator: uid,
        shortName: shortName,
        fullName: fullName,
        icon: icon,
        nrOfDecks: 0,
        isFavourite: false,
        created: time
      })
      dispatch('getAllStacks')
      // router.push('/stack/' + stackRef.id)
      router.push('/space')
    } catch (e) {
      console.log(e)
    }
  }
}

export const data = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
