import qs from 'qs'
import axios from 'axios'
import FormData from 'form-data'
import { HOST_API, RES_CODE, STATE_CODE, MAX_CONTENT_LENGTH, XSRF_COOKIE, XSRF_HEADER } from './config'
import { httpFaildHandle } from './handle'

const res = Symbol('res')
const ser = Symbol('ser')

export default class ReqClient {
  /**
   * 构造方法
   * @param {String} url 请求路径
   * @param {Object} data 请求参数
   * @param {Number} timeout 超时时间
   * @param {String} method 请求类型
   * @param {String} contentType 返回类型
   */
  constructor ({url, data, params, timeout = 60000, method = 'GET', onUpload, onDown, cancel}) {
    this.url = url
    this.data = data
    this.method = method
    this.timeout = timeout
    this.onUpload = onUpload
    this.onDown = onDown
    this.cancel = cancel
    this.headers = {}

    this.init()
  }
  /**
   * 请求参数初始化
   * @return {Objcet} params
   */
  init () {
    // 手动取消请求
    const CancelToken = axios.CancelToken
    this.source = CancelToken.source()

    this.option = {
      baseURL: HOST_API,
      url: this.url,
      method: this.method,
      data: this.data,
      timeout: this.timeout,
      headers: this.headers,
      withCredentials: true,
      onUploadProgress: this.onUpload,
      onDownloadProgress: this.onDown,
      cancelToke: this.source.token,
      xsrfCookieName: XSRF_COOKIE,
      xsrfHeaderName: XSRF_HEADER,
      maxContentLength: MAX_CONTENT_LENGTH
    }
  }

  [ser] (obj) {
    const form = new FormData()

    for (const key in obj) {
      if ({}.hasOwnProperty.call(obj, key)) {
        form.append(key, obj[key])
      }
    }
    return form
  }

  /**
   * 接口数据请求回调
   * @param response
   * @returns {Promise<*>}
   */
  async [res] (response, Serialization) {
    // HTTP状态码不正确
    if (response.status !== STATE_CODE) httpFaildHandle(response)
    else {
      if (response.data.code !== RES_CODE) throw new Error(response.data.msg)
      else if (Serialization) return JSON.parse(response.data)
      else return response.data
    }
  }

  /**
   * 接口请求 JSON
   * @returns {Promise<*>}
   */
  async reqJson () {
    this.option.headers = Object.assign({}, {
      'Content-Type': 'application/json'
    }, this.option.headers)
    this.option.data = JSON.stringify(this.option.data)
    const response = await axios.request(this.option)

    const data = await this[res](response, true)
    return data
  }

  /**
   * 接口请求
   * @returns {Promise<*>}
   */
  async reqData () {
    this.option.headers = Object.assign({}, {
      'Content-Type': 'application/x-www-form-urlencoded'
    }, this.option.headers)
    this.option.data = qs.stringify(this.option.data)
    const response = await axios.request(this.option)

    const data = await this[res](response)
    return data
  }

  /**
   * 接口请求 表单
   * @returns {Promise<*>}
   */
  async reqFormData () {
    this.option.headers = Object.assign({}, {
      'Content-Type': 'multipart/form-data'
    }, this.option.headers)
    this.option.params = this[ser](this.option.data)
    const response = await axios.request(this.option)

    const data = await this[res](response)
    return data
  }
}
