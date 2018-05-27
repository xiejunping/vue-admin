import axios from 'axios'
import FormData from 'form-data'
import config from './config'

const HOST_API = config.baseurl
const RES_CODE = config.resCode
const STATE_CODE = 200
const MAX_CONTENT_LENGTH = 20000

const objToFormData = (obj) => {
  const form = new FormData()

  for (const key in obj) {
    if ({}.hasOwnProperty.call(obj, key)) {
      form.append(key, obj[key])
    }
  }
  return form
}

export default class ReqClient {
  /**
   * 构造方法
   * @param {String} url 请求路径
   * @param {Object} data 请求参数
   * @param {Number} timeout 超时时间
   * @param {String} method 请求类型
   * @param {String} contentType 返回类型
   */
  constructor ({url, data, timeout, method, contentType}) {
    this.url = url
    this.data = data
    this.method = method || 'GET'
    this.timeout = timeout || 60000
    this.resType = contentType || 'json'
    this.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    this.init()
  }
  /**
   * 请求参数初始化
   * @return {Objcet} params
   */
  init () {
    this.option = {
      baseURL: HOST_API,
      url: this.url,
      method: this.method,
      data: this.data,
      timeout: this.timeout,
      headers: this.headers,
      withCredentials: false,
      responseType: this.resType,
      onUploadProgress: this.onUpload,
      onDownloadProgress: this.onDown,
      validateStatus: status => {
        return status >= 200 && status < 300
      },
      maxContentLength: MAX_CONTENT_LENGTH
    }
  }

  /**
   * 接口数据请求回调
   * @param response
   * @returns {Promise<*>}
   */
  async handleResponse (response) {
    // HTTP状态码不正确
    if (response.status !== STATE_CODE) httpFaildHandle(response)
    else {
      if (response.data.code !== RES_CODE) throw new Error(response.data.msg)
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
    const response = await axios.request(this.option)
    const data = await this.handleResponse(response)
    return data
  }

  /**
   * 接口请求
   * @returns {Promise<*>}
   */
  async reqData () {
    this.option.params = this.option.data
    const response = await axios.request(this.option)

    const data = await this.handleResponse(response)
    return data
  }

  /**
   * 接口请求 表单
   * @returns {Promise<*>}
   */
  async reqFormData () {
    this.option.params = objToFormData(this.option.data)
    const response = await axios.request(this.option)

    const data = await this.handleResponse(response)
    return data
  }
}
