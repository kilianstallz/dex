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
  }
}
</script>
