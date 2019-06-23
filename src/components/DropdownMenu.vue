<template>
  <div class="relative">
    <div
      @click="menu = !menu"
      class="leading-snug tracking-tighter mr-4"
    >
      <svg
            v-if="!menu"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-more-vertical"
          >
            <circle
              cx="12"
              cy="12"
              r="1"
            ></circle>
            <circle
              cx="12"
              cy="5"
              r="1"
            ></circle>
            <circle
              cx="12"
              cy="19"
              r="1"
            ></circle>
          </svg>
      <svg
            v-if="menu"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-x"
          >
            <line
              x1="18"
              y1="6"
              x2="6"
              y2="18"
            ></line>
            <line
              x1="6"
              y1="6"
              x2="18"
              y2="18"
            ></line>
          </svg>
    </div>
    <div
      v-if="menu"
      class="absolute right-0 bg-white py-2 px-2 w-48 rounded-sm shadow"
      style="top: 34px;"
    >
      <slot/>
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
