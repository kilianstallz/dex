<template>
  <div>
    <div
      class="border-2 overflow-scroll p-4 rounded bg-white shadow"
      style="width: 280px; height: 280px;"
    >
      <div class="flex">
        <input
          type="text"
          class="flex-1 rounded border-2 py-2 px-4 outline-none focus:shadow-outline w-full"
          v-model="search"
        >
      </div>
      <div
        v-for="(emojiGroup, category) in emojis"
        :key="category"
      >
        <h5 class="text-gray-900 uppercase text-sm cursor-default mb-2 mt-4">{{category}}</h5>
        <div class="flex flex-wrap justify-start emojis">
          <div
            class="p-1 cursor-pointer rounded focus:outline-none flex items-center justify-center h-8 w-8"
            v-for="(emoji, emojiName) in emojiGroup"
            :key="emojiName"
            @click="insert(emoji)"
            :title="emojiName"
          >{{emoji}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emojiTable from './emojis'
export default {
  data () {
    return {
      emojiTable,
      search: ''
    }
  },
  computed: {
    emojis () {
      if (this.search) {
        const obj = {}

        for (const category in this.emojiTable) {
          obj[category] = {}

          for (const emoji in this.emojiTable[category]) {
            if (new RegExp(`.*${this.search}.*`).test(emoji)) {
              obj[category][emoji] = this.emojiTable[category][emoji]
            }
          }

          if (Object.keys(obj[category]).length === 0) {
            delete obj[category]
          }
        }

        return obj
      }

      return this.emojiTable
    }
  },
  methods: {
    insert (emoji) {
      this.$emit('emoji', emoji)
    }
  }
}
</script>
