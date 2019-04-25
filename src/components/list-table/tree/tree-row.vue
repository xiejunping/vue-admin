<template>
  <Row class="c-tree-tr" :gutter="12">
    <Col
      v-for="(col,id) in columns"
      :key="id"
      :span="col.width"
      :class="textAlign(col.align)">
      <Input v-if="col.key === 'order'" size="small" number v-model="row[col.key]" />
      <template v-else-if="col.key === 'name' || col.key === 'title'">
        <span v-if="level" class="c-name-space">{{snap(level, sign)}}{{row[col.key]}}</span>
        <span v-else>{{row[col.key]}}</span>
      </template>
      <template v-else-if="col.key === 'icon'">
        <Icon :type="row[col.key]" size="18" />
      </template>
      <span v-else-if="col.key === 'type'">{{row[col.key] | getType}}</span>
      <span v-else-if="col.key === 'status'" :class="{'g-text-success': row[col.key], 'g-text-error': !row[col.key]}">{{row[col.key] | getStatus}}</span>
      <template v-else-if="col.key === 'control'">
        <a @click.prevent="$emit('on-control', {type: 'add', id: row.id})">添加子权限</a> |
        <a @click.prevent="$emit('on-control', {type: 'edit', id: row.id})">修改</a> |
        <a @click.prevent="$emit('on-control', {type: 'del', id: row.id})">删除</a>
      </template>
      <span v-else>{{row[col.key]}}</span>
    </Col>
  </Row>
</template>

<script>
import { isEmpty } from '@/common/lib/utils'
export default {
  name: 'treeRow',
  props: {
    row: {
      type: Object
    },
    columns: {
      type: Array
    },
    level: {
      type: Number
    },
    sign: {
      type: Boolean
    }
  },
  computed: {
    snap () {
      return (level, sign) => {
        let html = ''
        const normalSign = '├─ '
        const bottomSign = '└─ '
        const deepSign = '│ '
        let spaceHtml = '      '
        for (let i = 0; i < level; i++) {
          if (i === level - 1) html += `${spaceHtml}${sign ? bottomSign : normalSign}`
          else html += `${spaceHtml}${deepSign}`
        }
        return html
      }
    }
  },
  filters: {
    getType (val) {
      return val === 'URL' ? '菜单' : val
    },
    getStatus (val) {
      return val === 1 ? '启用' : '禁用'
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

.c-tree-tr
  height 40px
  line-height 40px
  &:hover
    background-color #f8f8f8
  .c-align-left
    text-align left
  .c-align-right
    text-align right
  .c-name-space
    white-space pre
</style>
