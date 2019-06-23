import { stacksCollection, auth, currentUser } from '../firebaseConfig'
import router from '../router'
import firebase from 'firebase/app'
import 'firebase/firestore'

const state = {
  stacks: null,
  _loading: false
}
const getters = {
  singleStack: (state: any) => {
    return (stackId: string) => {
      return state.stacks.filter((stack: any) => stack.id === stackId)
    }
  },
  allStacks: (state: any) => {
    let stacks: any = []
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
  loadingStacks: (state:any) => state._loading
}
const mutations = {
  updateStacks (state: any, stacksObj: any) {
    const { stacks } = stacksObj
    state.stacks = stacks
  },
  _loading (state: any, status: boolean = false) {
    state._loading = status
  }
}
const actions = {

  // Stacks

  async getAllStacks (context: any) {
    let stacks: any = []
    try {
      context.commit('_loading', true)
      if (!auth.currentUser) {
        context.commit('_loading')
        return
      }
      const uid = auth.currentUser.uid
      const stacksRef = await stacksCollection.where('creator', '==', uid).orderBy('created', 'desc').get()
      for (let stack of stacksRef.docs) {
        stacks.push(stack)
      }
      context.commit('updateStacks', { stacks })
      context.commit('_loading')
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
      if (auth.currentUser) {
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
      } else {
        throw new Error('Could not get user id')
      }
      // router.push('/stack/' + stackRef.id)
    } catch (e) {
      console.log('An error occured creating the stack.')
    }
  },

  // Notes

  async getAllNotes ({ commit }) {
    let stacks: any = []
    try {
      commit('_loading', true)
      if (auth.currentUser) {
        const uid = auth.currentUser.uid
        const stacksRef = await stacksCollection.where('creator', '==', uid).orderBy('created', 'desc').get()
        for (let stack of stacksRef.docs) {
          stacks.push(stack)
        }
        commit('updateStacks', { stacks })
      }
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
