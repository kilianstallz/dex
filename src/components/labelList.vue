<template>
  <b class="label">
    <slot></slot>
  </b>
</template>

<script>
export default {
  name: 'labelList'
}
</script>

<style lang="scss" scoped>
.label {
  display: block;
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: calc(17px - 5px);
  font-size: 14px;
  line-height: 16px;
  color: #718096;
  text-transform: uppercase;
  font-weight: bold;
}
</style>
