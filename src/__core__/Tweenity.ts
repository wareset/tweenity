import { object_is, object_keys, is_native_object, is_native_array } from './utils'
import { _requestAnimationFrame } from './_raf'
import { easeLinear } from './easing'

type ITask = {
  p: ITask
  n: ITask
  // changed
  c: boolean
  // offset
  o: number
  // time
  t: number
  // easing
  easing: (n: number) => number
  // delay
  delay: number
  // duration
  duration: number
  // elapsed
  b: number
  // tween
  s: Tweenity<any>
  // yoyo
  yoyo: boolean
  // repeat
  repeat: boolean | number
  // from
  f: any
  // to
  // to: Partial<T>
  // delta
  // delta: number
  // interpolator
  i: ReturnType<typeof get_interpolator>
}

const FST = { p: null, n: null } as unknown as ITask
FST.p = FST.n = FST
let CUR = FST

const noop = () => {}

const select_val = (a: any, b: any) => (a != null ? a : b)

const deep_equal = (a: unknown, b: unknown) => {
  if (typeof a === 'object') {
    if (is_native_array(a) && is_native_array(b) && a.length === b.length) {
      for (let i = a.length; i-- > 0; ) if (!deep_equal(a[i], b[i])) return false
      return true
    }
    if (is_native_object(a) && is_native_object(b)) {
      for (let k in a) if (!deep_equal(a[k], b[k])) return false
      return true
    }
  }
  return object_is(a, b)
}

const run_on_update = (tween: Tweenity<any>, now: any) => {
  if (!deep_equal(tween.now, now)) {
    // @ts-ignore
    tween._.onUpdate.call(tween, (tween.now = now))
  }
}

const remove_queue_item = (tween: Tweenity<any>) => {
  // @ts-ignore
  const task = tween._.task
  // @ts-ignore
  if (task) (task.p.n = task.n), (task.n.p = task.p), (tween._.task = null)
}

const f1 = function (this: any, bi: any, i: any) {
  return get_interpolator(this[i], bi)
}
const f2 = function (this: any, key: any) {
  this[0][key] = get_interpolator(this[1][key], this[2][key])
}
const f3 = function (this: any, key: any) {
  this[1][key] = this[0][key](this[2])
}
const get_interpolator = (a: any, b: any) => {
  if (a !== b && a === a) {
    const type = typeof a
    if (type === typeof b)
      switch (type) {
        case 'number': {
          const delta = b - a
          return (t: number) => (t < 1 ? t * delta + a : b)
        }
        case 'object': {
          if (is_native_array(a) && is_native_array(b)) {
            const arr = b.map(f1, a)
            return (t: number) => arr.map((fn: any) => fn(t))
          }
          if (is_native_object(a) && is_native_object(b)) {
            const keys = object_keys(b)
            const interpolators: any = {}
            keys.forEach(f2, [interpolators, a, b])
            return (t: number) => {
              const res: any = {}
              keys.forEach(f3, [interpolators, res, t])
              return res
            }
          }
        }
      }
  }
  return (t: number) => (t < 1 ? a : b)
}

const calc = (task: ITask, t: number) => {
  let offset = task.o
  if (t > offset) {
    const tween = task.s
    if (!offset) task.t = task.delay + t
    else offset -= t
    if (tween.paused || DEFAULTS.paused) {
      task.t -= offset
    } else if (t >= task.t) {
      const duration = task.duration
      const elapsed = (task.b -= task.c ? offset : ((task.c = true), 0))
      // const elapsed = (task.b -= offset)
      if (elapsed < duration) {
        run_on_update(tween, task.i(task.easing(elapsed / duration)))
      } else {
        run_on_update(tween, task.i(task.easing(1)))
        // @ts-ignore
        if (tween._.task === task) {
          const repeat = task.repeat
          const is_num = repeat === +repeat
          if (is_num ? repeat > 0 : repeat) {
            const now = tween.now
            const yoyo = task.yoyo
            tween.to(yoyo ? task.f : (((tween as any).now = task.f), now), {
              yoyo,
              easing: task.easing,
              delay: task.delay,
              duration: duration,
              repeat: is_num ? repeat - 1 : repeat
            })
            // @ts-ignore
            yoyo || (tween.now = now)
            // @ts-ignore
            if ((task = tween._.task)) {
              task.o = t
              task.t = task.delay + t
            }
          } else {
            remove_queue_item(tween)
          }
        }
      }
    }

    task.o = t
  }
}

let queueNeedRun = false
export const DEFAULTS = {
  ticker: (t: number) => {
    for (CUR = FST; (CUR = CUR.n) !== FST; ) calc(CUR, t)
    if ((queueNeedRun = FST.n !== FST)) _requestAnimationFrame(DEFAULTS.ticker)
  },
  paused: false,
  yoyo: false,
  repeat: false,
  delay: 0,
  duration: 0,
  easing: easeLinear
}

// object
export type TweenityValue =
  | (readonly TweenityValue[] | [])
  | { [key: string]: TweenityValue }
  | (null | undefined | boolean | number | bigint | string | symbol | ((...a: any[]) => any))

// type Values<T> = T extends object ? never : T

// export type TweenityValue =
//   | Values<null | undefined | boolean | number | bigint | string | symbol | ((...a: any[]) => any)>
//   | (readonly TweenityValue[] | [])
//   | { [key: string]: TweenityValue }

export type TweenityOptions<T extends TweenityValue> = {
  yoyo?: boolean
  repeat?: boolean | number
  delay?: number
  duration?: number
  easing?: (n: number) => number
  onUpdate?: (this: Tweenity<T>, value: T) => any
}

type TweenityService<T extends TweenityValue = number> = {
  task: ITask | null
  yoyo: boolean | undefined
  repeat: boolean | number | undefined
  delay: number
  duration: number
  easing: (n: number) => number
  onUpdate: (this: Tweenity<T>, value: T) => any
}
type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T
// type DeepPartial<T> = T extends { [key: string | number]: any }
//   ? { [P in keyof T]?: DeepPartial<T[P]> }
//   : T

export class Tweenity<T extends TweenityValue> {
  private readonly _: TweenityService<T>
  readonly now: T
  paused: boolean

  constructor(now: T, options?: TweenityOptions<T>) {
    options || (options = {})
    this._ = {
      task: null,
      yoyo: select_val(options.yoyo, DEFAULTS.yoyo),
      repeat: select_val(options.repeat, DEFAULTS.repeat),
      delay: select_val(options.delay, DEFAULTS.delay),
      duration: select_val(options.duration, DEFAULTS.duration),
      easing: select_val(options.easing, DEFAULTS.easing),
      onUpdate: options.onUpdate || noop
    }
    this.paused = false
    this.now = now
  }

  resume() {
    this.paused = false
  }
  pause() {
    this.paused = true
  }
  stop() {
    remove_queue_item(this)
  }

  set(now: DeepPartial<T>) {
    remove_queue_item(this)
    // @ts-ignore
    run_on_update(this, get_interpolator(this.now, now)(1))
  }

  to(to: DeepPartial<T>, options?: TweenityOptions<T>) {
    remove_queue_item(this)
    const from = this.now
    // @ts-ignore
    if (!deep_equal(from, to)) {
      options || (options = {})
      const _ = this._
      const task: ITask = {
        p: null as unknown as ITask,
        n: null as unknown as ITask,
        c: false,
        o: 0,
        t: 0,
        easing: options.easing || _.easing,
        delay: select_val(options.delay, _.delay),
        duration: select_val(options.duration, _.duration),
        b: 0,
        s: this,
        yoyo: select_val(options.yoyo, _.yoyo),
        repeat: select_val(options.repeat, _.repeat),
        f: from,
        // @ts-ignore
        i: get_interpolator(from, to)
      }
      _.task = CUR = (task.p = (task.n = CUR === FST ? FST : CUR.n).p).n = task.n.p = task
      queueNeedRun || ((queueNeedRun = true), _requestAnimationFrame(DEFAULTS.ticker))
    }
  }
}

// const qq1 = new Tweenity([{ x: 12, y: 5, s: [{ d: 56 }, 76] }, 4, [4, 4]])

// qq1.to([{ x: 11, s: [{ d: 23 }, 3] }, , [435, 5]])

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
