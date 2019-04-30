<template>
  <div class="h-full flex flex-col text-center justify-center align-middle w-64 mx-auto">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Sign Up</h2>
    <form
      @submit.prevent="signUp"
      class="flex flex-col"
    >
      <div
        class="bg-red-200 border-red-500 border-2 mb-1 py-2 rounded tracking-tight leading-tight text-red-900"
        style="font-size: 14px;"
        v-if="error"
      >{{error}}</div>
      <label-list class="text-left">YOUR NAME</label-list>
      <input
        class="shadow p-2 px-4 rounded my-1"
        type="text"
        placeholder="First Name"
        v-model="firstName"
        required
      >
      <input
        class="shadow p-2 px-4 rounded my-1"
        type="text"
        placeholder="Last Name"
        v-model="lastName"
        required
      >
      <label-list class="text-left">YOUR EMAIL</label-list>
      <input
        class="shadow p-2 px-4 rounded my-1"
        type="email"
        placeholder="Email"
        v-model="email"
        required
      >
      <label-list class="text-left">ENTER PASSWORD</label-list>
      <input
        class="shadow p-2 px-4 rounded my-1"
        placeholder="Password"
        type="password"
        v-model="password"
        required
      >
      <input
        class="shadow p-2 px-4 rounded mt-1 mb-4"
        placeholder="Repeat Password"
        type="password"
        v-model="passwordRep"
        required
      >
      <button
        type="submit"
        class="shadow bg-blue-600 p-2 rounded text-white mb-1 focus:border-gray-800 focus:shadow-lg"
      >Sign Up</button>
      <!-- GOOGLE Sign In -->
      <button
        @click="loginGoogle"
        type="button"
        class="googleButton shadow bg-white p-0 pl-2 rounded text-gray-800 my-1 w-64 flex flex-row focus:border-gray-800 focus:shadow-lg"
      ><img
          src="@/assets/btn_google_light_normal_ios.svg"
          alt="Google Login"
          height="40px"
          width="40px"
        ><span
          class="my-auto font-medium"
          style="margin-left: 24px; font-size: 14px;"
        >Sign in with Google</span></button>

      <p
        class="leading-tight text-gray-900 mt-4"
        style="font-size: 14px;"
        @click="switchForm"
      >You already have an account? <br /> <span class="font-bold">Login here!</span></p>
    </form>
  </div>
</template>

<script>
import labelList from '../labelList.vue'
export default {
  name: 'mobileLogin',
  data () {
    return {
      error: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordRep: ''
    }
  },
  methods: {
    checkForm () {
      if (this.firstName && this.lastName && this.email && (this.password === this.passwordRep)) return true
      else return false
    },
    async signUp () {
      if (this.checkForm()) {
      }
    },
    async loginGoogle () {
    },
    switchForm () {
      this.$emit('switch')
    }
  },
  computed: {
    displayName () {
      return `${this.firstName} ${this.lastName}`
    }
  },
  components: {
    labelList
  }
}
</script>

<style lang="scss" scoped>
.googleButton {
  border: 1px solid #d1d1d1;
}
</style>
