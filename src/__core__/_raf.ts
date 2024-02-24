// const now = typeof performance !== 'undefined' ? (): number => performance.now() : Date.now

// var vendors = ['ms', 'moz', 'webkit', 'o'];
// for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
//     window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
//     window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
//                                || window[vendors[x]+'CancelRequestAnimationFrame'];
// }

let _performance: any
let _cancelAnimationFrame: typeof cancelAnimationFrame
let _requestAnimationFrame: typeof requestAnimationFrame

_requestAnimationFrame =
  typeof requestAnimationFrame === 'function'
    ? ((_cancelAnimationFrame = cancelAnimationFrame), requestAnimationFrame)
    : // @ts-ignore
    typeof oRequestAnimationFrame === 'function'
    ? // @ts-ignore
      ((_cancelAnimationFrame = oCancelAnimationFrame), oRequestAnimationFrame)
    : // @ts-ignore
    typeof msRequestAnimationFrame === 'function'
    ? // @ts-ignore
      ((_cancelAnimationFrame = msCancelAnimationFrame), msRequestAnimationFrame)
    : // @ts-ignore
    typeof mozRequestAnimationFrame === 'function'
    ? // @ts-ignore
      ((_cancelAnimationFrame = mozCancelAnimationFrame), mozRequestAnimationFrame)
    : // @ts-ignore
    typeof webkitRequestAnimationFrame === 'function'
    ? // @ts-ignore
      ((_cancelAnimationFrame = webkitCancelAnimationFrame), webkitRequestAnimationFrame)
    : ((_cancelAnimationFrame = clearTimeout),
      (_performance = typeof performance === 'object' ? performance : Date),
      (callback: (t: number) => any) => setTimeout(() => callback(_performance.now()), 16))

export { _requestAnimationFrame, _cancelAnimationFrame }
