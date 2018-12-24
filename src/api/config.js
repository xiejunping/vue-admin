const test = {
  baseurl: 'http://localhost:3000',
  ossPath: '',
  resPath: ''
}

const prod = {
  baseurl: 'https://www.jsvue.cn/api',
  ossPath: '',
  resPath: ''
}

const config = process.env.NODE_ENV === 'production' ? Object.assign({}, prod) : Object.assign({}, test)

export const HOST_API = config.baseurl
export const RES_CODE = 0
export const STATE_CODE = 200
export const MAX_CONTENT_LENGTH = 20000
export const XSRF_COOKIE = 'XSRF-TOKEN'
export const XSRF_HEADER = 'X-XSRF-TOKEN'
export const SECRET_KEY = 'WAPMAN'
export const COOKIE_EXPIRES = 1
