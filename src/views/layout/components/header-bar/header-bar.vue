<template>
  <a-layout-header class="layout-header">
    <a-menu mode="horizontal" theme="dark" :defaultSelectedKeys="currentModule" @on-select="changeMenu">
      <div class="layout-logo"></div>
      <!-- 顶部菜单 -->
      <div class="layout-nav">
        <a-menu-item v-for="(item, key) in list" :key="key" :name="item.name">
          <a-icon :type="item.meta.icon"></a-icon>
          <span>{{item.meta.title}}</span>
        </a-menu-item>
      </div>
      <slot name="profile"></slot>
    </a-menu>
  </a-layout-header>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'headerBar',
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
    currentModule () {
      return this.$store.state.app.currentModule
    }
  },
  methods: {
    ...mapMutations([
      'setCurrentModule'
    ]),
    changeMenu (name) {
      this.setCurrentModule(name)
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
  margin-right: 153px
  a
    color: white
</style>
