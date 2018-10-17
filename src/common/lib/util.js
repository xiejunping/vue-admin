import Cookies from 'js-cookie'

let util = {}

util.title = (title = 'admin') => {
  window.document.title = title
}

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
util.hasOneOf = (targetarr, arr) => {
  return targetarr.some(_ => arr.indexOf(_) > -1)
}

util.getToken = () => {
  const token = Cookies.get('token')
  if (!token) return
  return token
}

export default util
