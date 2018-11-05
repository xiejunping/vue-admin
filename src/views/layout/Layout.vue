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
      <Sider class="layout-content-menu" v-model="isCollapsed" collapsible>
        <Menu active-name="1-2" theme="light" @on-select="turnToPage" width="auto" :open-names="['1']" :class="menuitemClasses">
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              <span>组件</span>
            </template>
            <MenuItem name="access_index"><span>From表单</span></MenuItem>
            <MenuItem name="1-2"><span>Card卡片</span></MenuItem>
            <MenuItem name="1-3"><span>Layer布局</span></MenuItem>
          </Submenu>
          <MenuItem name="access_index">
            <Icon type="ios-keypad"></Icon>
            <span>权限管理</span>
          </MenuItem>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-analytics"></Icon>
              <span>用户管理</span>
            </template>
            <MenuItem name="group_index"><span>用户列表</span></MenuItem>
            <MenuItem name="3-3"><span>复制用户</span></MenuItem>
            <MenuItem name="3-2"><span>删除用户</span></MenuItem>
          </Submenu>
          <Submenu name="4">
            <template slot="title">
              <Icon type="ios-analytics"></Icon>
              <span>文章管理</span>
            </template>
            <router-link to="/hello/index"><MenuItem name="4-1"><span>文章发布</span></MenuItem></router-link>
            <router-link to="/"><MenuItem name="4-2"><span>工作流</span></MenuItem></router-link>
          </Submenu>
          <Submenu name="5">
            <template slot="title">
              <Icon type="flash-off"></Icon>
              <span>错误页面</span>
            </template>
            <router-link to="/404"><MenuItem name="5-1"><span>404找不到页面</span></MenuItem></router-link>
            <router-link to="/403"><MenuItem name="5-2"><span>403无权限页面</span></MenuItem></router-link>
            <router-link to="/500"><MenuItem name="5-3"><span>500服务异常</span></MenuItem></router-link>
          </Submenu>
        </Menu>
      </Sider>
      <!-- right -->
      <Layout class="layout-content-main" :style="{padding: '0 24px 24px'}">
        <!-- 面包屑
        <Breadcrumb class="layout-content-position" :style="{margin: '24px 0', textAlign: 'left'}">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Components</BreadcrumbItem>
          <BreadcrumbItem>Layout</BreadcrumbItem>
        </Breadcrumb>-->

        <nav-tags :value="$route" :list="tagNavList" @on-close="handleCloseTag"></nav-tags>

        <!-- 组件 -->
        <Content class="layout-content-body" :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
          <keep-alive :max="50" :include="cacheList">
            <router-view/>
          </keep-alive>
        </Content>
      </Layout>
    </Layout>
  </Layout>
</template>
<script>
import { mapMutations } from 'vuex'
import { getNewTagList, routeEqual, getNextRoute } from '@/common/lib/tools'

import HeaderBar from './components/header-bar/header-bar'
import FullScreen from './components/header-bar/full-screen/full-screen'
import Perfile from './components/perfile/perfile'
import NavTags from './components/nav-tags/nav-tags'

import mixin from './mixin'

export default {
  name: 'MainFrame',
  mixins: [ mixin ],
  components: {
    HeaderBar, FullScreen, Perfile, NavTags
  },
  data () {
    return {
      isFullscreen: null,
      isCollapsed: null,
      current: '1',
      topMenu: this.$store.state.app.routes.filter(ret => ret.name === 'otherRouter')[0].children
    }
  },
  computed: {
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    cacheList () {
      return this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []
    },
    menuitemClasses () {
      return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
    }
  },
  methods: {
    ...mapMutations([
      'setTagNavList',
      'addTag'
    ]),
    handleCloseTag (res, type, route) {
      if (type === 'all') {
        this.turnToPage('home')
      } else if (routeEqual(this.$route, route)) {
        // 关闭的页签存在
        if (type === 'others') {
        } else {
          const nextRoute = getNextRoute(this.tagNavList, route)
          console.log(nextRoute)
          this.$router.push(nextRoute)
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
  .layout {
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .ivu-layout, .layout {
    height: 100%;
  }
  .ivu-layout-header {
    min-width: 1024px;
    padding-right: 25px;
  }

  .layout-profile
    display inline-block
    width 153px
    float right
    .message
      width 50px
      display inline-block
      text-align left

 .layout-content-menu {
    background: #fff;
    text-align: left;
  }
  .layout-content-main {
    min-width: 824px;
  }

  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i {
    transition: font-size .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i {
    transition: font-size .2s ease .2s;
    font-size: 22px;
  }

  .message
    cursor: pointer
    .ivu-icon
      &:hover
        background-color #5b6270
</style>
