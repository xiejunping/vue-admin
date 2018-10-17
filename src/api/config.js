const test = {
  baseurl: 'http://www-ceshi.dinoenglish.com',
  ossPath: 'http://oss2-test.dinoenglish.com',
  resPath: 'http://res-ceshi.dinoenglish.com'
}

const prod = {
  baseurl: 'http://www.dinoenglish.com',
  ossPath: 'http://oss.dinoenglish.com',
  resPath: 'http://res.dinoenglish.com'
}

const config = process.env.NODE_ENV === 'production' ? Object.assign({}, prod) : Object.assign({}, test)

export const HOST_API = config.baseurl
export const RES_CODE = 0
export const STATE_CODE = 200
export const MAX_CONTENT_LENGTH = 20000
export const XSRF_COOKIE = 'XSRF-TOKEN'
export const XSRF_HEADER = 'X-XSRF-TOKEN'
