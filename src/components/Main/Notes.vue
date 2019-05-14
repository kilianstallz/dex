<template>
  <div>
    <div v-if="data && data.length > 0">
      <c-label>MY NOTES</c-label>
      <div>
        <note
          v-for="note in data"
          :key="note.id"
          :data="note"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { notesCollection } from '../../firebaseConfig'
import { mapGetters } from 'vuex'
import labelList from '../labelList.vue'
import Note from '../CardNotes.vue'
export default {
  name: 'Notes',
  components: {
    cLabel: labelList,
    Note
  },
  data () {
    return {
      data: null
    }
  },
  computed: {
    ...mapGetters('user', ['user'])
  },
  mounted () {
    notesCollection.where('creator', '==', this.user.uid).where('archived', '==', 'false').orderBy('created', 'desc').onSnapshot({
      includeMetadataChanges: true
    }, querySnapshot => {
      let notes = []
      querySnapshot.forEach(doc => {
        notes.push(doc)
      })
      this.data = notes
      console.log(notes)
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
