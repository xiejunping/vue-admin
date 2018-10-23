<template>
  <Header class="layout-header">
    <Menu mode="horizontal" theme="dark" active-name="index" @on-select="turnToPage">
      <div class="layout-logo"></div>

      <!-- 顶部菜单 -->
      <div class="layout-nav">
        <MenuItem v-for="(item, key) in list" :key="key" :name="item.name">
          <Icon :type="item.meta.icon"></Icon>
          <span>{{item.meta.title}}</span>
        </MenuItem>
      </div>
      <slot name="profile"></slot>
    </Menu>
  </Header>
</template>

<script>
import mixin from '../../mixin'
export default {
  name: 'headerBar',
  mixins: [ mixin ],
  props: {
    value: Object,
    list: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.layout-logo
  width: 100px
  height: 30px
  background: #5b6270
  border-radius: 3px
  float: left
  position: relative
  top: 15px
  left: 20px

.layout-nav
  width: 490px
  margin: 0 auto
  margin-right: 120px
  a
    color: white
</style>
