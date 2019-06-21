<template>
  <div class="grid-card">
    <img src="@/assets/icons/book.svg">
    <div class="flex-1"></div>
    <h1>All</h1>
    <span>20 Tasks</span>
  </div>
</template>

<script>
export default {
  name: 'ListGridCard',
  mounted () {
    this.$store.dispatch('updateTitle', 'Lists')
  }
}
</script>

<style lang="scss" scoped>
.grid-card {
  width: 100%;
  height: 170px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 14px;
  padding-top: 18px;
  border-radius: 12px;
  background: white;
  &:hover {
    box-shadow: 0px 2px 16px rgba(0,0,0,0.1);
  }
  img {
    height: 36px;
  }
  h1 {
    font-size: 24px;
    line-height: 1.1;
  }
  span {
    font-size: 14px;
    color: gray;
  }
}
</style>
