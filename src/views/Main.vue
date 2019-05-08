<template>
  <div class="bg-gray-200 m-0 p-0 h-screen w-screen">
    <!-- notifications -->
    <!-- Sidebar Drawer -->
    <slide-left>
      <the-side-bar v-show="showSidebar" />
    </slide-Left>
    <!-- Top Navigation -->
    <top-navbar />
    <!-- Content -->
    <div
      class="bg-gray-200"
      style="margin: 0 5px 0 5px;"
    >
      <slide-down>
        <router-view v-if="!isLoading"></router-view>
      </slide-down>
      <div
        class="w-full flex flex-row mt-64"
        v-if="isLoading"
      >
        <loader class="mx-auto" />
      </div>
    </div>
    <!-- Bottom Navigation -->
    <slide-down>
      <bottom-nav v-show="!showSidebar" />
    </slide-down>
  </div>
</template>

<script>
import { SlideXLeftTransition, SlideYDownTransition } from 'vue2-transitions'
import { mapGetters, mapActions } from 'vuex'
import TopNavbar from '../components/TopNav.vue'
import Loader from '../components/Loader.vue'
import BottomNav from '../components/BottomNav/BottomNav.vue'
import TheSideBar from '../components/TheSideBar.vue'
export default {
  name: 'MainLayout',
  data () {
    return {}
  },
  methods: {
    ...mapActions(['toggleSidebar'])
  },
  computed: {
    isLoading () {
      if (this.user && !this.loadingStacks) return false
      else return true
    },
    ...mapGetters('user', ['user']),
    ...mapGetters('data', ['allStacks', 'loadingStacks']),
    ...mapGetters(['showSidebar'])
  },
  watch: {
    /**
     * @method user
     * @description watch the user getter from store, and if there is no user push to the login page
     */
    user (auth) {
      if (!auth) this.$router.push('/auth')
      if (auth) this.$store.dispatch('data/getAllStacks')
    }
  },
  components: {
    TopNavbar,
    BottomNav,
    TheSideBar,
    slideLeft: SlideXLeftTransition,
    slideDown: SlideYDownTransition,
    Loader
  }
}
</script>
