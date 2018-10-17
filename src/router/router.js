import HelloWorld from '@/components/HelloWorld'
import Layout from '@/views/layout/Layout'
import Login from '@/views/Login'
import Message from '@/views/Message'
import Setting from '@/views/user/Setting'
import Profile from '@/views/user/Profile'
import Index from '@/views/index/Index'
import NotFound from '@/views/error/404'
import NotArrow from '@/views/error/403'
import ServerErr from '@/views/error/500'

export const loginRouter = [{
  path: '/login',
  name: 'Login',
  meta: {
    title: '登录'
  },
  component: Login
}, {
  path: '/msg',
  name: 'Message',
  meta: {
    title: '消息'
  },
  component: Message
}, {
  path: '/set',
  name: 'Setting',
  meta: {
    title: '设置'
  },
  component: Setting
}, {
  path: '/profile',
  name: 'Profile',
  meta: {
    title: '个人信息'
  },
  component: Profile
}]

export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/index',
  component: Layout,
  children: [{
    path: 'index',
    name: 'index',
    title: '首页',
    component: Index
  }, {
    path: 'manger',
    name: 'manger',
    title: '平台管理',
    component: NotArrow
  }, {
    path: 'open',
    name: 'open',
    title: '开放平台',
    component: NotFound
  }, {
    path: 'user',
    name: 'user',
    title: '个人中心',
    component: ServerErr
  }]
}

// 应用
export const appRouter = [{
  path: '/access',
  icon: 'key',
  name: 'access',
  title: '权限管理',
  component: Layout,
  children: [{
    path: 'index',
    title: '权限管理',
    name: 'access_index',
    component: Login
  }]
}, {
  path: '/group',
  icon: '',
  name: 'group',
  title: '用户管理',
  component: Layout,
  children: [{
    path: 'index',
    title: '用户列表',
    name: 'group_index',
    component: HelloWorld
  }]
}, {
  path: '/hello',
  name: 'Hello',
  component: Layout,
  children: [{
    path: 'index',
    title: 'HelloWorld',
    name: 'hello_index',
    component: HelloWorld
  }]
}]

// 错误提示
export const errerPage = [{
  path: '/hello1',
  name: 'hello',
  title: 'Hello World',
  component: Index
}, {
  path: '/500',
  name: 'error-500',
  meta: {
    title: '500-服务器出错'
  },
  component: ServerErr
}, {
  path: '/403',
  name: 'error-403',
  meta: {
    title: '403-权限不足'
  },
  component: NotArrow
}, {
  path: '/*',
  name: 'error-404',
  meta: {
    title: '404-页面不存在'
  },
  component: NotFound
}]

export const routes = [
  ...loginRouter,
  otherRouter,
  ...appRouter,
  ...errerPage
]
