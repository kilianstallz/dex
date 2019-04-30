<template>
  <div class="bg-gray-200 m-0 p-0 h-screen w-screen">
    <!-- notifications -->
    <!-- Sidebar Drawer -->
    <!-- Top Navigation -->
    <top-navbar />
    <!-- Content -->
    <div
      class="bg-gray-200"
      style="margin: 0 5px 0 5px;"
    >
      <router-view v-if="!isLoading"></router-view>
      <div
        class="w-full flex flex-row mt-64"
        v-else
      >
        <loader class="mx-auto" />
      </div>
    </div>
    <!-- Bottom Navigation -->
    <bottom-nav />
  </div>
</template>

<script>
import Loader from '../components/Loader.vue'
import TopNavbar from '../components/TopNav.vue'
import BottomNav from '../components/BottomNav/BottomNav.vue'
export default {
  name: 'MainLayout',
  data () {
    return {
      window: {
        width: 0
      }
    }
  },
  methods: {
    getWindowWidth (e) {
      this.window.width = window.innerWidth
      if (this.window.width < 768) {
        // Toggle Sidebar
      } else {
        // Toggle Sidebar
      }
    }
  },
  computed: {
    isLoading () {
      return true
    }
  },
  created () {
    this.$nextTick(function () {
      window.addEventListener('resize', this.getWindowWidth)
      this.getWindowWidth()
    })
  },
  destroyed () {
    window.removeEventListener('resize', this.getWindowWidth)
  },
  components: {
    TopNavbar,
    BottomNav,
    Loader
  }
}
</script>
