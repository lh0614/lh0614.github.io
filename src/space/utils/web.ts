import { isPhoneVailable, judgeNum } from './rule'

/**
 *
 *
 * @export 判断浏览器类型
 * @return 浏览器类型
 */
export function myBrowser() {
  const userAgent = navigator.userAgent // 取得浏览器的userAgent字符串

  const isOpera = userAgent.indexOf('Opera') > -1

  if (isOpera) {
    return 'Opera'
  } // 判断是否Opera浏览器

  if (userAgent.indexOf('Firefox') > -1) {
    return 'FF'
  } // 判断是否Firefox浏览器

  if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome'
  }

  if (userAgent.indexOf('Safari') > -1) {
    return 'Safari'
  } // 判断是否Safari浏览器

  if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
    return 'IE'
  } // 判断是否IE浏览器
}

/**
 *
 * @export 手机号加星号
 * @return {*}
 */
export function telEncry(value: string) {
  if (!value || !judgeNum(value.toString()) || !isPhoneVailable(value)) {
    return 0
  }
  value = value.replace(value.substring(3, 7), '****')
  return value
}

/**
 *
 *
 * @export getType 获取元素类型
 * @param {*} value
 * @return {*}
 */
export function getType(value: any) {
  return Object.prototype.toString.call(value).slice(8, -1)
}
/**
 * @export browserVersion 移动端浏览器、内核等判断
 * @param trident IE内核
 * @param presto opera内核
 * @param webKit 苹果、谷歌内核
 * @param gecko 是否为移动终端
 * @param ios ios终端
 * @param android android终端
 * @param iPhone iPhone或者QQHD浏览器
 * @param iPad 是否iPad
 * @param webApp web应用程序
 * @param weixin 是否微信
 * @return {*}
 */
export function browserVersion() {
  const u = navigator.userAgent
  return {
    trident: u.indexOf('Trident') > -1, // IE内核
    presto: u.indexOf('Presto') > -1, // opera内核
    webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
    iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, // 是否iPad
    webApp: u.indexOf('Safari') === -1, // 是否web应用程序，没有头部与底部
    weixin: u.indexOf('MicroMessenger') > -1, // 是否微信
  }
}

/**
 * @desc 获取当前页面url的某个参数(window.location.search)
 * @param {string} url
 * @param {string} param 要获取的参数key值
 * @return {string}
 */
export function getUrlArg(param: string): string {
  const url = window.location.href.replace('#/', '')
  const arr = url.split('?')
  const argStr = arr.length > 1 ? arr[1] : ''
  if (!argStr) {
    return ''
  }
  const arr2 = argStr.split('&').map(item => item.split('='))
  const key = param.toString()
  if (key) {
    const res = arr2.find(item => item[0] === key)
    if (res) {
      return res.length > 1 ? decodeURI(res[1]).toString() : ''
    } else {
      return ''
    }
  } else {
    return ''
  }
}

/**
 * @desc 获取url的所有参数参数，返回一个对象
 * @param {string} url
 * @return {object}
 */
export function getUrlQuery(url: string = window.location.href) {
  const obj: any = {}
  let temp
  const paramsGroup = url.replace('#/', '').split('?')[1] // name=QinYanFei&age=22&sex=0&phone=13083771680
  if (!paramsGroup) {
    return {}
  }
  const paramsObj = paramsGroup.split('&') // ["name=QinYanFei", "age=22", "sex=0", "phone=13083771680"]
  for (const index of paramsObj) {
    // for in是遍历（object）键名，for of是遍历（array）键值。
    temp = index.split('=') // 依次["name", "QinYanFei"]  ["age", "22"]  ["sex", "0"] ["phone", "13083771680"]
    obj[temp[0]] = decodeURI(temp[1]) // 键值：键名
  }
  return obj
}
