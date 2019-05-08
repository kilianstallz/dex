<template>
  <router-view></router-view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    isLoading () {
      if (this.user) return false
      else return true
    },
    ...mapGetters('user', ['user'])
  },
  watch: {
    /**
     * @method user
     * @description watch the user getter from store, and if there is no user push to the login page
     */
    user (auth) {
      if (!auth) this.$router.push('/auth')
    }
  }
}
</script>
