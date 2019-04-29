<template>
  <div v-show="show">
    <div class="sidebar bg-gray-800 text-white absolute z-50 w-64 h-screen">
      Sidebar
    </div>
    <div class="w-screen h-screen z-40 bg-black opacity-25">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    show: Boolean
  }
}
</script>
