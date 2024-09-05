import { judgeNum } from './rule'
/**
 * @function interestRate 利率转化显示方法
 * @param  value 传入数字
 * @param  word 传入正负值
 */
export function interestRate(value: any, word: any) {
  if (!value || !judgeNum(value)) {
    return 0
  }
  value = value.replace(value, word + value + '%')
  return value
}

/**
 * @function interceptDot 确认金额保留小数后几位方法
 * @param  value 传入数字
 * @param  count 传入保留的位数
 * @param  roundtag 当count=0时，ceil：向上取整，floor：想下取整，不传参数就默认截取整数
 */
export function interceptDot(value: any, count: any, roundtag: string) {
  if (!value || !judgeNum(value) || !judgeNum(count)) {
    return 0
  }
  if (Number(count) === 0) {
    if (roundtag === 'ceil') {
      return Math.ceil(value)
    } else if (roundtag === 'floor') {
      return Math.floor(value)
    } else {
      return parseInt(value, 0)
    }
  }
  if (roundtag === 'round') {
    count = count ? parseInt(count, 0) : 0
    if (count <= 0) {
      return Math.round(value)
    }
    value = Math.round(value * Math.pow(10, count)) / Math.pow(10, count) // 四舍五入
    value = Number(value).toFixed(count) // 补足位数
  } else {
    value = Number(value)
      .toFixed(Number(count) + 1)
      .slice(0, -1)
    // const reg = new RegExp(`(\\d+\\.?\\d{0,${count}})[\\.\\d]*`);
    // value= (value + '.' + '0'.repeat(count)).replace(reg, '$1' + '0'.repeat(count - 1)).replace(reg, '$1');
  }
  return value
}

/**
 * @desc 将数字转化为 万、亿单位
 * @param number num
 * @return {string}
 */
export function unitConvert(num: number) {
  if (!num) {
    return ''
  }
  const moneyUnits = ['元', '万', '亿', '万亿']
  const dividend = 10000
  let curentNum = num
  // 转换数字
  let curentUnit = moneyUnits[0]
  // 转换单位
  for (let i = 0; i < 4; i++) {
    curentUnit = moneyUnits[i]
    if (strNumSize(curentNum) < 5) {
      break
    }
    curentNum = curentNum / dividend
  }
  const m = { num: '', unit: '' }
  m.num = curentNum.toFixed(2)
  m.unit = curentUnit
  return m.num + m.unit
}
// 获取入参的位数
function strNumSize(tempNum: number) {
  const stringNum = tempNum.toString()
  const index = stringNum.indexOf('.')
  let newNum = stringNum
  if (index !== -1) {
    newNum = stringNum.substring(0, index)
  }
  return newNum.length
}

/**
 * @desc 小数转为百分数，加上%
 * @param {number} point
 * @return string
 */
export function toPercent(point: number) {
  if (!point) {
    return ''
  }
  let str = Number(point * 100).toFixed(2)
  str += '%'
  return str
}
