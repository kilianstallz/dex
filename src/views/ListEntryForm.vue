<template>
  <div style="height: 100vh;" class="h-full w-full">
    <header class="flex">
      <h1 class="text-xl mx-auto" style="margin-top: 20px;">New Task</h1>
      <img class="absolute" src="../assets/icons/x.svg" alt="Close">
    </header>
    <main class="mt-12">
      <form>
        <c-label>What are you planning?</c-label>
        <textarea name="details" id="details"></textarea>
        <div class="flex my-4 mt-8 mx-4 align-middle">
          <img class="mr-8" src="../assets/icons/bell.svg" alt="Bell">
          <span class="tracking-wide opacity-50">May 26, 14:00</span>
        </div>
        <div class="flex my-4 mx-4 align-middle">
          <img class="mr-8" src="../assets/icons/bell.svg" alt="Bell">
          <span class="tracking-wide opacity-50">Add note</span>
        </div>
        <div class="flex my-4 mx-4 align-middle">
          <img class="mr-8" src="../assets/icons/bell.svg" alt="Bell">
          <span class="tracking-wide opacity-50">Category</span>
        </div>
      </form>
    </main>
    <div class="create fixed bg-primary text-white">
      <span>Create</span>
    </div>
  </div>
</template>

<script>
import cLabel from '@/components/labelList'
export default {
  name: 'NewTask',
  data () {
    return {}
  },
  components: {
    cLabel
  }
}
</script>

<style lang="scss" scoped>
header {
  img {
    top: 20px;
    right: 12px;
  }
}
main {
  padding-top: 0;
  padding-left: 16px;
  padding-right: 16px;
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    #details {
      margin-left: 12px;
      margin-right: 12px;
      background: none;
      outline: none;
      min-height: 180px;
      border-bottom: 1px solid #718096;
    }
    span {
      font-size: 18px;
    }
  }
}
.create {
  position: fixed;
  display: flex;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  justify-content: center;
  align-items: center;
  span {
    font-size: 18px;
  }
}
</style>
