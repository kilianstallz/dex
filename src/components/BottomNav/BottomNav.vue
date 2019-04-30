<template>
  <div class="fixed bottom-0 left-0 right-0 w-screen text-gray-900 z-40">
    <nav class="w-full bg-white">
      <div>S</div>
      <div>Se</div>
      <div
        class="bg-blue-400 rounded my-4"
        style="width: 45px; height: 30px;"
      >
        <div class=" plus mx-auto leading-tight z-50 text-2xl text-white">+</div>
      </div>
      <div>N</div>
      <div>P</div>
    </nav>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
nav {
  border-radius: 16px 16px 0 0;
  height: 64px;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: auto;
  align-items: center;

  div {
    height: 16px;
    display: flex;
    margin: 0 auto;
  }
}
</style>
