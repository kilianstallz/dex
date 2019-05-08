<template>
  <article
    @click="gotoCard"
    v-if="data"
    class="bg-gray-100 w-full shadow-sm rounded flex flex-row"
  >
    <div class="flex flex-col flex-wrap flex-1">
      <h3 class="mx-auto my-auto break-words text-gray-900 leading-none font-bold text-xl">{{card.name}}</h3>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    card () {
      if (this.data) {
        let inner = { ...this.data }
        return inner[0]
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
  height: 128px;

  &:hover,
  &:focus {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  p {
    margin-left: 15px;
    margin-right: 36px;
  }
}
</style>
