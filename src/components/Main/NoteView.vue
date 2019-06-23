<template>
  <div
    class="p-4"
    v-if="note"
  >
    <!-- Header Wrapper -->
    <div class="flex flex-row">
      <!-- Title -->
      <h1 class="text-2xl">{{note.title}}</h1>
      <!-- Archive Icon -->
      <span
        v-if="!note.archived"
        class="ml-2 my-auto text-sm uppercase bg-gray-500 text-white px-2 rounded-full"
      >Archived</span>

      <!-- Spacer -->
      <div class="flex-grow"></div>

      <!-- Dropdown goes here -->
      <dropdown-menu>
          <ul>
            <li>Edit</li>
            <li>Archive</li>
            <li>Delete</li>
          </ul>
      </dropdown-menu>

    </div>

    <!-- Deadline if given -->
    <div
      v-if="note.time"
      class="text-gray-500 font-bold tracking-wide mb-4"
    >🗓 {{ deadline }}</div>

    <div class="border-b-2 border-gray-300 w-full mb-4"></div>

    <!-- Note Content -->
    <div class="leading-loose text-lg text-gray-900">
      <pre class="font-sans">{{note.details}}</pre>
    </div>
  </div>
</template>

<script>
import DropdownMenu from '../DropdownMenu.vue'
import { notesCollection } from '../../firebaseConfig'
export default {
  name: 'NoteView',
  data () {
    return {
      note: null,
      menu: false
    }
  },
  computed: {
    noteId () {
      const { noteId } = this.$route.params
      if (noteId) return noteId
      else return null
    },
    deadline () {
      if (this.note.time) {
        let date = new Date(this.note.time)
        return new Intl.DateTimeFormat(navigator.language, { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' }).format(date) || date.toISOString()
      } else return null
    }
  },
  mounted () {
    notesCollection.doc(this.noteId).onSnapshot(documentSnapshot => {
      if (documentSnapshot.exists === false) {
        return this.$router.push('/space')
      }
      this.note = documentSnapshot.data()
      this.note.archived ? this.$store.state.navbarTitle = 'Note' : this.$store.state.navbarTitle = 'Archive'
    })
  },
  components: {
    DropdownMenu
  }
}
</script>

<style lang="scss" scoped>
</style>
