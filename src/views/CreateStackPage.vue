<template>
  <div class="wrapper w-screen h-screen">
    <button-close
      @click.native="goBack"
      class="close-btn absolute"
    />
    <div
      v-if="isLoading"
      class="w-full h-full flex justify-center"
    >
      <loader class="mx-auto" />
    </div>
    <div
      v-else
      class="form"
    >
      <form
        @submit.prevent="handleSubmit"
        class="form-inner flex flex-col flex-auto"
      >
        <h1 class="text-3xl font-black text-gray-800 tracking-tight mb-6">Create a new stack</h1>

        <div class="flex flex-col w-full mb-6">
          <label
            class="text-gray-600 tracking-tight mb-2"
            style="font-size: 0.875rem; font-weight: 700;"
          >
            NAME YOUR STACK
          </label>
          <input
            v-model="fullName"
            type="text"
            placeholder="Like 'Applied Electronics'"
            class="w-full text-xl text-gray-600 focus:text-gray-700 font-bold mr-4"
          >
          <p
            v-if="fullName.length > 24"
            style="font-size: 0.825rem;"
            class="lead-none text-red-500"
          >max. 24 letters</p>
        </div>

        <div class="flex flex-col w-full mb-6">
          <label
            class="text-gray-600 tracking-tight mb-2"
            style="font-size: 0.875rem; font-weight: 700;"
          >
            CHOOSE A SHORTHAND
          </label>
          <input
            v-model="shortHand"
            type="text"
            placeholder="Like 'AE'"
            class="w-full text-xl text-gray-600 focus:text-gray-700 font-bold mr-4"
          >
          <p
            v-if="shortHand.length > 8"
            style="font-size: 0.825rem;"
            class="lead-none text-red-500"
          >max. 8 letters</p>
        </div>

        <div class="mb-6 relative">
          <label
            class="text-gray-600 tracking-tight mb-2"
            style="font-size: 0.875rem; font-weight: 700;"
          >
            SELECT AN ICON
          </label>
          <input
            v-model="icon"
            @focus="showPicker = true"
            type="text"
            placeholder="Icon"
            class="w-full text-xl text-gray-600 focus:text-gray-700 font-bold mr-4"
          >
          <emoji-picker
            v-show="showPicker"
            class="absolute"
            @emoji="selectEmoji"
          ></emoji-picker>
        </div>

        <div>
          <button
            :disabled="isLoading"
            type="submit"
            class="rounded-lg text-white bg-blue-400 shadow-sm py-2 px-4 hover:shadow-lg"
          >CREATE STACK</button>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
import EmojiPicker from '../components/EmojiPicker/EmojiPicker.vue'
import { mapGetters } from 'vuex'
import Loader from '../components/Loader.vue'
import ButtonClose from '../components/ButtonClose.vue'
export default {
  name: 'CreateView',
  data () {
    return {
      icon: '',
      fullName: '',
      shortHand: '',
      showPicker: false,
      search: '',
      isLoading: false
    }
  },
  computed: {
    ...mapGetters('user', ['user'])
  },
  methods: {
    goBack () {
      this.$router.push('/space')
    },
    selectEmoji (e) {
      this.icon = e
      this.showPicker = false
    },
    checkForm () {
      if (this.icon && this.fullName && this.shortHand && this.icon) return true
      else return false
    },
    async handleSubmit () {
      this.isLoading = true
      if (this.checkForm()) {
        console.log('submit')
        // Handle Submit in store
        const stack = { icon: this.icon, shortName: this.shortHand, fullName: this.fullName }
        await this.$store.dispatch('data/createStack', { stack: stack })
        await this.$store.dispatch('data/getAllStacks')
        await console.log('stack created')
      }
      this.isLoading = false
    }
  },
  components: {
    Loader,
    ButtonClose,
    EmojiPicker
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  flex-grow: 1;
  padding-top: 32px;

  .close-btn {
    position: absolute;
    top: 32px;
    right: 20px;
  }

  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    text-align: unset;
    justify-content: flex-start;
    max-width: 500px;
    padding: 32px 32px 80px;
  }

  input {
    border: none;
    background: transparent;
  }
}
</style>
