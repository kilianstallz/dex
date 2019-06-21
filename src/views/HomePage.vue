<template>
  <div class="home-page">
    <div class="list-grid" v-if="lists">
      <list-card v-for="list in lists" :key="list.id" />
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
        .where('creator', '==', this.user.id)
        .orderBy('deadline', 'desc')
        .onSnapshot(querySnapshot => {
          this.lists = this.docs.map(doc => { return { ...doc.data(), id: doc.id } })
        })
    }
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
