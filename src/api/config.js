let config = {}
const resCode = '0'

const test = {
  baseurl: 'http://www-ceshi.dinoenglish.com',
  ossPath: 'http://oss2-test.dinoenglish.com',
  resPath: 'http://res-ceshi.dinoenglish.com',
  resCode
}

const prod = {
  baseurl: 'http://www.dinoenglish.com',
  ossPath: 'http://oss.dinoenglish.com',
  resPath: 'http://res.dinoenglish.com',
  resCode
}

if (process.env.NODE_ENV === 'production') {
  config = prod
} else {
  config = test
}

export default config
