<template>
  <article
    @click="gotoCard"
    v-if="data"
    class="bg-gray-100 w-full shadow-sm rounded flex flex-row"
  >
    <i class="text-2xl my-auto">{{card.icon}}</i>
    <div class="mt-5 text flex flex-col flex-1">
      <h3 class="text-gray-900 leading-none font-bold text-xl">{{card.shortName}}</h3>
      <p class="text-base text-gray-500 mt-1 tracking-normal">{{card.fullName}}</p>
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
        return this.data
      } else return null
    }
  },
  methods: {
    gotoCard () {
      this.$router.push('/stack/' + this.card.id)
    }
  }
}
</script>

<style lang="scss" scoped>
article {
  height: 84px;
  margin-top: 12px;
  margin-bottom: 12px;

  &:hover,
  &:focus {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  i {
    margin-left: 15px;
    margin-right: 36px;
  }
}
</style>
