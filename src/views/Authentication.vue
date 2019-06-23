<template>
  <div class="p-0 m-0 w-screen h-screen">
    <div
      v-if="!isLoading"
      class="p-0 m-0 w-screen h-screen"
    >
      <auth-form-login
        v-if="!signUp"
        @switch="signUp = !signUp"
      />
      <auth-form-sign-up
        v-else
        @switch="signUp = !signUp"
      />
    </div>
    <div
      v-else
      class="w-full h-full flex mx-auto justify-center"
    >
      <loader />
    </div>
  </div>
</template>

<script>
import AuthFormLogin from '../components/Auth/AuthFormLogin.vue'
import AuthFormSignUp from '../components/Auth/AuthFormSignUp.vue'
import Loader from '../components/Loader.vue'
import { mapGetters } from 'vuex'
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
    },
    ...mapGetters(['isLoading']),
    ...mapGetters('user', ['user'])

  },
  watch: {
    user (auth) {
      if (auth) this.$router.push('/')
    }
  },
  components: {
    AuthFormLogin,
    AuthFormSignUp,
    Loader
  }
}
</script>

<style lang="scss">
button {
  height: 40px;
  outline: none;
}
</style>
