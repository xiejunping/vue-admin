<template>
  <div class="c-tags-nav">
    <div class="c-tag">
      <transition-group>
        <div
          class="c-nav"
          v-for="(item, index) in list"
          :key="`tag-nav-${index}`"
          :name="item.name">
          <i :class="['c-dot', isCurrentTag(item) ? 'active' : '']"></i>
          {{item.meta.title}}
          <Icon type="md-close" class="c-close" />
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script>
import { routeEqual } from '@/common/lib/tools'
export default {
  name: 'nav-tags',
  props: {
    value: Object,
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    currentRouteObj () {
      const { name, params, query } = this.value
      return { name, params, query }
    }
  },
  methods: {
    isCurrentTag (item) {
      return routeEqual(this.currentRouteObj, item)
    }
  }
}
</script>
<style lang="stylus" scoped>
.c-tags-nav
  width: 100%
  height: 40px
  .c-tag
    text-align: left
  .c-nav
    display: inline-block
    line-height: 28px
    padding: 0 10px
    margin-top: 7px
    background-color: #ffffff
    border-top-left-radius: 4px
    border-top-right-radius: 4px
    margin-right: 4px
  .c-close
    padding: 0 2px 0 6px
    margin-top: -2px
    border-radius: 50%
    &:hover
      color: #2d8cf0
  .c-dot
    display: inline-block
    width: 11px
    height: 11px
    border-radius: 50%
    background-color: #e8eaec
    margin-right: 4px
    top: 1px
    position: relative
    &.active
      background-color: #2d8cf0
</style>
