<template>
  <article
    @click="gotoCard"
    v-if="data"
    class="bg-gray-100 w-full shadow-sm rounded flex flex-row"
  >
    <div class="p-6 pb-4 flex flex-col flex-wrap flex-1">
      <div class="flex flex-1 mb-4">
        <h5 class="flex-1 font-bold text-gray-900">Schummler Trafo</h5>
        <h5
          class="text-gray-500 font-bold"
          :class="{'text-red-400': true}"
        >⌛ 9:40</h5>
      </div>
      <p class="text-gray-900">Lorem ipsum, dolor sit amet minima non nostrum asperiores cupiditate maxime enim culpa aut quasi ut. Corporis.</p>
      <div class="flex-1">
        <h5 class="text-gray-500 mt-3 font-bold">28 May</h5>
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
        let inner = { ...this.data[0] }
        return inner
      } else return null
    }
  },
  methods: {
    gotoCard () {
      this.$router.push('/deck/' + this.card.id)
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
