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
      <router-view></router-view>
    </div>
    <!-- Bottom Navigation -->
    <bottom-nav />
  </div>
</template>

<script>
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
    BottomNav
  }
}
</script>
