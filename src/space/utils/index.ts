// 兼容低版本安卓及ie浏览器不支持Object.assign
;(function () {
  if (typeof Object.assign !== 'function') {
    Object.assign = function (target: any, ..._args: any[]) {
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object')
      }

      target = Object(target)
      for (let index = 1; index < _args.length; index++) {
        const source = _args[index]
        if (source != null) {
          for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key]
            }
          }
        }
      }
      return target
    }
  }
})()
export * from './rem'
export * from './date'
// export * from './rule'
export * from './price'
export * from './web'
export * from './debouce'
