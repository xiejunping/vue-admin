import Model from '@/api'
import router from '@/router'
import { routes } from '@/router/router'
import { homeName } from '@/router/config'
import beforeClose from '@/router/before-close'
import { setLocal, getLocal } from '@/common/lib/storage'
import {
  routeHasExist,
  getRouteTitleHandled,
  getHomeRoute,
  routeEqual,
  getNextRoute,
  getMenuByRouter,
  getChildMenu } from '@/common/lib/tools'
import Util from '@/common/lib/util'

const closePage = (state, route) => {
  const nextRoute = getNextRoute(state.tagNavList, route)
  state.tagNavList = state.tagNavList.filter(ret => !routeEqual(ret, route))
  router.push(nextRoute)
}

export default {
  state: {
    pageOpenedList: [{
      title: '首页',
      path: '',
      name: 'index'
    }],
    homeRoute: getHomeRoute(routes, homeName),
    routes: routes,
    // 面包屑数组
    menuList: [],
    breadCrumbList: [],
    // 选项卡
    tagNavList: [],
    messageCount: 0,
    hasGetAuthMenu: false,
    currentModule: ''
  },
  getters: {
    menuList: (state, getters, rootState) => getMenuByRouter(getChildMenu(state.routes, state.currentModule), rootState.user.access)
  },
  mutations: {
    setHasGetAuthMenu (state, status) {
      state.hasGetAuthMenu = status
    },
    setCurrentModule (state, routeName) {
      state.currentModule = routeName
    },
    setRoutes (state, routes) {
      state.routes = routes
    },
    setTagsList () {},
    setTagNavList (state, list) {
      let tagList = []
      if (!Util.isArray(list)) tagList = getLocal('tagNaveList') || []
      else tagList = [...list]
      // 如果第一路由不是首页
      if (tagList[0] && tagList[0].name !== homeName) {
        const homeTagIndex = tagList.findIndex(ret => ret.name === homeName)
        if (homeTagIndex > 0) {
          const homeTag = tagList.splice(homeTagIndex, 1)[0]
          tagList.unshift(homeTag)
        } else if (homeTagIndex < 0) {
          tagList.unshift(state.homeRoute)
        }
      }
      state.tagNavList = tagList
      setLocal('tagNaveList', [...state.tagNavList])
    },
    addTag (state, { route, type = 'unshift' }) {
      let router = getRouteTitleHandled(route)
      if (!routeHasExist(state.tagNavList, router)) {
        if (type === 'push') state.tagNavList.push(router)
        else {
          if (router.name === homeName) state.tagNavList.unshift(router)
          else state.tagNavList.splice(1, 0, router)
        }
        setLocal('tagNaveList', [...state.tagNavList])
      }
    },
    closeTag (state, route) {
      const tag = state.tagNavList.filter(ret => routeEqual(ret, route))
      route = tag[0] || null
      if (!route) return
      if (route.meta && route.meta.beforeCloseName && route.meta.beforeCloseName in beforeClose) {
        new Promise(beforeClose[route.meta.beforeCloseName]).then(res => {
          res && closePage(state, route)
        })
      } else closePage(state, route)
    },
    pageOpenedList () {}
  },
  actions: {
    // 获取用户的路由表
    async getAuthMenu ({ state, commit }) {
      const data = await Model.authMenu()

      if (data) {
        commit('setCurrentModule', 'admin') // data[0].name
        commit('setHasGetAuthMenu', true)
      }
      return data
    }
  }
}
