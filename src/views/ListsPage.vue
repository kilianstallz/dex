<template>
  <div class="home-page">
    <div class="list-grid" v-if="lists">
      <!-- <list-card name="All" icon="📝" :count="summ === 1 ? '1 Task' : `${summ} Tasks`" /> -->
      <list-card v-for="list in lists" :icon="list.icon" :name="list.name" :id="list.id" :key="list.id" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListCard from '../components/ListGridCard.vue'
import { listsCollection } from '../firebaseConfig';
export default {
  name: 'Home',
  data () {
    return {
      lists: null
    }
  },
  components: {
    ListCard
  },
  computed: {
    ...mapGetters('user', ['user']),
  },
  methods: {
    async fetchLists () {
      await listsCollection
        .where('creator', '==', this.user.uid)
        .onSnapshot(querySnapshot => {
          this.lists = querySnapshot.docs.map(doc => { return { ...doc.data(), id: doc.id } })
        })
    }
  },
  created () {
    this.$store.dispatch('updateTitle', 'Lists')
  },
  mounted () {
    this.fetchLists()
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  height: 100%;
  width: 100%;
  padding-top: 24px;
  .list-grid {
    padding: 0 6px;
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: grid;
    grid-gap: 12px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
  }
}
</style>
