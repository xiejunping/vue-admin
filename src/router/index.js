import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Util from '@/common/lib/util'
import { findToName } from '@/common/lib/tools'
import { routes, errerPage } from './router'
import { loginName, homeName } from './config'
import { XSRF_COOKIE } from '@/api/config'

Vue.use(Router)

const router = new Router({
  routes: routes,
  mode: 'history'
})

/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
  if (route.meta && route.meta.access) return Util.hasOneOf(access, route.meta.access)
  else return true
}

/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
const canTurnTo = (name, access, routes) => {
  const routePermissionJudge = list => {
    return list.some(item => {
      if (item.children && item.children.length) {
        return routePermissionJudge(item.children)
      } else if (item.name === name) {
        return hasAccess(access, item)
      }
    })
  }

  return routePermissionJudge(routes)
}

const turnTo = (to, access, next, routes) => {
  // 通过用户权限和跳转的页面的name来判断是否有权限访问
  if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
  else {
    if (to.name) next({ replace: true, name: 'error-403' })
    else {
      to = Object.assign({}, to, { name: findToName(routes, to.path).name })
      if (canTurnTo(to.name, access, routes)) next({ path: to.path })
    }
  }
}

const formatAsyncRoutes = (routes, appRoutes) => {
  return new Promise(resolve => {
    const allRputes = [
      ...routes,
      ...appRoutes,
      ...errerPage
    ]
    // 追加路由
    router.addRoutes(appRoutes)
    router.addRoutes(errerPage)
    store.commit('setRoutes', allRputes)
    resolve(allRputes)
  })
}

const createRoutes = (list) => {
  return list.map(ret => {
    if (ret.children && ret.children.length) {
      ret.children = createRoutes(ret.children)
    }
    return {
      path: ret.path,
      name: ret.name,
      meta: {
        title: ret.title,
        icon: ret.icon,
        level: ret.level
      },
      children: ret.children,
      component (resolve) {
        require([`@/views${ret.component}/index.js`], resolve)
      }
    }
  })
}

const initMenu = (to, access, next) => {
  // 动态请求菜单选项
  if (store.state.app.hasGetAuthMenu) {
    turnTo(to, access, next, store.state.app.routes)
  } else {
    store.dispatch('getAuthMenu').then(data => {
      if (!data || !data.length) throw new Error('权限菜单出错或为空')
      const appRoutes = createRoutes(data)
      return formatAsyncRoutes(routes, appRoutes)
    }).then(newRoutes => {
      turnTo(to, access, next, newRoutes)
    }).catch((err) => {
      console.log(err)
      next({
        name: loginName
      })
    })
  }
}

router.beforeEach((to, from, next) => {
  const token = Util.getCookie(XSRF_COOKIE)

  Util.title(to.meta.title)

  if (!token && to.name !== loginName) {
    // 未登录且去到非登录页
    next({
      name: loginName
    })
  } else if (!token && to.name === loginName) {
    // 未登录且去到登录页
    next()
  } else if (token && to.name === loginName) {
    // 已登录且去登录页
    next({
      name: homeName
    })
  } else {
    if (store.state.user.hasGetInfo) {
      initMenu(to, store.state.user.access, next)
    } else {
      // 刷新进来这里
      store.dispatch('getUserInfo').then(user => {
        // access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
        initMenu(to, user.access, next)
      }).catch(() => {
        next({
          name: loginName
        })
      })
    }
  }
})

router.afterEach(to => {
  // Util.openNewPage(router.app, to.name, to.params, to.query);
  window.scrollTo(0, 0)
})

// 路由配置
export default router
