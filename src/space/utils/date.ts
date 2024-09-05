/**
 * @desc 获取某年某月的总天数
 * @param {number} year 年份
 * @param {number} month 月份
 * @return {*} 返回某年某月的天数
 */
const getMonthDaysCount = function (year: number, month: number) {
  return new Date(year, month, 0).getDate()
}

/**
 * @desc 格式化时间
 * @param {*} date 时间
 * @param {string} fmt 格式，eg: ''yyyy-MM-dd HH:mm:ss'
 * @return {*} 格式化后的时间格式
 */
const formatDate = function (date: any, fmt: string) {
  if (date == null || date === '' || date === undefined) return null
  try {
    if (typeof date === 'string' && date.indexOf('-') !== -1) {
      date = date.replace(/-/g, '/')
    }
    date = new Date(date)
  } catch (e) {
    // eslint-disable-next-line no-self-assign
    date = date
  }
  fmt = fmt ? fmt : 'yyyy-MM-dd'
  const o: any = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substring(('' + o[k]).length)
        )
      }
    }
  }
  return fmt
}

/**
 * @desc 计算两个日期之间相差几个月
 * @param {string} date1 eg: 2021-02-30
 * @param {string} date2
 * @return {*} 相差的月份数
 */
const getMonths = (date1: string, date2: string) => {
  // 用-分成数组
  const d1 = date1.split('-')
  const d2 = date2.split('-')
  // 获取年,月数
  const year1 = parseInt(d1[0], 0)
  const month1 = parseInt(d1[1], 0)
  const year2 = parseInt(d2[0], 0)
  const month2 = parseInt(d2[1], 0)
  // 通过年,月差计算月份差
  const months = (year2 - year1) * 12 + (month2 - month1)
  return months
}

/**
 * @desc 将时间转化成“XX分钟前”或“XX小时前”或“yyyy-mm-dd  hh:mm:ss”
 * @param {number} timestamp 时间戳
 * @return {*}
 */
const dateToDesc = function (timestamp: number) {
  timestamp = Number(timestamp)
  let timeDiffer = new Date().getTime() - timestamp
  timeDiffer = timeDiffer / 1000 / 60
  if (timeDiffer < 60) {
    return Math.ceil(timeDiffer) + '分钟前'
  }
  timeDiffer = timeDiffer / 60
  if (timeDiffer < 24) {
    return Math.ceil(timeDiffer) + '小时前'
  }
  const date = new Date(timestamp)
  const tempDate = new Date()
  const year = date.getFullYear()
  const tempYear = tempDate.getFullYear()
  let month: number | string = date.getMonth() + 1
  const tempMonth = tempDate.getMonth() + 1
  let day: number | string = date.getDate()
  const tempDay = tempDate.getDate()
  let hour: number | string = date.getHours()
  let minutes: number | string = date.getMinutes()

  let result = ' '
  if (year !== tempYear) {
    result += year + '-'
  }
  if (month !== tempMonth || day !== tempDay) {
    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day
    result += month + '-' + day + ' '
  }
  hour = hour < 10 ? '0' + hour : hour
  minutes = minutes < 10 ? '0' + minutes : minutes
  result += hour + ':' + minutes
  return result
}

/**
 * @desc 获取传入的时间是星期几
 * @param {string} value eg: '2021-02-01'
 * @return {*} 返回星期几 eg: 星期五
 */
const getWeekZh = function (value: string) {
  const dateArray: any = value.split('-')
  const zhWeek =
    '星期' +
    '日一二三四五六'.charAt(
      new Date(dateArray[0], parseInt(dateArray[1], 0) - 1, dateArray[2]).getDay()
    )
  return zhWeek
}

/**
 * @desc 获取今年还剩多少天
 */
const restDayOfYear = function () {
  const fullyear: number = new Date().getFullYear()
  const nextyear: number = fullyear + 1
  const lastday: any = new Date(new Date(nextyear, 0, 1).getTime() - 1) // 本年的最后一毫秒：
  const now: any = new Date()
  const diff = lastday - now // 毫秒数

  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export { getMonthDaysCount, formatDate, getMonths, dateToDesc, getWeekZh, restDayOfYear }
