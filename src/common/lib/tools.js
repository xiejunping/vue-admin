import Util from './util'

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {}
  const params2 = route2.params || {}
  const query1 = route1.query || {}
  const query2 = route2.query || {}
  return (route1.name === route2.name) && Util.objEqual(params1, params2) && Util.objEqual(query1, query2)
}

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
  let i = -1
  while (++i < times) {
    callback(i)
  }
}

export const getRouteTitleHandled = route => {
  let router = {...route}
  let meta = {...route.meta}
  if (meta.title && typeof meta.title === 'function') meta.title = meta.title(router)
  router.meta = meta
  return router
}

/**
 * 判断打开的标签列表里是否已存在这个新添加的路由对象
 */
export const routeHasExist = (tagNavList, routeItem) => {
  let len = tagNavList.length
  let res = false
  doCustomTimes(len, (index) => {
    if (routeEqual(tagNavList[index], routeItem)) res = true
  })
  return res
}

/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = (routers, homeName = 'index') => {
  let i = -1
  let len = routers.length
  let homeRoute = {}
  while (++i < len) {
    let item = routers[i]
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children, homeName)
      if (res.name) return res
    } else {
      if (item.name === homeName) homeRoute = item
    }
  }
  return homeRoute
}

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
  const newList = [...list]
  const { name, path, meta } = newRoute

  if (newList.findIndex(item => item.name === name) < 0) {
    newList.push({ name, path, meta })
  }
  return newList
}

/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextRoute = (list, route) => {
  let res = {}
  if (list.length === 2) {
    res = getHomeRoute(list)
  } else {
    const index = list.findIndex(item => routeEqual(item, route))
    if (index === list.length - 1) res = list[list.length - 2]
    else res = list[index + 1]
  }
  return res
}

/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
const showThisMenuEle = (item, access) => {
  if (item.meta && item.meta.access && item.meta.access.length) {
    return Util.hasOneOf(item.meta.access, access)
  }
  return true
}
export const getMenuByRouter = (list, access) => {
  let res = []

  if (!Util.isArray(list)) return
  list.forEach(item => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      let obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        title: (item.meta && item.meta.title) || '',
        meta: item.meta
      }
      if ((Util.hasChild(item) || (item.meta && item.meta.showAlways)) && showThisMenuEle(item, access)) {
        obj.children = getMenuByRouter(item.children, access)
      }
      if (item.meta && item.meta.href) obj.href = item.meta.href
      if (showThisMenuEle(item, access)) res.push(obj)
    }
  })
  return res
}

export const getChildMenu = (routes, name) => {
  let child = []

  if (!Util.isArray(routes)) return
  for (let i = 0; i < routes.length; i++) {
    const item = routes[i]
    if (item.name === name) {
      child = item.children
      break
    } else if (Util.hasChild(item)) {
      child = getChildMenu(item.children, name)
      if (child && child.length) break
    }
  }
  return child
}

export const findToName = (routes, path) => {
  let paths = path.split('/')
  if (!Util.isArray(routes) || !Util.isArray(paths)) return

  paths.shift()
  console.log(paths)
  if (paths[0]) {
    let meta = routes.filter(ret => ret.path === `/${paths[0]}`)

    if (paths[1] && meta[0] && meta[0].children) {
      let item = meta[0].children.filter(ret => ret.path === paths[1])

      if (paths[2] && item[0] && item[0].children) {
        return item[0].children.filter(ret => ret.path === paths[2])[0]
      } else return item[0]
    } else return meta[0]
  }
  return false
}
