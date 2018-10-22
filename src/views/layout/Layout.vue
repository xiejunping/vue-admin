<template>
  <div class="layout">
    <Layout>
      <!-- top -->
      <Header class="layout-header">
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <router-link to="/">
              <MenuItem name="1">
                <Icon type="ios-navigate"></Icon>
                首页
              </MenuItem>
            </router-link>
            <router-link to="/manger">
              <MenuItem name="2">
                <Icon type="ios-keypad"></Icon>
                平台管理
              </MenuItem>
            </router-link>
            <router-link to="/open">
              <MenuItem name="3">
                <Icon type="ios-analytics"></Icon>
                文档中心
              </MenuItem>
            </router-link>
            <router-link to="/service">
              <MenuItem name="4">
                <Icon type="ios-paper"></Icon>
                客服帮助
              </MenuItem>
            </router-link>
          </div>

          <div class="layout-profile">
            <div class="message">
              <Badge :count="3" :offset="[16, 0]">
                <div to="/msg">
                  <Icon type="ios-notifications" color="white" size=26 />
                </div>
              </Badge>
            </div>
            <Poptip v-model="visible" placement="bottom-end">
              <Avatar style="margin-right: 8px" icon="ios-person" />
              <Icon type="ios-arrow-down" color="white" />
              <div slot="content">
                <dl>
                  <dd>aaaaaa</dd>
                  <dd>aaaaaa</dd>
                  <dd>aaaaaa</dd>
                  <dd>aaaaaa</dd>
                  <dd>aaaaaa</dd>
                </dl>
              </div>
            </Poptip>
          </div>
        </Menu>
      </Header>

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
          <!-- 面包屑 -->
          <Breadcrumb class="layout-content-position" :style="{margin: '24px 0', textAlign: 'left'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb>

          <!-- 组件 -->
          <Content class="layout-content-body" :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <keep-alive :max="50" :include="cacheList">
              <router-view/>
            </keep-alive>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'MainFrame',
  data () {
    return {
      visible: false,
      isCollapsed: null
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
      'addTag'
    ]),
    turnToPage (route) {
      console.log(route)
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    }
  },
  watch: {
    '$route' (newRoute) {
      console.log(newRoute)
      const { name, query, params, meta } = newRoute
      this.addTag({
        route: { name, query, params, meta },
        type: 'push'
      })
      // this.setBreadCrumb(newRoute)
      // this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
      // this.$refs.sideMenu.updateOpenName(newRoute.name)
    }
  },
  mounted () {
    this.addTag({
      route: this.$store.state.app.homeRoute
    })
  }
}
</script>
<style scoped>
  a {
    color: inherit;
  }
  .layout {
    border: 1px solid #d7dde4;
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

  .layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }

  .layout-nav {
    width: 490px;
    margin: 0 auto;
    margin-right: 120px;
  }
  .layout-nav a {
    color: white;
  }

  .layout-profile {
    display: inline-block;
    width: 120px;
    float: right;
  }
  .layout-profile .message {
    width: 50px;
    display: inline-block;
    text-align: left;
  }

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
</style>
