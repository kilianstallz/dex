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
  font-weight: bold;
}
@media (max-width: 475px) {
  .label {
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 1.2px;
  }
}
</style>
