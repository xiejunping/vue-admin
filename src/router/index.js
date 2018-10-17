import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import iView from 'iview'
import Util from '@/common/lib/util'
import { routes } from './router'
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

const turnTo = (to, access, next) => {
  // 通过用户权限和跳转的页面的name来判断是否有权限访问
  if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
  else next({ replace: true, name: 'error-403' })
}

router.beforeEach((to, from, next) => {
  const token = Util.getCookie(XSRF_COOKIE)

  iView.LoadingBar.start()
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
      turnTo(to, store.state.user.access, next)
    } else {
      store.dispatch('getUserInfo').then(user => {
        // access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
        turnTo(to, user.access, next)
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
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

// 路由配置
export default router
