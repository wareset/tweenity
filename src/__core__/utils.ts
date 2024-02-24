export const __Array__ = Array
export const __Object__ = Object

export const object_is =
  __Object__.is ||
  (((x, y) => (x === y ? x !== 0 || 1 / x === 1 / y : x !== x && y !== y)) as typeof Object.is)

export const object_keys = __Object__.keys
export const object_prototype = __Object__.prototype
export const object_getPrototypeOf = __Object__.getPrototypeOf

export const is_array = __Array__.isArray
export const array_prototype = __Array__.prototype

export const is_native_array = (a: any): a is any[] =>
  !!((a && (a = object_getPrototypeOf(a)) === array_prototype) || !a)

export const is_native_object = (a: any): a is { [key: string]: any } =>
  !!((a && (a = object_getPrototypeOf(a)) === object_prototype) || !a)
