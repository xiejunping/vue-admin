const test = {
  baseurl: 'http://localhost:5000',
  ossPath: '',
  resPath: ''
}

const prod = {
  baseurl: '',
  ossPath: '',
  resPath: ''
}

const config = process.env.NODE_ENV === 'production' ? Object.assign({}, prod) : Object.assign({}, test)

export const HOST_API = config.baseurl
export const RES_CODE = 0
export const STATE_CODE = 200
export const MAX_CONTENT_LENGTH = 20000
export const XSRF_COOKIE = 'abc' // XSRF-TOKEN
export const XSRF_HEADER = 'X-XSRF-TOKEN'
export const COOKIE_EXPIRES = 1
