<template>
  <div class="close-btn">
    <svg
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
</template>

<script>
export default {
  name: 'buttonClose'
}
</script>

<style lang="scss">
.close-btn {
  height: 1.25rem;
  width: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  transition: all 0.25s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;

  .close {
    fill: #a19f9f;
    width: 13px;
    height: 13px;
    overflow: visible;
  }

  &:hover {
    transform: rotate(360deg);
  }

  &:focus {
    transform: rotate(360deg);
  }
}
</style>
