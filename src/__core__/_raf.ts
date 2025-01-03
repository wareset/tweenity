// const now = typeof performance !== 'undefined' ? (): number => performance.now() : Date.now

// var vendors = ['ms', 'moz', 'webkit', 'o'];
// for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
//     window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
//     window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
//                                || window[vendors[x]+'CancelRequestAnimationFrame'];
// }

let _perf: any
let cAF: typeof cancelAnimationFrame
let rAF: typeof requestAnimationFrame

rAF =
  typeof requestAnimationFrame === 'function'
    ? ((cAF = cancelAnimationFrame), requestAnimationFrame)
    : // @ts-ignore
    typeof oRequestAnimationFrame === 'function'
    ? // @ts-ignore
      ((cAF = oCancelAnimationFrame), oRequestAnimationFrame)
    : // @ts-ignore
    typeof msRequestAnimationFrame === 'function'
    ? // @ts-ignore
      ((cAF = msCancelAnimationFrame), msRequestAnimationFrame)
    : // @ts-ignore
    typeof mozRequestAnimationFrame === 'function'
    ? // @ts-ignore
      ((cAF = mozCancelAnimationFrame), mozRequestAnimationFrame)
    : // @ts-ignore
    typeof webkitRequestAnimationFrame === 'function'
    ? // @ts-ignore
      ((cAF = webkitCancelAnimationFrame), webkitRequestAnimationFrame)
    : ((cAF = clearTimeout),
      (_perf = typeof performance === 'object' ? performance : Date),
      (callback: (t: number) => any) => setTimeout(() => callback(_perf.now()), 16))

export { rAF as _requestAnimationFrame, cAF as _cancelAnimationFrame }
