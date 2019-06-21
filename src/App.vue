<template>
  <div
    id="app"
    class="bg-gray-200"
  >
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    checkStatus () {
      // console.log(navigator.onLine ? 'Online' : 'Offline')
      this.$store.state.isOffline = !navigator.onLine
    }
  },
  created () {
    window.addEventListener('load', this.checkStatus)
    window.addEventListener('online', this.checkStatus)
    window.addEventListener('offline', this.checkStatus)
  },
  destroyed () {
    window.removeEventListener('load', this.checkStatus)
    window.removeEventListener('offline', this.checkStatus)
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Roboto", "Ubuntu", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  height: 100vh;
  font-size: 16px;
}
</style>
