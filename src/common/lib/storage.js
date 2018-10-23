let ls = window.localStorage
let ss = window.sessionStorage

export const setLocal = (key, value) => {
  if (ls && key && value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
      value = 'obj-' + value
    } else {
      value = 'str-' + value
    }
    ls.setItem(key, value)
  }
}

export const getLocal = key => {
  if (ls) {
    let v = ls.getItem(key)
    if (!v) return
    if (v.indexOf('obj-') === 0) {
      v = v.slice(4)
      return JSON.parse(v)
    } else if (v.indexOf('str-') === 0) {
      return v.slice(4)
    }
  }
}

export const rmLocal = key => {
  if (ls && key) {
    ls.removeItem(key)
  }
}

export const clearLocal = () => {
  ls && ls.clear()
}

export const setSession = (key, value) => {
  if (ss && key && value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
      value = 'obj-' + value
    } else {
      value = 'str-' + value
    }
    ss.setItem(key, value)
  }
}

export const getSession = key => {
  if (ss) {
    let v = ss.getItem(key)
    if (!v) return
    if (v.indexOf('obj-') === 0) {
      v = v.slice(4)
      return JSON.parse(v)
    } else if (v.indexOf('str-') === 0) {
      return v.slice(4)
    }
  }
}

export const rmSession = key => {
  if (ss && key) {
    ss.removeItem(key)
  }
}

export const clearSession = () => {
  ss && ss.clear()
}
