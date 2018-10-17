import Moment from 'moment'

const DATEREGEXP = /\d{4}(-|\/|.)\d{1,2}\d{1,2}/

function dateFormat (val, fmt) {
  return DATEREGEXP.test(val) ? Moment(val).format(fmt) : val
}

// 短日期
export function shortDate (val) {
  return dateFormat(val, 'MM-DD')
}

// 整日期
export function fullDateFormat (val) {
  return dateFormat(val, 'YYYY-MM-DD')
}

// 日期到时分
export function datetimeToMin (val) {
  return dateFormat(val, 'YYYY-MM-DD HH:mm')
}

// 日期与时间
export function datetime (val) {
  return dateFormat(val, 'YYYY-MM-DD HH:mm:ss')
}

// 掩码
export function maskText (str, start, len) {
  let arr = str.split('')
  let index = 0
  arr.forEach(function (t, i) {
    if (i >= start && index < len) {
      arr[i] = '*'
      index++
    }
  })
  return arr.join('')
}
