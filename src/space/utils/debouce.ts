/**
 *
 *
 * @desc 防抖
 * @param {Function} func 调用方法
 * @param {number} time 时间（单位毫秒）
 * @param {boolean} [immediate=false] 是否立即执行
 * @return {*}
 */
export function debounce(func: any, time: number, immediate = false) {
  let timer: number | null = null
  return (...args: any) => {
    if (timer) clearInterval(timer)
    if (immediate) {
      if (!timer) func.apply(window, args)
      timer = window.setTimeout(() => {
        timer = null
      }, time)
    } else {
      timer = window.setTimeout(() => {
        func.apply(window, args)
      }, time)
    }
  }
}
/**
 *
 *
 * @export
 * @param {Function} func 调用方法
 * @param {number} time 时间（单位毫秒）
 * @param {boolean} [immediate=false] 是否立即执行
 * @return {*}
 */
export function throttle(func: any, time: number, immediate = false) {
  if (immediate) {
    let prevTime = 0
    return (...args: any) => {
      const nowTime = Date.now()
      if (nowTime - prevTime >= time) {
        func.apply(window, args)
        prevTime = nowTime
      }
    }
  } else {
    let timer: number | null = null
    return (...args: any) => {
      if (!timer) {
        func.apply(window, args)
        timer = window.setTimeout(() => {
          if (timer) clearInterval(timer)
          timer = null
        }, time)
      }
    }
  }
}
