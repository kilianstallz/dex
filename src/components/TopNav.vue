<template>
  <div class="navbar bg-gray-200 font-bold text-gray-900">
    <div class="inner h-full flex flex-row">
      <span
        @click="toggleSidebar"
        class="ml-7 my-auto hover:text-gray-700"
      >|||</span>
      <span class="ml-7 my-auto">{{pageTitle}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopNavbar',
  computed: {
    pageTitle () {
      if (this.$route.path.startsWith('/stack')) {
        return 'My Stack'
      } else return 'My Space'
    }
  },
  methods: {
    toggleSidebar () {
      // TASK: Sidebar Store
      this.$store.dispatch('toggleSidebar', true)
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
