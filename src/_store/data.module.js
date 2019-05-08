import { stacksCollection, auth } from '../firebaseConfig'
import router from '../router'
import firebase from 'firebase/app'
import 'firebase/firestore'

const state = {
  stacks: null,
  _loadingStacks: false
}
const getters = {
  singleStack: state => {
    return stackId => {
      return state.stacks.filter(stack => stack.id === stackId)
    }
  },
  allStacks: state => {
    let stacks = []
    if (state.stacks) {
      for (let stack of state.stacks) {
        let stackId = stack.id
        stack = stack.data()
        stack.id = stackId
        stacks.push(stack)
      }
    }
    return stacks
  },
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
      const uid = auth.currentUser.uid
      const stacksRef = await stacksCollection.where('creator', '==', uid).orderBy('created', 'desc').get()
      for (let stack of stacksRef.docs) {
        stacks.push(stack)
      }
      commit('updateStacks', { stacks })
      commit('_loadingStacks')
    } catch (e) { console.log(e) }
  },

  /**
   * @method createStack
   * @param {*} dispatch
   * @param {Object} stack - Object containing stack info data - icon, shortName, fullName
   */
  async createStack ({ commit }, stack) {
    const time = firebase.firestore.Timestamp.now()
    try {
      const { shortName, fullName, icon } = stack.stack
      const uid = auth.currentUser.uid

      stacksCollection.add({
        creator: uid,
        shortName: shortName,
        fullName: fullName,
        icon: icon,
        nrOfDecks: 0,
        isFavourite: false,
        created: time
      }).then(() => {
        router.push('/space')
      })
      // router.push('/stack/' + stackRef.id)
    } catch (e) {
      console.log('An error occured creating the stack.')
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
