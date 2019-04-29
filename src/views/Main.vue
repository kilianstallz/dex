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
  </div>
</template>

<script>
import TopNavbar from '../components/TopNav.vue'
export default {
  components: {
    TopNavbar
  }
}
</script>
