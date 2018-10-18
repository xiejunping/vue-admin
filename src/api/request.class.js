import qs from 'qs'
import axios from 'axios'
import store from '@/store'
import FormData from 'form-data'
import { Message } from 'iview'
import { HOST_API, RES_CODE, STATE_CODE, MAX_CONTENT_LENGTH, XSRF_COOKIE, XSRF_HEADER } from './config'

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
      validateStatus: function (status) {
        return status >= 200 && status < 600
      },
      maxContentLength: MAX_CONTENT_LENGTH
    }

    // xsrfHeader
    XSRF_HEADER && (this.option.headers[XSRF_HEADER] = store.state.token)
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
    if (response.status !== STATE_CODE) throw response
    else {
      const body = Serialization ? JSON.parse(response.data) : response.data

      if (body.code !== RES_CODE) throw response
      else return body.data
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

  handleError (response) {
    // 请求错误
    if (!response) {
      Message.error({
        showClose: true,
        message: '网络错误，请刷新重试！'
      })
      return
    }
    const { status, data } = response

    switch (status) {
      case 200:
        Message.error({ content: data.msg })
        break
      case 403:
        Message.error({ content: '服务器拒绝请求！' })
        break
      case 404:
        Message.error({ content: '服务器找不到请求！' })
        break
      case 500:
        Message.error({ content: '服务器出错了！' })
        break
      case 502:
        Message.error({ content: '服务器跑路了⊙﹏⊙！' })
        break
      case 503:
        Message.error({ content: '服务器宕机了-_-。sorry！' })
        break
      case 504:
        Message.error({ content: '服务器没有反应了！' })
        break
      default:
        Message.error({ content: '网络错误!' })
        break
    }
  }

  cancel () {
    this.source.cancel()
  }
}
