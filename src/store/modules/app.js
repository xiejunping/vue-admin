// import Model from '@/api'
import { routes } from '../../router/router'
import { setLocal } from '@/common/lib/storage'
import { routeHasExist, getRouteTitleHandled, getHomeRoute } from '@/common/lib/tools'
import { homeName } from '../../router/config'

const app = {
  state: {
    pageOpenedList: [{
      title: '首页',
      path: '',
      name: 'index'
    }],
    homeRoute: getHomeRoute(routes, homeName),
    // 面包屑数组
    menuList: [],
    breadCrumbList: [],
    tagNavList: [],
    messageCount: 0
  },
  mutations: {
    setTagsList () {},
    addTag (state, { route, type = 'unshift' }) {
      console.log('addTag:', route)
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
    pageOpenedList () {}
  }
}

export default app
