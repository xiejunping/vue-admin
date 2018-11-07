import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'
import { COOKIE_EXPIRES, SECRET_KEY } from '@/api/config'

let util = {
  title: (title = '登录') => {
    window.document.title = title
  },
  /**
   * isArray
   */
  isArray: arr => {
    if (!Array.isArray) {
      Array.isArray = (arg) => {
        return Object.prototype.toString.call(arg) === '[object Array]'
      }
    }
    return Array.isArray(arr)
  },
  forEach: (arr, fn) => {
    if (!this.isArray(arr) || !fn) return
    let i = -1
    let len = arr.length
    while (++i < len) {
      let item = arr[i]
      fn(item, i, arr)
    }
  },
  /**
   * @param {Array} target 目标数组
   * @param {Array} arr 需要查询的数组
   * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
   */
  hasOneOf: (targetarr, arr) => {
    return targetarr.some(_ => arr.indexOf(_) > -1)
  },
  hasChild: (item) => {
    return item.children && item.children.length !== 0
  },
  setCookie: (key, val, expires) => {
    Cookies.set(key, val, { expires: expires || COOKIE_EXPIRES })
  },
  getCookie: key => {
    return Cookies.get(key)
  },
  aesEncrypt: content => {
    const ciphertext = CryptoJS.AES.encrypt(content.toString(), SECRET_KEY)
    return ciphertext.toString()
  },
  /**
   * @param {*} obj1 对象
   * @param {*} obj2 对象
   * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
   */
  objEqual: (obj1, obj2) => {
    const keysArr1 = Object.keys(obj1)
    const keysArr2 = Object.keys(obj2)
    if (keysArr1.length !== keysArr2.length) return false
    else if (keysArr1.length === 0 && keysArr2.length === 0) return true
    /* eslint-disable-next-line */
    else return !keysArr1.some(key => obj1[key] != obj2[key])
  }
}

export default util
