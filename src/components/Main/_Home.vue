<template>
  <div>

    <!-- Non Empty -->

    <div class="grid">
      <div
        class="favs grid__outer"
        v-if="favs.length !== 0"
      >
        <dLabel class="grid__label">FAVOURITES</dLabel>
        <div class="grid__container">
          <card
            v-for="(fav, i) in favs"
            :key="i"
            :data="fav"
          />
        </div>
      </div>
      <div
        class="stacks grid__outer"
        v-if="stacks.length !== 0"
      >
        <dLabel class="grid__label">MY STACKS</dLabel>
        <div class="grid__container">
          <card
            v-for="(stack, i) in stacks"
            :key="i"
            :data="stack"
          />
        </div>
      </div>
    </div>

    <!-- Empty State -->

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
    // Set Navbar title
    this.$store.state.navbarTitle = 'My Space'

    this.fetchStacks()
  },
  components: {
    card,
    dLabel: labelList
  }
}
</script>

<style lang="scss" scoped>
.grid {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;

  &__container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-gap: 12px;
  }
}

@media (min-width: 767px) {
  .grid {
    &__container {
      grid-template-columns: 1fr 1fr;
    }
  }
}

@media (min-width: 1024px) {
  .grid {
    &__container {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
}
@media (min-width: 1440px) {
  .grid {
    &__container {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
}
</style>
