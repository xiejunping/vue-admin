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
  name: 'login',
  meta: {
    title: '登录',
    hideInMenu: true
  },
  component: Login
}, {
  path: '/',
  name: 'layout',
  meta: {
    title: 'Vue-admin 后台管理系统',
    hideInMenu: true
  },
  redirect: '/index',
  component: Layout,
  children: [{
    path: 'index',
    name: 'index',
    meta: {
      title: '首页',
      notCache: true
    },
    component: Index
  }]
}]

// 应用
export const appRouter = [{
  path: '/admin',
  name: 'admin',
  meta: {
    title: '管理中心',
    icon: 'ios-navigate',
    level: 0
  },
  children: [{
    path: 'access',
    icon: 'key',
    name: 'access',
    meta: {
      title: '权限管理',
      icon: 'ios-analytics'
    },
    component: HelloWorld,
    children: [{
      path: 'index',
      meta: {
        title: '权限管理',
        icon: 'ios-navigate' // access: ['super']
      },
      name: 'access_index',
      component: Login
    }]
  }, {
    path: 'group',
    icon: '',
    name: 'group',
    meta: {
      title: '用户管理',
      icon: 'ios-navigate'
    },
    component: HelloWorld,
    children: [{
      path: 'index',
      meta: {
        title: '用户列表',
        icon: 'ios-navigate'
      },
      name: 'group_index',
      component: HelloWorld
    }]
  }, {
    path: 'hello',
    name: 'Hello',
    meta: {
      title: 'Hello',
      icon: 'ios-navigate'
    },
    component: HelloWorld,
    children: [{
      path: 'index',
      meta: {
        title: 'HelloWorld',
        icon: 'ios-navigate'
      },
      name: 'hello_index',
      component: HelloWorld
    }]
  }, {
    path: 'set',
    name: 'Setting',
    component: HelloWorld,
    meta: {
      title: '用户设置',
      icon: 'ios-navigate'
    },
    children: [{
      path: 'index',
      meta: {
        title: '设置',
        icon: 'ios-navigate'
      },
      name: 'set_index',
      component: Setting
    }, {
      path: 'msg',
      name: 'Message',
      meta: {
        title: '消息',
        icon: 'ios-navigate'
      },
      component: Message
    }, {
      path: 'profile',
      name: 'Profile',
      meta: {
        title: '个人信息',
        icon: 'ios-navigate'
      },
      component: Profile
    }]
  }],
  component: Layout
}, {
  path: '/manger',
  name: 'manger',
  meta: {
    title: '平台管理',
    icon: 'ios-keypad',
    level: 0
  },
  children: [],
  component: Layout
}, {
  path: '/docs',
  name: 'docs',
  meta: {
    title: '文档中心',
    icon: 'ios-analytics',
    level: 0
  },
  children: [],
  component: Layout
}, {
  path: '/help',
  name: 'help',
  meta: {
    title: '客服帮助',
    icon: 'ios-paper',
    level: 0
  },
  children: [],
  component: Layout
}]

// 错误提示
export const errerPage = [{
  path: '/500',
  name: 'error-500',
  meta: {
    title: '500-服务器出错',
    icon: 'ios-navigate',
    hideInMenu: true
  },
  component: ServerErr
}, {
  path: '/403',
  name: 'error-403',
  meta: {
    title: '403-权限不足',
    icon: 'ios-navigate',
    hideInMenu: true
  },
  component: NotArrow
}, {
  path: '/*',
  name: 'error-404',
  meta: {
    title: '404-页面不存在',
    icon: 'ios-navigate',
    hideInMenu: true
  },
  component: NotFound
}]

export const routes = [...loginRouter]
