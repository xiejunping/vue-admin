<template>
  <div class="c-table-tree">
    <Spin size="large" fix v-if="spin" />
    <list-head :data="columns"></list-head>
    <div class="c-tree-body">
      <tree :list="data" :columns="columns" @on-control="cron"></tree>
    </div>
  </div>
</template>

<script>
import ListHead from './list-head'
import Tree from './tree/tree'
export default {
  name: 'lisTable',
  components: { ListHead, Tree },
  props: {
    columns: {
      type: Array
    },
    data: {
      type: Array
    },
    spin: {
      type: Boolean
    }
  },
  methods: {
    cron (param) {
      this.$emit('on-control', param)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/common/styles/mixin.styl"
.c-table-tree
  position relative
  text-align center
  margin-bottom 24px
  .c-tree-body
    background-color #fff
    padding 6px
    margin -6px
    border-left solid 1px #eee
    border-right solid 1px #eee
    border-bottom solid 1px #eee
</style>
