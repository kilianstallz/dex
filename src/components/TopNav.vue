<template>
  <div class="navbar bg-gray-200 font-bold text-gray-900">
    <div class="inner h-full flex flex-row">
      <span
        @click="toggleSidebar"
        class="ml-7 my-auto hover:text-gray-700"
      >|||</span>
      <span class="ml-7 my-auto text-lg">{{pageTitle}}</span>
      <span
        v-if="isOffline"
        class="ml-2 my-auto text-sm uppercase bg-gray-800 text-white px-2 rounded-full"
      >OFFLINE</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopNavbar',
  methods: {
    toggleSidebar () {
      // TASK: Sidebar Store
      this.$store.dispatch('toggleSidebar', true)
    }
  },
  computed: {
    pageTitle () {
      return this.$store.getters.title
    },
    isOffline () {
      return this.$store.getters.isOffline
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 64px;
  padding-top: 20px; // Bezzle Spacing
}
</style>
