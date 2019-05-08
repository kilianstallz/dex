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
      v-if="allStacks.length === 0"
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
import { mapGetters } from 'vuex'
import labelList from '../labelList.vue'
import card from '../card.vue'
export default {
  name: 'MySpace',
  data () {
    return {}
  },
  computed: {
    ...mapGetters('data', ['allStacks']),
    favs () {
      let favs = this.allStacks.filter(el => el.isFavourite === true)
      return favs
    },
    stacks () {
      let stacks = this.allStacks.filter(el => !el.isFavourite)
      return stacks
    }
  },
  components: {
    card,
    dLabel: labelList
  }
}
</script>

<style lang="scss" scoped>
</style>
