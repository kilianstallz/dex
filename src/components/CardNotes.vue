<template>
  <article
    @click="gotoCard"
    v-if="data"
    class="bg-gray-100 w-full shadow-sm rounded my-2 flex flex-row"
  >
    <div class="p-6 pb-4 flex flex-col flex-wrap flex-1">
      <div class="flex flex-1 mb-4">
        <h5 class="flex-1 font-bold text-gray-900"> {{card.title}} </h5>
        <h5
          v-if="card.time"
          class="text-gray-500 font-bold"
          :class="{'text-red-400': isTooLate}"
        >{{isTooLate ? "⌛" : "⏰"}} {{time}}</h5>
      </div>
      <p class="text-gray-900">{{card.details}}</p>
      <div class="flex-1">
        <h5 class="text-gray-500 mt-3 font-bold">{{month}}</h5>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    data: {
      default: () => null
    }
  },
  computed: {
    card () {
      if (this.data) {
        return this.data.data()
      } else return null
    },
    isTooLate () {
      if (this.card.time) {
        let date = new Date(this.card.time).getTime()
        let current = new Date().getTime()
        return (date <= current)
      } else return null
    },
    time () {
      if (this.card.time) {
        let date = new Date(this.card.time)
        date = new Intl.DateTimeFormat(navigator.language, { hour: 'numeric', minute: 'numeric' }).formatToParts(date)
        return `${date[0].value}${date[1].value}${date[2].value}`
      } else return null
    },
    month () {
      if (this.card.time) {
        let date = new Date(this.card.time)
        date = new Intl.DateTimeFormat(navigator.language, { day: 'numeric', month: 'long' }).formatToParts(date)
        return `${date[0].value}${date[1].value} ${date[2].value}`
      } else return null
    }
  },
  methods: {
    gotoCard () {
      this.$router.push('/note/' + this.data.id)
    }
  }
}
</script>

<style lang="scss" scoped>
article {
  &:hover,
  &:focus {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
}
</style>
