import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'
import { COOKIE_EXPIRES, SECRET_KEY } from '@/api/config'

let util = {
  title: (title = '登录') => {
    window.document.title = title
  },
  /**
   * @param {Array} target 目标数组
   * @param {Array} arr 需要查询的数组
   * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
   */
  hasOneOf: (targetarr, arr) => {
    return targetarr.some(_ => arr.indexOf(_) > -1)
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
  }
}

export default util
