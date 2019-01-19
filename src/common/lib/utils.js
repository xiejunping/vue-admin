
export function trim (str) {
  if (String.prototype.trim) {
    return str === null ? '' : String.prototype.trim.call(str)
  } else {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  }
}

export function trimAll (str) {
  return str.replace(/\s*/g, '')
}

export function isEmpty (str) {
  const reg = new RegExp(/^[\s]{0,}$/)
  str = trim(str)
  return reg.test(str)
}

export function isArray (arr) {
  if (!Array.isArray) {
    Array.isArray = (arg) => {
      return Object.prototype.toString.call(arg) === '[object Array]'
    }
  }
  return Array.isArray(arr)
}
