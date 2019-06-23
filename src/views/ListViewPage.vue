<template>
  <div class="p-4 relative" v-if="list">
    <header class="flex">
      <h1 class="text-2xl">{{ list.name }}</h1>
      <div class="flex-1"></div>
      <dropdown class="my-auto">
        <ul>
          <li>Edit</li>
          <li>Delete</li>
        </ul>
      </dropdown>
    </header>
    <main>

    </main>
    <fab @click.native="fabAction" />
  </div>
  <div v-else>
    <loader />
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import { listsCollection } from '../firebaseConfig'
import Loader from '@/components/Loader.vue'
import Dropdown from '@/components/DropdownMenu'
import { SlideYDownTransition } from 'vue2-transitions'
import fab from '@/components/FAB'
export default {
  name: 'ListView',
  data () {
    return {
      list: null
    }
  },
  computed: {
    listId () {
      return this.$route.params.id
    }
  },
  methods: {
    async getList () {
    await listsCollection
      .doc(this.listId)
      .onSnapshot(docSnapshot => {
        if (!docSnapshot.exists) return this.$router.go(-1)
        this.list = docSnapshot.data()
      })
    },
    fabAction () {
      this.$router.push(`/list/${this.listId}/add`)
    }
  },
  mounted () {
    this.getList()
    this.$store.dispatch('toggleBottomNav', false)
  },
  destroyed () {
    this.$store.dispatch('toggleBottomNav')
  },
  components: {
    Loader,
    Dropdown,
    fab,
    slideDown: SlideYDownTransition
  }
}
</script>

<style lang="scss">
.fab {
  position: fixed;
  width: 64px;
  height: 64px;
  bottom: 16px;
  left: auto;
  right: 32px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.08);
  z-index: 4;
}
@media (min-width: 500px) {
  .fab {
    left: auto;
    right: 16px;
  }
}
</style>
