<template>
  <Menu
    ref="leftMenu"
    theme="light"
    width="auto"
    :active-name="activeName"
    @on-select="turnToPage"
    :open-names="openNames"
    @on-open-change="changeOpen"
    :class="menuitemClasses">
    <template v-for="item in menuList">
      <template v-if="item.children && item.children.length > 1">
        <Submenu :name="item.name" :key="`menu-${item.name}`">
          <template slot="title">
            <Icon :type="item.icon"></Icon>
            <span>{{item.title}}</span>
          </template>
          <MenuItem v-for="(t, i) in item.children" :name="t.name" :key="`menu-${item.name}-${i}`">
            <span>{{t.title}}</span>
          </MenuItem>
        </Submenu>
      </template>
      <template v-else>
        <MenuItem :name="item.name" :key="`menu-${item.name}`">
          <Icon :type="item.icon" :key="`menu-${item.name}-icon`"></Icon>
          <span :key="`menu-${item.name}-span`">{{item.title}}</span>
        </MenuItem>
      </template>
    </template>
  </Menu>
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
      openNames: ['1'],
      activeName: '1-2',
      allOpenNames: []
    }
  },
  computed: {
    menuitemClasses () {
      return ['menu-item', this.collapsed ? 'collapsed-menu' : 'access_index']
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
    }
  },
  methods: {
    changeOpen (names) {
      this.openNames = names
    }
  },
  mounted () {
    this.allOpenNames = this.menuList.map(rec => rec.name)
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
