<template>
  <div class="h-full flex flex-col text-center justify-around align-middle w-64 mx-auto">
    <h2 class="text-2xl font-bold text-gray-800">Welcome back!</h2>
    <form
      @submit.prevent="login"
      class="flex flex-col"
    >
      <div
        class="bg-red-200 border-red-500 border-2 mb-1 py-2 rounded-sm tracking-tight leading-tight text-red-900"
        style="font-size: 14px;"
        v-if="error"
      >{{error}}</div>
      <label-list class="text-left">LOGIN</label-list>
      <input
        class="shadow p-2 px-4 rounded my-1"
        type="email"
        placeholder="Email"
        v-model="email"
        required
      >
      <input
        class="shadow p-2 px-4 rounded my-1"
        placeholder="Password"
        type="password"
        v-model="password"
        required
      >
      <button
        type="submit"
        class=" bg-blue-600 shadow text-white px-4 rounded mt-4 mb-1"
      >Sign In</button>
      <!-- GOOGLE Sign In -->
      <button
        @click="loginGoogle"
        type="button"
        class="googleButton bg-white p-0 pl-2 shadow rounded text-gray-800 my-1 w-64 flex flex-row"
      ><img
          src="@/assets/btn_google_light_normal_ios.svg"
          alt="Google Login"
          height="40px"
          width="40px"
        ><span
          class="my-auto font-medium"
          style="margin-left: 24px; font-size: 14px;"
          @click="$store.dispatch('user/signInWithGoogle')"
        >Sign in with Google</span></button>
    </form>
    <a
      @click="switchForm"
      class="mt-6"
      style="cursor: pointer;"
    >New here? Sign up for a new account!</a>
  </div>
</template>

<script>
import labelList from '../labelList.vue'
export default {
  name: 'mobileLogin',
  data () {
    return {
      error: '',
      email: '',
      password: ''
    }
  },
  methods: {
    checkForm () {
      if (this.email && this.password) {
        return true
      } else return false
    },
    async login () {
      this.$store.state.isLoading = true
      if (await this.checkForm()) {
        await this.$store.dispatch('user/login', { email: this.email, password: this.password })
        this.$router.push('/')
      } else {
        // TASK: Implement Notifications
      }
      this.$store.state.isLoading = false
    },
    async loginGoogle () {
    },
    switchForm () {
      this.$emit('switch')
    }
  },
  components: {
    labelList
  }
}
</script>

<style lang="scss" scoped>
input {
  height: 40px;
  outline: none;
}
input:focus {
  outline: none;
}
</style>
