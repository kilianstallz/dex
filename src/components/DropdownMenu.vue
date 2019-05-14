<template>
  <div class="relative">
    <span
      @click="menu = !menu"
      class="leading-snug tracking-tighter mr-4"
    >
      <slot
        v-if="!menu"
        name="open"
      />
      <slot
        v-if="menu"
        name="close"
      />
    </span>
    <div
      v-if="menu"
      class="absolute right-0 bg-white py-2 px-2 w-48 rounded-sm shadow"
      style="top: 34px;"
    >
      <slot name="menu" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropdownMenu',
  data () {
    return {
      menu: false
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  li {
    padding: 8px 8px;
    width: 100%;
    display: block;
    border-radius: 5px;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
