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
    title: '登录',
    hideInMenu: true
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
    meta: {
      title: '首页',
      hideInMenu: true,
      notCache: true,
      icon: ''
    },
    component: Index
  }, {
    path: 'manger',
    name: 'manger',
    meta: {
      title: '平台管理',
      icon: ''
    },
    component: NotArrow
  }, {
    path: 'open',
    name: 'open',
    meta: {
      title: '开放平台',
      icon: ''
    },
    component: NotFound
  }, {
    path: 'user',
    name: 'user',
    meta: {
      title: '个人中心',
      icon: ''
    },
    component: ServerErr
  }]
}

// 应用
export const appRouter = [{
  path: '/access',
  icon: 'key',
  name: 'access',
  meta: {
    title: '权限管理',
    icon: ''
  },
  component: Layout,
  children: [{
    path: 'index',
    meta: {
      title: '权限管理',
      icon: ''
    },
    name: 'access_index',
    component: Login
  }]
}, {
  path: '/group',
  icon: '',
  name: 'group',
  meta: {
    title: '用户管理',
    icon: ''
  },
  component: Layout,
  children: [{
    path: 'index',
    meta: {
      title: '用户列表',
      icon: ''
    },
    name: 'group_index',
    component: HelloWorld
  }]
}, {
  path: '/hello',
  name: 'Hello',
  component: Layout,
  children: [{
    path: 'index',
    meta: {
      title: 'HelloWorld',
      icon: ''
    },
    name: 'hello_index',
    component: HelloWorld
  }]
}]

// 错误提示
export const errerPage = [{
  path: '/hello1',
  name: 'hello',
  meta: {
    title: 'Hello World',
    icon: ''
  },
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
