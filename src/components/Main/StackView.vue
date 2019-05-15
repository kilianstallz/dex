<template>
  <div v-if="stack">

    <!-- Notes -->
    <div
      class="wrapper__notes"
      v-if="notes"
    >
      <label-list>Notes</label-list>
      <div
        v-if="stack"
        class="note__grid"
      >
        <note
          v-for="note in decks"
          :data="note"
          :key="note.id"
        />
      </div>
    </div>
    <!-- Notes Loading Spinner -->
    <div
      v-else
      class="flex w-full"
    >
      <loader class="mx-auto my-6" />
    </div>

    <!-- Decks -->
    <div
      class="wrapper__decks"
      v-if="decks"
    >
      <label-list>Your Decks</label-list>
      <div class="deck__grid">
        <deck
          v-for="deck in decks"
          :data="deck"
          :key="deck.id"
        />
      </div>
    </div>
    <div
      class="flex w-full"
      v-else
    >
      <loader class="mx-auto my-6" />
    </div>
  </div>

  <!-- Empty state -->
  <div v-else>
    EMPTY STATE
  </div>
</template>

<style lang="scss" scoped>
.deck__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 12px;
}
.note__grid {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  grid-gap: 12px;
}
</style>

<script>
import labelList from '../labelList.vue'
import CardDeck from '../CardDeck.vue'
import CardNotes from '../CardNotes.vue'
import Loader from '../Loader.vue'
import { decksCollection } from '../../firebaseConfig'
import { mapGetters } from 'vuex'
export default {
  name: 'ViewStack',
  data () {
    return {
      stack: null,
      decks: null,
      notes: null
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    ...mapGetters('data', ['allStacks']),
    ...mapGetters('user', ['user'])
  },
  methods: {
    setStack () {
      this.stack = { ...this.allStacks.filter(stack => stack.id === this.$route.params.id) }
    },
    async fetchDecks () {
      try {
        const decksSnapshot = await decksCollection.where('stack', '==', this.$route.params.id).get()
        let decks = []
        for (let deck of decksSnapshot.docs) {
          decks.push(deck.data())
        }
        this.decks = decks
      } catch (e) {
        console.error('There was a problem fetching the stack data.')
      }
    }
  },
  mounted () {
    this.setStack()
    this.fetchDecks()
  },
  components: {
    Deck: CardDeck,
    Note: CardNotes,
    labelList,
    Loader
  }
}
</script>
