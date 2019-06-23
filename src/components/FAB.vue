<template>
  <div
    class="fab h-16 w-16 rounded-full flex align-middle justify-center"
    :style="{background: `${color}`}"
  >
    <img src="../assets/icons/plus.svg" alt="add">
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#2962ff'
    }
  }
}
</script>


<style lang="scss">
.fab {
  position: fixed;
  width: 64px;
  height: 64px;
  bottom: 16px;
  left: calc(50vw - 32px);
  right: auto;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.08);
  z-index: 4;
  &:active {
    box-shadow: none;
  }
}
@media (min-width: 500px) {
  .fab {
    left: auto;
    right: 16px;
  }
}
</style>
