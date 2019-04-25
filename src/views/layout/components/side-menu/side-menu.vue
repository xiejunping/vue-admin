<template>
  <a-menu
    ref="leftMenu"
    theme="dark"
    mode="inline"
    :inlineCollapsed="collapsed"
    :defaultSelectedKeys="activeName"
    :defaultOpenKeys="openNames"
    :class="menuitemClasses"
    @on-select="turnToPage"
    @on-open-change="changeOpen">
    <template v-for="item in menuList">
      <template v-if="item.children && item.children.length">
        <a-sub-menu :name="getNameOrHref(item)" :key="`menu-${item.name}`">
          <template slot="title">
            <a-icon :type="item.icon"></a-icon>
            <span>{{item.title}}</span>
          </template>
          <a-menu-item v-for="(t, i) in item.children" :name="getNameOrHref(t)" :key="`menu-${item.name}-${i}`">
            <span>{{t.title}}</span>
          </a-menu-item>
        </a-sub-menu>
      </template>
      <template v-else>
        <a-menu-item :name="getNameOrHref(item)" :key="`menu-${item.name}`">
          <a-icon :type="item.icon" :key="`menu-${item.name}-icon`"></a-icon>
          <span :key="`menu-${item.name}-span`">{{item.title}}</span>
        </a-menu-item>
      </template>
    </template>
  </a-menu>
</template>
<script>
import mixin from '../../mixin'
export default {
  name: 'sideMenu',
  mixins: [ mixin ],
  props: {
    collapsed: {
      type: Boolean
    },
    menuList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      openNames: [],
      activeName: ''
    }
  },
  computed: {
    menuitemClasses () {
      return ['menu-item', this.collapsed ? 'collapsed-menu' : 'access_index']
    },
    allOpenNames () {
      return this.menuList.map(rec => rec.name)
    }
  },
  watch: {
    collapsed (nVal, oVal) {
      if (nVal) {
        this.oldOpenNames = JSON.parse(JSON.stringify(this.openNames))
        this.openNames = JSON.parse(JSON.stringify(this.allOpenNames))
      } else if (this.oldOpenNames) {
        this.openNames = JSON.parse(JSON.stringify(this.oldOpenNames))
      }
      this.$nextTick(() => {
        this.$refs.leftMenu.updateOpened()
      })
    },
    allOpenNames () {
      this.oldOpenNames = JSON.parse(JSON.stringify(this.openNames))
      this.openNames = JSON.parse(JSON.stringify(this.allOpenNames))
      // 收起切换系统菜单
      this.$nextTick(() => {
        this.$refs.leftMenu.updateOpened()
      })
    }
  },
  methods: {
    changeOpen (names) {
      this.openNames = names
    }
  }
}
</script>
<style lang="stylus" scoped>
.ivu-menu-submenu
  position relative
  z-index 99
.menu-item
  span
    display inline-block
    overflow hidden
    width 69px
    text-overflow ellipsis
    white-space nowrap
    vertical-align bottom
    transition width .2s ease .2s
  i
    transition font-size .2s ease
    vertical-align middle
    font-size 16px
.collapsed-menu
  .ivu-menu-item
    span
      font-size 0
  .ivu-menu-submenu
    .ivu-menu-item
      span
        font-size inherit
  i
    transition font-size .2s ease .2s
    font-size 22px
</style>
