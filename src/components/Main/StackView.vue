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
      <label-list v-if="decks.length !== 0">Your Decks</label-list>
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
import { decksCollection, notesCollection, stacksCollection } from '../../firebaseConfig'
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
    ...mapGetters('user', ['user'])
  },
  methods: {
    async fetchStack () {
      try {
        await stacksCollection
          .doc(this.$route.params.id)
          .onSnapshot(docSnapshot => {
            if (docSnapshot.exists === false) {
              throw new Error('Document does not exist!')
            }
            this.stack = docSnapshot.data()
            this.$store.state.navbarTitle = this.stack.shortName
          })
      } catch (err) {
        console.error(err)
        this.$router.push('/space')
      }
    },
    async fetchDecks () {
      try {
        await decksCollection
          .where('stack', '==', this.$route.params.id)
          .onSnapshot(querySnapshot => {
            this.decks = querySnapshot.docs.map(doc => doc.data())
          })
      } catch (e) {
        this.decks = []
        console.error('There was a problem fetching the decks.')
      }
    },
    async fetchNotes () {
      try {
        await notesCollection
          .where('creator', '==', this.user.uid)
          .where('stack', '==', this.$route.params.id)
          .orderBy('created', 'desc')
          .onSnapshot(querySnapshot => {
            this.notes = querySnapshot.docs.map(doc => doc.data())
          })
      } catch (err) {
        this.notes = []
        console.error('There was a problem fetching your notes!')
      }
    }
  },
  mounted () {
    this.fetchStack()
    this.fetchDecks()
    this.fetchNotes()
  },
  components: {
    Deck: CardDeck,
    Note: CardNotes,
    labelList,
    Loader
  }
}
</script>
