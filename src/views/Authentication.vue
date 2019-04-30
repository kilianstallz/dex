<template>
  <div
    v-if="isMobile"
    class="p-0 m-0 w-screen h-screen"
  >
    <mobileLogin
      v-if="!signUp"
      @switch="signUp = !signUp"
    />
    <sign-up
      v-else
      @switch="signUp = !signUp"
    />
  </div>
  <!-- Desktop Auth -->
  <!-- <div
    v-else-if="
      false"
      class="flex flex-row p-0 m-0"
      style="height: 100%; width: 100%"
    >
      <div
        class="flex flex-col justify-center align-middle text-center bg-blue-400 hidden md:flex"
        style="width: 50vw;"
      >
        <p class="text-2xl text-white">Welcome!</p>
      </div>
      <div class="flex flex-col justify-between flex-grow">
        <mobile-login
          v-if="!signUp"
          @switch="signUp = !signUp"
        />
        <sign-up
          v-if="signUp"
          @switch="signUp = !signUp"
        />
      </div>
  </div> -->
</template>

<script>
import mobileLogin from '../components/Auth/mobileLogin.vue'
import signUp from '../components/Auth/signUp.vue'
export default {
  name: 'Authentication',
  data () {
    return {
      signUp: false
    }
  },
  computed: {
    isMobile () {
      return window.innerWidth < 850
    }
  },
  components: {
    mobileLogin,
    signUp
  }
}
</script>

<style lang="scss">
button {
  height: 40px;
  outline: none;
}
</style>
