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
        <h1 class="text-3xl font-black text-gray-800 tracking-tight mb-6">Create a new note</h1>

        <div class="flex flex-col w-full mb-6">
          <label
            class="text-gray-600 tracking-tight mb-2"
            style="font-size: 0.875rem; font-weight: 700;"
          >
            TITLE
          </label>
          <input
            v-model="title"
            type="text"
            placeholder="Note Title"
            class="w-full text-xl text-gray-600 focus:text-gray-700 font-bold mr-4"
          >
          <p
            v-if="title.length > 10"
            style="font-size: 0.825rem;"
            class="lead-none text-red-500"
          >max. 10 letters</p>
        </div>

        <div class="flex flex-col w-full mb-6">
          <label
            class="text-gray-600 tracking-tight mb-2"
            style="font-size: 0.875rem; font-weight: 700;"
          >
            DETAILS
          </label>
          <textarea
            v-model="details"
            type="text"
            placeholder="Your note goes here..."
            class="w-full text-xl text-gray-600 focus:text-gray-700 font-bold mr-4"
          ></textarea>
          <p
            v-if="details.length > 60"
            style="font-size: 0.825rem;"
            class="lead-none text-red-500"
          >max. 60 letters</p>
        </div>

        <div class="mb-6">
          <label
            class="text-gray-600 tracking-tight mb-2"
            style="font-size: 0.875rem; font-weight: 700;"
          >
            DATE (OPTIONAL)
          </label>
          <input
            v-model="date"
            type="text"
            placeholder="Date"
            class="w-full text-xl text-gray-600 focus:text-gray-700 font-bold mr-4"
          >
        </div>
        <div class="mb-6">
          <label
            class="text-gray-600 tracking-tight mb-2"
            style="font-size: 0.875rem; font-weight: 700;"
          >
            TIME (OPTIONAL)
          </label>
          <input
            v-model="time"
            type="text"
            placeholder="Time"
            class="w-full text-xl text-gray-600 focus:text-gray-700 font-bold mr-4"
          >
        </div>

        <div>
          <button
            :disabled="isLoading"
            type="submit"
            class="rounded-lg text-white bg-blue-400 shadow-sm py-2 px-4 hover:shadow-lg"
          >ADD NOTE</button>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loader from './Loader.vue'
import ButtonClose from './ButtonClose.vue'
export default {
  name: 'CreateNote',
  data () {
    return {
      time: '',
      date: '',
      title: '',
      details: '',
      isLoading: false
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
    lastRoute () {
      return this.$route.query.lastRoute || '/space'
    },
    createForStack () {
      // returns stack id if note is created on a stack or null if note is stack-less (global)
      return this.$route.query.stack || null
    }
  },
  methods: {
    goBack () {
      // GO back to last route
      this.$router.push(this.lastRoute)
    },
    checkForm () {
      if (this.title && this.details) return true
      else return false
    },
    async handleSubmit () {
      this.isLoading = true
      if (this.checkForm()) {
        // Create Note Action
      }
      this.isLoading = false
    }
  },
  components: {
    Loader,
    ButtonClose
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

  input,
  textarea {
    border: none;
    background: transparent;
  }
}
</style>
