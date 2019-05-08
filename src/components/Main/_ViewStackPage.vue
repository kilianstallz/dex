<template>
  <div>YO</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ViewStack',
  computed: {
    id () {
      return this.$route.params.id
    },
    ...mapGetters('data', ['singleStack'])
  }
}
</script>
