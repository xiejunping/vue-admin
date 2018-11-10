import HelloWorld from '@/components/HelloWorld'
import Layout from '@/views/layout/Layout'
import Login from '@/views/Login'
import Admin from '@/views/admin'
import Manger from '@/views/manger'
import Docs from '@/views/docs'
import Help from '@/views/help'

import Message from '@/views/Message'
import Setting from '@/views/user/Setting'
import Profile from '@/views/user/Profile'
import Index from '@/views/index/Index'
import Frame from '@/views/index/Frame'
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
  }, {
    path: 'frame',
    name: 'frame',
    meta: {
      title: '外部引用',
      notCache: true
    },
    component: Frame
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
    name: 'access',
    meta: {
      title: '权限管理',
      icon: 'ios-analytics'
    },
    component: Login
  }, {
    path: 'group',
    name: 'group',
    meta: {
      title: '用户管理',
      icon: 'ios-navigate'
    },
    children: [{
      path: 'index',
      meta: {
        title: '用户列表',
        icon: 'ios-navigate'
      },
      name: 'group_index',
      component: HelloWorld
    }],
    component: Admin
  }, {
    path: 'hello',
    name: 'Hello',
    meta: {
      title: 'Hello',
      icon: 'ios-navigate'
    },
    children: [{
      path: 'index',
      meta: {
        title: 'HelloWorld',
        icon: 'ios-navigate'
      },
      name: 'hello_index',
      component: HelloWorld
    }],
    component: Admin
  }, {
    path: 'set',
    name: 'Setting',
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
    }],
    component: Admin
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
  children: [{
    path: 'menu',
    name: 'menu',
    meta: {
      title: '菜单管理',
      icon: 'ios-keypad'
    },
    children: [{
      path: 'index',
      name: 'menu-index',
      meta: {
        title: '子菜单',
        icon: 'ios-keypad'
      },
      component: Profile
    }, {
      path: 'add',
      name: 'menu-add',
      meta: {
        title: '子菜单1',
        icon: 'ios-keypad'
      },
      component: Profile
    }],
    component: Manger
  }, {
    path: 'caiwu',
    name: 'caiwu',
    meta: {
      title: '财务管理',
      icon: 'ios-keypad'
    },
    children: [{
      path: 'index',
      name: 'caiwu-index',
      meta: {
        title: '子菜单',
        icon: 'ios-keypad'
      },
      component: Profile
    }, {
      path: 'add',
      name: 'caiwu-add',
      meta: {
        title: '子菜单1',
        icon: 'ios-keypad'
      },
      component: Profile
    }],
    component: Manger
  }, {
    path: 'tag',
    name: 'tag',
    meta: {
      title: '标签管理',
      icon: 'ios-keypad'
    },
    children: [{
      path: 'index',
      name: 'tag-index',
      meta: {
        title: '子菜单',
        icon: 'ios-keypad'
      },
      component: Profile
    }, {
      path: 'add',
      name: 'tag-add',
      meta: {
        title: '子菜单1',
        icon: 'ios-keypad'
      },
      component: Profile
    }],
    component: Manger
  }, {
    path: 'fenxiao',
    name: 'fenxiao',
    meta: {
      title: '分销管理',
      icon: 'ios-keypad'
    },
    children: [{
      path: 'index',
      name: 'fenxiao-index',
      meta: {
        title: '子菜单',
        icon: 'ios-keypad'
      },
      component: Profile
    }, {
      path: 'add',
      name: 'fenxiao-add',
      meta: {
        title: '子菜单1',
        icon: 'ios-keypad'
      },
      component: Profile
    }],
    component: Manger
  }, {
    path: 'yingxiao',
    name: 'yingxiao',
    meta: {
      title: '营销管理',
      icon: 'ios-keypad'
    },
    children: [{
      path: 'index',
      name: 'yingxiao-index',
      meta: {
        title: '子菜单',
        icon: 'ios-keypad'
      },
      component: Profile
    }, {
      path: 'add',
      name: 'yingxiao-add',
      meta: {
        title: '子菜单1',
        icon: 'ios-keypad'
      },
      component: Profile
    }],
    component: Manger
  }, {
    path: 'arictle',
    name: 'arictle',
    meta: {
      title: '文章管理',
      icon: 'ios-keypad'
    },
    children: [{
      path: 'index',
      name: 'arictle-index',
      meta: {
        title: '子菜单',
        icon: 'ios-keypad'
      },
      component: Profile
    }, {
      path: 'add',
      name: 'arictle-add',
      meta: {
        title: '子菜单1',
        icon: 'ios-keypad'
      },
      component: Profile
    }],
    component: Manger
  }],
  component: Layout
}, {
  path: '/docs',
  name: 'docs',
  meta: {
    title: '文档中心',
    icon: 'ios-analytics',
    level: 0
  },
  children: [{
    path: 'open',
    name: 'open',
    meta: {
      title: '开放中心',
      icon: 'ios-analytics',
      href: 'https://xiejunping.github.io/wapman/#/'
    },
    component: Docs
  }],
  component: Layout
}, {
  path: '/help',
  name: 'help',
  meta: {
    title: '客服帮助',
    icon: 'ios-paper',
    level: 0
  },
  children: [{
    path: 'online',
    name: 'online',
    meta: {
      title: '在线客服',
      icon: 'ios-paper'
    },
    component: Help
  }, {
    path: 'online1',
    name: 'online1',
    meta: {
      title: '在线客服',
      icon: 'ios-paper'
    },
    component: Help
  }, {
    path: 'online2',
    name: 'online2',
    meta: {
      title: '在线客服',
      icon: 'ios-paper'
    },
    component: Help
  }],
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
