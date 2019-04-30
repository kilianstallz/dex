<template>
  <div>
    <div
      class="favs"
      v-if="favs"
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
      v-if="stacks"
    >
      <dLabel>MY STACKS</dLabel>
      <card
        v-for="(stack, i) in stacks"
        :key="i"
        :data="stack"
      />
    </div>
  </div>
</template>

<script>
import labelList from './labelList.vue'
import card from './card.vue'
export default {
  name: 'MySpace',
  data () {
    return {
      mock: [
        { icon: '🏴',
          short: 'AUT',
          long: 'Scheisseundso',
          isFavourite: false },
        { icon: '🏴',
          short: 'ES',
          long: 'Energiiiiee',
          isFavourite: true },
        { icon: '🏴',
          short: 'ES',
          long: 'Energiiiiee',
          isFavourite: true }
      ]
    }
  },
  computed: {
    favs () {
      let favs = this.mock.filter(el => el.isFavourite === true) || null
      return favs
    },
    stacks () {
      let stacks = this.mock.filter(el => el.isFavourite === false) || null
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
