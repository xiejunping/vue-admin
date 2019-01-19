<template>
  <Row class="c-tree-th" :gutter="12">
    <Col
      v-for="(col, id) in data"
      :key="id"
      :span="col.width"
      :class="textAlign(col.align)">
      <span>{{col.title}}</span>
    </Col>
  </Row>
</template>

<script>
import { isEmpty } from '@/common/lib/utils'
export default {
  name: 'listHead',
  props: {
    data: {
      type: Array
    }
  },
  methods: {
    textAlign (align) {
      let className = ''
      if (typeof align === 'string' && !isEmpty(align)) {
        align = align.toLowerCase()
        if (align === 'left') className = 'c-align-left'
        else if (align === 'right') className = 'c-align-right'
      }
      return className
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/common/styles/mixin.styl"
.c-tree-th
  height 40px
  line-height 40px
  background-color #efefef
  .c-align-left
    text-align left
  .c-align-right
    text-align right
</style>
