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
                <router-link to="/msg">
                  <Icon type="ios-notifications" color="white" size=26 />
                </router-link>
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
        <Sider class="layout-content-menu" hide-trigger :style="{background: '#fff', textAlign: 'left'}">
          <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                组件
              </template>
              <router-link to="/"><MenuItem name="1-1">From表单</MenuItem></router-link>
              <router-link to="/"><MenuItem name="1-2">Card卡片</MenuItem></router-link>
              <router-link to="/"><MenuItem name="1-3">Layer布局</MenuItem></router-link>
            </Submenu>
            <router-link to="/access/index">
              <MenuItem name="2-1">
                <Icon type="ios-keypad"></Icon>
                权限管理
              </MenuItem>
            </router-link>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                用户管理
              </template>
              <router-link to="/"><MenuItem name="3-1">用户列表</MenuItem></router-link>
              <router-link to="/"><MenuItem name="3-3">复制用户</MenuItem></router-link>
              <router-link to="/"><MenuItem name="3-2">删除用户</MenuItem></router-link>
            </Submenu>
            <Submenu name="4">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                文章管理
              </template>
              <router-link to="/"><MenuItem name="4-1">文章发布</MenuItem></router-link>
              <router-link to="/"><MenuItem name="4-2">工作流</MenuItem></router-link>
            </Submenu>
            <Submenu name="5">
              <template slot="title">
                <Icon type="flash-off"></Icon>
                错误页面
              </template>
              <router-link to="/404"><MenuItem name="5-1">404找不到页面</MenuItem></router-link>
              <router-link to="/403"><MenuItem name="5-2">403无权限页面</MenuItem></router-link>
              <router-link to="/500"><MenuItem name="5-3">500服务异常</MenuItem></router-link>
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
            <router-view/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  name: 'MainFrame',
  data () {
    return {
      visible: false
    }
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

  .layout-content-main {
    min-width: 824px;
  }
</style>
