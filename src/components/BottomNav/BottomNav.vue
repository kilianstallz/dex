<template>
  <div class="fixed flex flex-col bottom-0 left-0 right-0 w-screen text-gray-900 z-40">
    <nav class="w-full bg-white">
      <div>
        <img
          src="../../assets/icons/archive.svg"
          alt=""
        >
      </div>
      <div>
        <img
          src="../../assets/icons/search.svg"
          alt=""
        >
      </div>
      <div
        class="bg-blue-400 rounded my-4"
        style="width: 45px; height: 30px;"
        @click="toggleCreate"
      >
        <div
          v-show="!showCreate"
          class="plus mx-auto leading-tight z-50 text-2xl text-white"
        >+</div>
        <div
          v-show="showCreate"
          class="plus mx-auto leading-tight z-50 text-2xl text-white"
        >-</div>
      </div>
      <div>
        <img
          src="../../assets/icons/bell.svg"
          alt="Notification"
        >
      </div>
      <div>
        <img
          src="../../assets/icons/grid.svg"
          alt=""
        >
      </div>
    </nav>
    <div
      v-show="showCreate"
      class="w-full bg-white flex flex-col p-4"
    >
      <div
        style="height: 40px; width: 160px"
        class="bg-gray-900 text-white mx-auto py-2 px-4 my-6 text-center rounded-lg"
        @click="goToRoute('/create/stack')"
      >CREATE STACK</div>
      <!-- <div
        style="height: 40px; width: 160px"
        class="bg-blue-400 text-white mx-auto py-2 px-4 my-6 text-center rounded"
      >CREATE DECK</div> -->
      <div
        v-if="displayNoteButton"
        @click="goToRoute(noteRoute)"
        style="height: 40px; width: 160px"
        class="bg-red-500 text-white mx-auto py-2 px-4 my-6 text-center rounded"
      >CREATE NOTE</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheBottomNavigation',
  data () {
    return {
      showCreate: false
    }
  },
  computed: {
    noteRoute () {
      if (this.$route.path.startsWith('/stack')) {
        return {
          path: '/create/note',
          query: { stack: this.$route.params.id, lastRoute: this.$route.fullPath }
        }
      } else {
        return { path: '/create/note' }
      }
    },
    displayNoteButton () {
      const path = this.$route.path
      if (path.startsWith('/space') || path.startsWith('/stack') || path.startsWith('/note') || path.startsWith('/notes')) return true
      else return false
    }
  },
  methods: {
    toggleCreate () {
      this.showCreate = !this.showCreate
    },
    goToRoute (path = '/space') {
      console.log(path)
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  border-radius: 16px 16px 0 0;
  height: 64px;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: auto;
  align-items: center;

  div {
    height: 16px;
    display: flex;
    margin: 0 auto;
  }
}

@media (min-width: 425px) {
  nav {
    max-width: 425px;
    margin: 0 auto;
    box-shadow: 0px -2px 6px rgba(0, 0, 0, 0.1);
  }
}
</style>
