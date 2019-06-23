<template>
  <aside class="fixed top-0 bottom-0 left-0 h-screen">
    <div
      id="left"
      class="column flex flex-col pt-4 pb-5"
    >
      <div
        class="ml-auto mr-6 p-0 text-gray-800 text-xl opacity-75"
        @click="toggleSidebar"
      >
        <img
          src="../assets/icons/x.svg"
          alt="Close"
        >
      </div>
      <div class="m-0 p-0">
        <router-link
          to="/space"
          class="item flex flex-row align-middle flex-grow my-1 mx-3 px-4 py-3"
          @click.native="toggleSidebar"
        >
          <span class="">🏡</span>
          <p class="flex-grow m-0 whitespace-no-wrap text-gray-700">Home</p>
        </router-link>
      </div>
      <div class="m-0 p-0">
        <router-link
          to="/stacks"
          class="item flex flex-row align-middle flex-grow my-1 mx-3 px-4 py-3"
          @click.native="toggleSidebar"
        >
          <span class="">📚</span>
          <p class="flex-grow m-0 whitespace-no-wrap text-gray-700">Stacks</p>
        </router-link>
      </div>
      <div class="m-0 p-0">
        <router-link
          to="/lists"
          class="item flex flex-row align-middle flex-grow my-1 mx-3 px-4 py-3"
          @click.native="toggleSidebar"
        >
          <span class="">📑</span>
          <p class="flex-grow m-0 whitespace-no-wrap text-gray-700">Lists</p>
        </router-link>
      </div>
      <div class="m-0 p-0">
        <router-link
          to="/notes"
          class="item flex flex-row align-middle flex-grow my-1 mx-3 px-4 py-3"
          @click.native="toggleSidebar"
        >
          <span class="">🗒</span>
          <p class="flex-grow m-0 whitespace-no-wrap text-gray-700">Notes</p>
        </router-link>
      </div>

      <div class="flex flex-grow"></div>

    </div>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  methods: {
    toggleSidebar () {
      this.$store.dispatch('toggleSidebar')
    }
  }
}
</script>

<style lang="scss">
aside {
  z-index: 9999;
}
.column {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgb(240, 237, 237);
  width: 200px;
  overflow-x: hidden;
  box-shadow: 4px 0px 8px rgba(0, 0, 0, 0.1);
}

.item {
  span {
    font-size: 1.25rem;
    margin-right: 16px;
    line-height: 1;
  }

  p {
    line-height: 1.25rem;
    font-weight: 400;
    font-size: 0.875rem;
    text-overflow: ellipsis;
  }
}
</style>
