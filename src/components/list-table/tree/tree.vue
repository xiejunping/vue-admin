<template>
  <ul class="c-tree-ul">
    <li v-for="(item,index) in list" :key="item.id">
      <tree-row
        :columns="columns"
        :row="item"
        :level="level"
        :sign="getSpace(index)"
        @on-control="cron"
      ></tree-row>
      <tree
        v-if="item.children"
        :list="item.children"
        :columns="columns"
        :level="item.level"
        @on-control="cron"></tree>
    </li>
  </ul>
</template>

<script>
import Tree from './tree'
import TreeRow from './tree-row'
export default {
  name: 'tree',
  components: { Tree, TreeRow },
  computed: {
    getSpace () {
      return index => {
        return this.list.length - 1 === index
      }
    }
  },
  props: {
    list: {
      type: Array
    },
    columns: {
      type: Array
    },
    level: {
      type: Number,
      default () {
        return 0
      }
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

</style>
