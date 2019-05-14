<template>
  <div>
    <div
      class="favs"
      v-if="favs.length !== 0"
    >
      <dLabel>FAVOURITES</dLabel>
      <card
        v-for="(fav, i) in favs"
        :key="i"
        :data="fav"
      />
    </div>
    <div
      class="stacks"
      v-if="stacks.length !== 0"
    >
      <dLabel>MY STACKS</dLabel>
      <card
        v-for="(stack, i) in stacks"
        :key="i"
        :data="stack"
      />
    </div>
    <div
      v-if="docs && docs.length === 0"
      class="text-center"
    >
      <!-- TODO: EMPTY STATE -->
      <h1 class="text-center text-2xl text-gray-900 mt-64">No spaces yet :(<br />Create your first one here!</h1>
      <router-link
        tag="button"
        to="/create/stack"
        class="mt-4 bg-blue-400 rounded-lg text-white shadow-sm py-2 px-4 hover:shadow-lg"
      >CREATE STACK</router-link>
    </div>
  </div>
</template>

<script>
import { stacksCollection } from '../../firebaseConfig'
import { mapGetters } from 'vuex'
import labelList from '../labelList.vue'
import card from '../card.vue'
export default {
  name: 'MySpace',
  data () {
    return {
      docs: null
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
    favs () {
      if (!this.docs) return []
      let favs = this.docs.filter(el => el.isFavourite === true)
      return favs
    },
    stacks () {
      if (!this.docs) return []
      let stacks = this.docs.filter(el => !el.isFavourite)
      return stacks
    }
  },
  methods: {
    async fetchStacks () {
      await stacksCollection
        .where('creator', '==', this.user.uid)
        .orderBy('created', 'desc')
        .onSnapshot(querySnap => {
          this.docs = querySnap.docs.map(doc => { return { ...doc.data(), id: doc.id } })
        })
    }
  },
  mounted () {
    this.fetchStacks()
  },
  components: {
    card,
    dLabel: labelList
  }
}
</script>

<style lang="scss" scoped>
</style>
