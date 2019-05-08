<template>
  <div>
    <label-list>Notes</label-list>
    <div
      v-if="stack"
      class="note__grid"
    >
      <note
        :data="decks"
        v-for="deck in decks"
        :key="deck.id"
      />
    </div>
    <label-list>Your Decks</label-list>
    <div
      v-if="stack"
      class="deck__grid"
    >
      <deck
        :data="decks"
        v-for="deck in decks"
        :key="deck.id"
      />
    </div>
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
import { decksCollection } from '../../firebaseConfig'
import { mapGetters } from 'vuex'
export default {
  name: 'ViewStack',
  data () {
    return {
      stack: null,
      decks: null
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
    labelList
  }
}
</script>
