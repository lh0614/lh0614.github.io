/* 用来存放一些前端常用的正则验证 */
// import { interceptDot } from './price'

function uniteFn(reg: RegExp, value: string) {
  if (!reg.test(value)) {
    return false
  } else {
    return true
  }
}

/**
 * @desc 第二代身份证号码正则
 * @param {string} idCard 身份证号码
 * @return {boolean}
 */
const isIdCardVailable = function (idCard: string) {
  const regIdCard: RegExp = new RegExp(
    /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  )
  return uniteFn(regIdCard, idCard)
}

/**
 * @desc 手机号验证
 * @param {string} phone 手机号
 * @return {boolean}
 */
const isPhoneVailable = function (phone: string) {
  const regPhone: RegExp = new RegExp(
    /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/
  )
  return uniteFn(regPhone, phone)
}

/**
 * @desc 邮箱验证
 * @param {string} email 邮箱
 * @return {boolean}
 */
const isEmailVailable = function (email: string) {
  const regEmail: RegExp = new RegExp(
    /^([A-Za-z0-9_\-\\.\u4e00-\u9fa5])+\\@([A-Za-z0-9_\-\\.])+\.([A-Za-z]{2,8})$/
  )
  return uniteFn(regEmail, email)
}

/**
 * @desc 日期格式验证
 * @param {string} date 日期，eg:2021-12-25
 * @return {boolean}
 */
const isDateVailable = function (date: string) {
  const regDate: RegExp = new RegExp(/^\d{4}(\\-)\d{1,2}\1\d{1,2}$/)
  return uniteFn(regDate, date)
}

/**
 * @desc 日期格式【严格】验证
 * @param {string} date 日期，eg:2021-12-25
 * @return {boolean}
 */
const isStrictDateVailable = function (date: string) {
  const regStrictDate: RegExp = new RegExp(
    /^(?:[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/
  )
  return uniteFn(regStrictDate, date)
}

/**
 * @desc 是否含有中文 验证
 * @param {string} cn 输入字段
 * @return {boolean}
 */
const isHasCnVailable = function (cn: string) {
  const regCn: RegExp = new RegExp(/[\u4E00-\u9FA5]/)
  return uniteFn(regCn, cn)
}

/**
 * @desc 只能输入中文 验证
 * @param {string} cn 输入字段
 * @return {boolean}
 */
const isCnVailable = function (cn: string) {
  const regCn: RegExp = new RegExp(/^[\u4e00-\u9fa5]{0,}$/)
  return uniteFn(regCn, cn)
}

/**
 * @desc 只能由英文、数字、下划线组成
 * @param {string} value 输入字符
 * @return {boolean}
 */
const islangMixVailable = function (value: string) {
  const reg: RegExp = new RegExp(/^[\u4e00-\u9fa5]{0,}$/)
  return uniteFn(reg, value)
}

/**
 * @desc 验证是否两位小数，不接受负数
 * @param {string} value
 * @return {boolean}
 */
const isTwoDigVailable = function (value: string) {
  const reg: RegExp = new RegExp(
    /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
  )
  return uniteFn(reg, value)
}

/**
 * @desc 验证ip地址
 * @param {string} value ip地址，eg:10.1.242.26
 * @return {boolean}
 */
const isIpVailable = function (value: string) {
  const reg: RegExp = new RegExp(
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  )
  return uniteFn(reg, value)
}

/**
 * @desc 验证url域名合法
 * @param {string} value url地址
 * @return {boolean}
 */
const isUrlVailable = function (value: string) {
  const reg: RegExp = new RegExp(
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  )
  return uniteFn(reg, value)
}

/**
 * @function formatIdcard 银行卡格式化相关方法调用
 * @param  value 传入银行卡号
 * @param desensit 是否脱敏，默认true
 */
const formatIdcard = function (value: string) {
  if (!value || !judgeNum(value)) {
    return 0
  }
  value.replace(/(\d{4})/g, '$1 ')
  return value
}
/**
 * @function judgeNum 判断是否是数字
 * @param  value 传入数字
 */
export function judgeNum(value: string) {
  // 判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/
  // eslint-disable-next-line no-useless-escape
  const re = new RegExp(/(^[\-0-9][0-9]*(.[0-9]+)?)$/)
  if (!re.test(value)) {
    return false
  } else {
    return true
  }
}

/**
 * @function handlEncry 手机号/身份证/银行卡脱敏
 * @param  param 传入手机号还是银行卡或身份证号，如果手机号传入tel保留前三位数字,否则就默认保留前四位
 */
export function handlEncry(param: string) {
  const strlen = param.length
  if (strlen < 9) {
    return strlen
  }
  if (param === 'tel') {
    return param.replace(/^(.{3})(?:\d+)(.{4})$/, '$1******$2')
  } else {
    return param.replace(/^(.{4})(?:\d+)(.{4})$/, '$1******$2')
  }
}

/**
 * @function handlEncry 邮箱脱敏
 * @param  email 传入邮箱号
 */
export function emailEnctry(email: string) {
  const str = email.split('@')
  const str1 = str[0].substring(0, 3) + '****' + str[1].substring(2)
  return str1
}
/**
 * @function handlEncry 名字脱敏
 * @param  name 传入名字
 */
export function noPassByName(str: string) {
  if (str !== null && str !== undefined) {
    if (str.length <= 3) {
      return str.substring(0, 1) + '*'
    } else if (str.length > 3 && str.length <= 6) {
      return str.substring(0, 2) + '**'
    } else if (str.length > 6) {
      return str.substring(0, 2) + '****' + str.substring(6, str.length)
    }
  } else {
    return ''
  }
}
export {
  isIdCardVailable,
  isPhoneVailable,
  isEmailVailable,
  isDateVailable,
  isStrictDateVailable,
  isHasCnVailable,
  isCnVailable,
  islangMixVailable,
  isTwoDigVailable,
  isIpVailable,
  isUrlVailable,
  formatIdcard,
}
