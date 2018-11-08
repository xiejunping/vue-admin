<template>
  <div class="c-tags-nav">
    <div class="c-close-con">
      <Dropdown transfer @on-click="handleTagsOption">
        <Button type="text" size="small">
          <Icon :size="18" type="ios-close-circle-outline" />
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="close-all">关闭所有</DropdownItem>
          <DropdownItem name="close-others">关闭其他</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div class="c-btn-con btn-left">
      <Button type="text" @click="handleScroll(240)">
        <Icon :size="18" type="ios-arrow-back" />
      </Button>
    </div>
    <div class="c-btn-con btn-right">
      <Button type="text" @click="handleScroll(-240)">
        <Icon :size="18" type="ios-arrow-forward" />
      </Button>
    </div>
    <div class="c-tag" ref="scrollOuter" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
      <div class="c-tag-body" ref="scrollBody" :style="{left: tagBodyLeft + 'px'}">
        <transition-group>
          <Tag
            type="dot"
            ref="tagsPageOpened"
            class="c-nav"
            v-for="(item, index) in list"
            :key="`tag-nav-${index}`"
            :name="item.name"
            @on-close="handleClose(item)"
            @click.native="handleClick(item)"
            :closable="item.name !== homeName"
            :color="isCurrentTag(item) ? 'primary' : 'default'">
            {{item.meta.title}}
          </Tag>
        </transition-group>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from '../../mixin'
import beforeClose from '@/router/before-close'
import { homeName } from '@/router/config'
import { routeEqual } from '@/common/lib/tools'
export default {
  name: 'nav-tags',
  mixins: [ mixin ],
  props: {
    value: Object,
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      homeName,
      tagBodyLeft: 0
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
    },
    handleClose (current) {
      if (current.meta && current.meta.beforeCloseName && current.meta.beforeCloseName in beforeClose) {
        new Promise(beforeClose[current.meta.beforeCloseName]).then(close => {
          if (close) {
            this.close(current)
          }
        })
      } else {
        this.close(current)
      }
    },
    close (route) {
      let res = this.list.filter(item => !routeEqual(route, item))
      this.$emit('on-close', res, undefined, route)
    },
    handleClick (item) {
      this.turnToPage(item)
    },
    handleTagsOption (type) {
      if (type.includes('all')) {
        // 关闭所有，除了home
        let res = this.list.filter(item => item.name === homeName)
        this.$emit('on-close', res, 'all', homeName)
      } else if (type.includes('others')) {
        // 关闭除当前页和home页的其他页
        let res = this.list.filter(item => this.isCurrentTag(item) || item.name === homeName)
        this.$emit('on-close', res, 'others', this.currentRouteObj)
        setTimeout(() => {
          this.getTagElementByName(this.currentRouteObj.name)
        }, 100)
      }
    },
    handlescroll (e) {
      const type = e.type
      let delta = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40
      }
      this.handleScroll(delta)
    },
    handleScroll (offset) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
      } else {
        if (outerWidth < bodyWidth) {
          if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
            this.tagBodyLeft = this.tagBodyLeft
          } else {
            this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth)
          }
        } else {
          this.tagBodyLeft = 0
        }
      }
    },
    /**
     * 横向滚动条自动定位
     */
    moveToView (tag) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (bodyWidth < outerWidth) {
        this.tagBodyLeft = 0
      } else if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft
      } else if (tag.offsetLeft > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth <= -this.tagBodyLeft + outerWidth) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(0, outerWidth - tag.offsetWidth - tag.offsetLeft)
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(tag.offsetLeft - (outerWidth - tag.offsetWidth))
      }
    },
    getTagElementByName (name) {
      this.$nextTick(() => {
        this.refsTag = this.$refs.tagsPageOpened
        this.refsTag.forEach((item, index) => {
          if (name === item.name) {
            let tag = this.refsTag[index].$el
            this.moveToView(tag)
          }
        })
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.c-tags-nav
  position relative
  z-index 98
  width 100%
  height 43px
  background-color #efefef
  .c-close-con, .c-btn-con
    position absolute
    z-index 97
    height 100%
    line-height 38px
    background-color #ffffff
  .c-close-con
    width 32px
    right 0
    padding-top 2px
  .c-btn-con
    width 28px
    button
      text-align center
      padding 6px 3px
    &.btn-left
      left 0
    &.btn-right
      right 32px
      border solid 1px #efefef
  .c-tag
    position absolute
    z-index 92
    left 28px
    right 61px
    box-shadow 0px 0 3px 2px rgba(100, 100, 100, .1) inset
  .c-tag-body
    display inline-block
    position absolute
    z-index 90
    overflow visible
    white-space nowrap
    transition left .3s ease
    text-align left
  .c-nav
    display inline-block
    line-height 28px
    padding 0 10px
    margin-top 7px
    background-color #ffffff
    border-top-left-radius 4px
    border-top-right-radius 4px
    margin-right 5px
    &:first-child
      margin-left 5px
</style>
