<template>
  <Layout class="layout">
    <!-- top -->
    <header-bar :list="topMenu">
      <div class="layout-profile" slot="profile">
        <full-screen v-model="isFullscreen" />
        <div class="message" @click="turnToPage('Message')">
          <Badge :count="3" :offset="[16, 0]">
            <Icon type="ios-notifications" color="white" size=26 />
          </Badge>
        </div>
        <Perfile />
      </div>
    </header-bar>

    <!-- main -->
    <Layout class="layout-content">
      <!-- left -->
      <Sider class="layout-content-menu" v-model="collapsed" collapsible>
        <side-menu :menu-list="menuList" :collapsed="collapsed"></side-menu>
      </Sider>

      <!-- right -->
      <Layout class="layout-content-main">
        <!-- 面包屑
        <Breadcrumb class="layout-content-position" :style="{margin: '24px 0', textAlign: 'left'}">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Components</BreadcrumbItem>
          <BreadcrumbItem>Layout</BreadcrumbItem>
        </Breadcrumb>-->

        <nav-tags :value="$route" :list="tagNavList" @on-close="handleCloseTag"></nav-tags>

        <!-- 组件 -->
        <keep-alive :max="50" :include="cacheList">
          <router-view/>
        </keep-alive>

      </Layout>
    </Layout>
  </Layout>
</template>
<script>
import { mapMutations } from 'vuex'
import { getNewTagList, routeEqual, getNextRoute } from '@/common/lib/tools'

import HeaderBar from './components/header-bar/header-bar'
import SideMenu from './components/side-menu/side-menu'
import FullScreen from './components/header-bar/full-screen/full-screen'
import Perfile from './components/perfile/perfile'
import NavTags from './components/nav-tags/nav-tags'

import mixin from './mixin'

export default {
  name: 'MainFrame',
  mixins: [ mixin ],
  components: {
    HeaderBar, SideMenu, FullScreen, Perfile, NavTags
  },
  data () {
    return {
      isFullscreen: null,
      collapsed: null,
      current: '1',
      topMenu: this.$store.state.app.routes.filter(ret => !ret.meta.hideInMenu && ret.meta.level === 0)
    }
  },
  computed: {
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    menuList () {
      return this.$store.getters.menuList
    },
    cacheList () {
      return this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []
    }
  },
  methods: {
    ...mapMutations([
      'setTagNavList',
      'addTag'
    ]),
    handleCloseTag (res, type, route) {
      if (type === 'all') {
        this.turnToPage(route)
      } else if (routeEqual(this.$route, route)) {
        // 关闭的页签存在
        if (type === 'others') {
        } else {
          const nextRoute = getNextRoute(this.tagNavList, route)
          console.log(nextRoute)
          this.turnToPage(nextRoute)
        }
      }
      this.setTagNavList(res)
    }
  },
  watch: {
    '$route' (newRoute) {
      const { name, query, params, meta } = newRoute
      this.addTag({
        route: { name, query, params, meta },
        type: 'push'
      })
      // this.setBreadCrumb(newRoute)
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
      // this.$refs.sideMenu.updateOpenName(newRoute.name)
    }
  },
  mounted () {
    this.setTagNavList()
    this.addTag({
      route: this.$store.state.app.homeRoute
    })
  }
}
</script>
<style scoped lang="stylus">
.layout
  background #f5f7f9
  position relative
  border-radius 4px
  overflow hidden
.layout-content-menu
  background #fff
  text-align left
.layout-content-main
  min-width 824px

.ivu-layout
  &.layout
    height 100%
.ivu-layout-header
  min-width 1024px
  padding-right 25px

.layout-profile
  display inline-block
  width 153px
  float right
  .message
    width 50px
    cursor: pointer
    display inline-block
    text-align left
    .ivu-icon
      &:hover
        background-color #5b6270

</style>
