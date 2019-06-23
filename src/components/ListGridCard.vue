<template>
  <div class="grid-card" @click="click">
    <p class="icon text-2xl">{{icon}}</p>
    <div class="flex-1"></div>
    <h1>{{name}}</h1>
    <span>{{count}}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class ListGridCard extends Vue {
  @Prop()
  id!: string
  @Prop({required: true})
  name!: string
  @Prop({required: false})
  count!: string
  @Prop({required: true})
  icon!: string
  @Prop()
  to!: string

  click () {
    if (this.id) {
      this.$router.push({ path: `/list/${this.id}` })
    }
    if (this.to) {
      this.$router.push({path: this.to})
    }
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
  h1 {
    font-size: 24px;
    line-height: 1.1;
    max-width: 100%;
    word-wrap: break-word;
    word-break: break-all;
  }
  span {
    font-size: 14px;
    color: gray;
  }
}
</style>
