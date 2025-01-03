// import { is_native_object, is_native_array } from './utils'
// import { object_is } from './utils'
import { _requestAnimationFrame } from './_raf'
import { easeLinear } from './easing'

type ITask = {
  p: ITask
  n: ITask
  // offset
  o: number
  // time // delayfake
  // v: number
  // easing
  e: (n: number) => number
  // delay
  d: number
  // duration
  m: number
  // elapsed
  c: number
  // tween
  s: Tweenity<any>
  // yoyo
  // y: boolean | number
  // repeat
  // r: boolean | number
  // from
  // f: any
  // to
  t: any
  // delta
  // delta: number
  // interpolator
  i: ReturnType<typeof get_interpolator> | null
}

const FST = { p: null, n: null } as unknown as ITask
FST.p = FST.n = FST
// let CUR = FST

const noop = () => {}

const select_val = (a: any, b: any) => (a != null ? a : b)

// const deep_equal = (a: unknown, b: unknown) => {
//   if (typeof a === 'object' && a) {
//     if (is_native_array(a) && is_native_array(b) && a.length >= b.length) {
//       for (let i = b.length; i-- > 0; ) if (i in b && !deep_equal(a[i], b[i])) return false
//       return true
//     }
//     if (is_native_object(a) && is_native_object(b)) {
//       for (let k in b) if (!deep_equal(a[k], b[k])) return false
//       return true
//     }
//   }
//   return object_is(a, b)
// }

const is_not_equal_deep = (a: any, b: any) => {
  if (a === a ? a !== b : b === b) {
    if (a && b && typeof a === 'object' && typeof b === 'object') {
      for (let k in b) if (is_not_equal_deep(a[k], b[k])) return true
      return false
    }
    return true
  }
  return false
}

const run_on_update = (tween: Tweenity<any>, now: any, coef: number) => {
  // if (isComplete || !deep_equal(tween.now, now)) {
  // @ts-ignore
  tween._.onUpdate.call(tween, (tween.now = now), coef)
  // }
}

const remove_queue_item = (tween: Tweenity<any>) => {
  const task = tween._.task
  if (task) (task.o = NaN), (task.p.n = task.n), (task.n.p = task.p), (tween._.task = null)
}

const get_interpolator = (a: any, b: any) => {
  if (a !== b && a === a) {
    let c = typeof a as any
    if (c === typeof b)
      switch (c) {
        case 'number':
          return (c = b - a), (t: number) => (t < 1 ? t * c + a : b)
        case 'object':
          if (a && b) {
            c = {}
            for (const k in b) c[k] = get_interpolator(a[k], b[k])
            return (t: number) => {
              for (const k in c) a[k] = c[k](t)
              return a
            }
          }
      }
  }
  return (t: number) => (t < 1 ? a : b)
}

const calc = (task: ITask, t: number) => {
  let offset = task.o
  if (t > offset) {
    if (!offset) {
      // task.v = task.d + t
      task.d += t
    } else {
      const tween = task.s
      offset -= t
      if (tween.paused || DEFAULTS.paused) {
        task.d -= offset
      } else if (t >= task.d) {
        const duration = task.m
        const elapsed = (task.c -= offset)
        const coef = elapsed < duration ? elapsed / duration : 1
        task.i || (task.i = get_interpolator(tween.now, task.t))

        coef < 1
          ? run_on_update(tween, task.i(task.e(coef)), coef)
          : (remove_queue_item(tween), run_on_update(tween, task.i(1), 1))

        // if (elapsed < duration) {
        //   run_on_update(tween, task.i(task.e(elapsed / duration)))
        // } else {
        //   run_on_update(tween, task.i(task.e(1)))
        //   // @ts-ignore
        //   if (tween._.task === task) {
        //     const yoyo = task.y
        //     const is_num = yoyo === +yoyo
        //     if (is_num ? yoyo > 0 : yoyo) {
        //       tween.to(task.f, {
        //         yoyo: is_num ? yoyo - 1 : yoyo,
        //         easing: task.e,
        //         delay: task.d,
        //         duration: task.m
        //       })
        //       // @ts-ignore
        //       // if ((task = tween._.task)) {
        //       //   ;(task.o = t), (task.v = task.d + t)
        //       // }
        //     } else {
        //       remove_queue_item(tween)
        //     }
        //   }
        // }
      }
    }

    task.o = t
  }
}

let queueNeedRun = false
export const DEFAULTS = {
  ticker: (t: number) => {
    for (let CUR = FST; (CUR = CUR.n) !== FST; ) calc(CUR, t)
    if ((queueNeedRun = FST.n !== FST)) _requestAnimationFrame(DEFAULTS.ticker)
  },
  paused: false,
  // yoyo: false as boolean | number,
  // repeat: false,
  delay: 0,
  duration: 0,
  easing: easeLinear
}

// object
export type TweenityValue =
  | (readonly unknown[] | [])
  | { [key: string]: TweenityValue }
  | (
      | object
      | null
      | undefined
      | boolean
      | number
      | bigint
      | string
      | symbol
      | ((...a: any[]) => any)
    )

// type Values<T> = T extends object ? never : T

// export type TweenityValue =
//   | Values<null | undefined | boolean | number | bigint | string | symbol | ((...a: any[]) => any)>
//   | (readonly TweenityValue[] | [])
//   | { [key: string]: TweenityValue }

export type TweenityOptions<T extends TweenityValue> = {
  // yoyo?: boolean | number
  // repeat?: boolean | number
  delay?: number
  duration?: number
  easing?: (n: number) => number
  onUpdate?: (this: Tweenity<T>, newValue: T, coef: number) => any
}

type TweenityService<T extends TweenityValue = number> = {
  task: ITask | null
  // yoyo: boolean | number
  // repeat: boolean | number | undefined
  delay: number
  duration: number
  easing: (n: number) => number
  onUpdate: (this: Tweenity<T>, newValue: T, coef: number) => any
}
type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T
// type DeepPartial<T> = T extends { [key: string | number]: any }
//   ? { [P in keyof T]?: DeepPartial<T[P]> }
//   : T

export class Tweenity<T extends TweenityValue> {
  readonly _: TweenityService<T>
  readonly now: T
  paused: boolean

  constructor(now: T, options?: TweenityOptions<T>) {
    options || (options = {})
    this._ = {
      task: null,
      // yoyo: select_val(options.yoyo, DEFAULTS.yoyo),
      // repeat: select_val(options.repeat, DEFAULTS.repeat),
      delay: select_val(options.delay, DEFAULTS.delay),
      duration: select_val(options.duration, DEFAULTS.duration),
      easing: select_val(options.easing, DEFAULTS.easing),
      onUpdate: options.onUpdate || noop
    }
    this.paused = false
    this.now = now
    this._.onUpdate.call(this, now, 0)
  }

  resume() {
    this.paused = false
    return this
  }
  pause() {
    this.paused = true
    return this
  }
  stop() {
    remove_queue_item(this)
    return this
  }

  set(now: DeepPartial<T>, coef?: number) {
    run_on_update(this, get_interpolator(this.now, now)(1), select_val(coef, 0))
    return this
  }

  to(to: DeepPartial<T>, options?: TweenityOptions<T>) {
    remove_queue_item(this)
    if (is_not_equal_deep(this.now, to)) {
      options || (options = {})
      const _ = this._
      const task: ITask = {
        p: null as unknown as ITask,
        n: null as unknown as ITask,
        o: 0,
        // v: 0,
        e: options.easing || _.easing,
        d: select_val(options.delay, _.delay),
        m: select_val(options.duration, _.duration),
        c: 0,
        s: this,
        // y: select_val(options.yoyo, _.yoyo),
        // r: select_val(options.repeat, _.repeat),
        // f: null,
        t: to,
        // @ts-ignore
        i: null // get_interpolator(from, to)
      }
      // _.task = CUR = (task.p = (task.n = CUR === FST ? FST : CUR.n).p).n = task.n.p = task
      _.task = (task.p = (task.n = FST).p).n = task.n.p = task
      queueNeedRun || ((queueNeedRun = true), _requestAnimationFrame(DEFAULTS.ticker))
    }
    return this
  }
}

// const qq1 = new Tweenity([{ x: 12, y: 5, s: [{ d: 56 }, 76] }, 4, [4, 4]])
// qq1.to([{ x: 11, s: [{ d: 23 }, 3] }, , [435, 5]])

// type Ppp<T> = T extends object ? readonly object : any

// const qwe = <T extends TweenityValue>(t: T) => (p: DeepPartial<T>) => [p, t]

// qwe([{ x: 12, y: 5, s: [{ d: ['', 23] }, 76] }, 4, [4, 4]])([{ x: 11, s: [{ d: 23 }, 3] }, , [435, 5]])

// const qq2 = new Tweenity(5)

// qq2.to(2)

// const qq = new Tweenity(10)

// console.log(qq)

// qq.to(30)

// setTimeout(() => {
//   console.log(22222222222)
//   qq.pause = true
// }, 250)

// setTimeout(() => {
//   console.log(22222222222)
//   qq.pause = false
// }, 750)

// // setTimeout(() => {
// //   console.log(22222222222)
// //   qq.to(5)
// // }, 200)
