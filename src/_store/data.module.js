import { stacksCollection, auth } from '../firebaseConfig'
import router from '../router'
import firebase from 'firebase/app'
import 'firebase/firestore'

const state = {
  stacks: null,
  _loading: false
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
  loadingStacks: state => state._loading
}
const mutations = {
  updateStacks (state, stacksObj) {
    const { stacks } = stacksObj
    state.stacks = stacks
  },
  _loading (state, status = false) {
    state._loading = status
  }
}
const actions = {

  // Stacks

  async getAllStacks ({ commit }) {
    let stacks = []
    try {
      commit('_loading', true)
      const uid = auth.currentUser.uid
      const stacksRef = await stacksCollection.where('creator', '==', uid).orderBy('created', 'desc').get()
      for (let stack of stacksRef.docs) {
        stacks.push(stack)
      }
      commit('updateStacks', { stacks })
      commit('_loading')
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
  },

  // Notes

  async getAllNotes ({ commit }) {
    let stacks = []
    try {
      commit('_loading', true)
      const uid = auth.currentUser.uid
      const stacksRef = await stacksCollection.where('creator', '==', uid).orderBy('created', 'desc').get()
      for (let stack of stacksRef.docs) {
        stacks.push(stack)
      }
      commit('updateStacks', { stacks })
      commit('_loading')
    } catch (e) { console.log(e) }
  }
}

export const data = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
