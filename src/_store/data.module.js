import { stacksCollection, timestamp, currentUser } from '../firebaseConfig'
import router from '../router'

const state = {
  stacks: null
}
const getters = {
  allStacks: state => state.stacks
}
const mutations = {
  updateStacks (state, stacksObj) {
    const { stacks } = stacksObj
    state.stacks = stacks
  }
}
const actions = {
  async getAllStacks ({ commit }) {
    let stacks = []
    try {
      const stacksSnapshot = await stacksCollection.where('creator', '==', currentUser.uid).orderBy('created', 'desc').get()
      stacksSnapshot.forEach(stack => {
        stacks.push(stack.data())
      })
      commit('updateStacks', { stacks })
    } catch (e) { console.log(e) }
  },

  /**
   * @method createStack
   * @param {*} dispatch
   * @param {Object} stack - Object containing stack info data - icon, shortName, fullName
   */
  async createStack ({ dispatch }, stack) {
    try {
      const { shortName, fullName, icon } = stack
      const stackRef = await stacksCollection.add({
        creator: currentUser.uid,
        shortName,
        fullName,
        icon,
        nrOfDecks: 0,
        nrOfTodosUndone: 0,
        created: timestamp
      })
      await dispatch('getAllStacks')
      router.push('/stack/' + stackRef.id)
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
