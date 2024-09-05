// 导出相应方法，以便作为sdk包使用方引入
function resetFontSize() {
  const d: HTMLDivElement = window.document.createElement('div')
  d.style.cssText =
    'width:1rem;height:0;overflow: hidden;position:absolute;z-index:-1;visibility: hidden;'
  window.document.body.appendChild(d)
  const computedWidth: string | null = window.getComputedStyle(d).width
  if (!computedWidth) {
    return
  }
  const dw: number = +computedWidth.slice(0, -2) // 1rem的实际展示px值
  if (!dw) {
    return
  }
  window.document.body.removeChild(d)
  const html: HTMLHtmlElement = window.document.querySelector('html') as HTMLHtmlElement

  let fz: number = 0
  if (html.style.fontSize) {
    fz = +html.style.fontSize.slice(0, -2) || 0 // 正常计算出来的rem基准值 , 可自行修改为rem计算好的值
  }
  let realRem: number = fz
  if (dw !== fz) {
    // 不相等 则被缩放了
    realRem = Math.pow(fz, 2) / dw
  }
  html.style.fontSize = realRem + 'px'
}

interface AutoRemOptions {
  baseScreenWidth?: number // 基础页面宽度
  iphoneXAdaptation?: boolean // 是否适配iphoneX
  screenMode: 'landscape' | 'portrait' // landscape横屏, portrait竖屏
  useHeightAsBasic?: boolean // 是否使用高度作为基准值
}

/**
 * 根据屏幕宽度自动计算出rem的基准值
 * @param options.screenMode 屏幕模式，landscape横屏, portrait竖屏
 * @param options.baseScreenWidth 基准设计稿屏幕宽度，若没有设置此项，则screenMode为portrait时默认为720，landscape时默认为1280
 * @param options.iphoneXAdaptation 是否适配iphoneX，只在横屏模式有效，iphoneX计算出的font-size会比实际小，默认为false
 */
export function autoRem(options?: AutoRemOptions) {
  options = Object.assign(
    {
      screenMode: 'portrait',
      iphoneXAdaptation: false,
      useHeightAsBasic: false,
    },
    options
  )

  // 如果没传入baseScreenWidth，则使用默认的基准宽度
  if (typeof options.baseScreenWidth === 'undefined') {
    if (options.screenMode === 'portrait') {
      options.baseScreenWidth = 720
    } else {
      options.baseScreenWidth = 1280
    }
  }

  const baseScreenWidth = options.baseScreenWidth as number
  const docEl: HTMLElement = window.document.documentElement as HTMLElement
  let dpr: number = window.devicePixelRatio || 1
  const resizeEvt: string = 'resize'
  const resizeCall = () => {
    const clientWidth: number = docEl.clientWidth
    const clientHeight: number = docEl.clientHeight
    if (!clientWidth) {
      docEl.style.fontSize = 100 + 'px'
    } else if (options && options.useHeightAsBasic) {
      docEl.style.fontSize = 100 * (clientHeight / baseScreenWidth) + 'px'
    } else if (options && options.iphoneXAdaptation && clientWidth > clientHeight * 1.9) {
      /**
       * 针对iphoneX等长宽比高于1.9的手机
       * 只有横屏模式下才会触发
       */
      docEl.style.fontSize = 100 * (clientWidth / 1.14 / baseScreenWidth) + 'px'
    } else {
      docEl.style.fontSize = 100 * (clientWidth / baseScreenWidth) + 'px'
    }
    resetFontSize()
  }

  resizeCall()
  dpr = dpr >= 3 ? 3 : dpr >= 2 ? 2 : 1
  docEl.setAttribute('data-dpr', `${dpr}`)

  window.addEventListener && window.addEventListener(resizeEvt, resizeCall, false)
}
