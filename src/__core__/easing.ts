export const easeLinear = (x: number) => {
  return x
}

export const easeSineIn = (x: number) => {
  return 1 - Math.cos((x * Math.PI) / 2)
}
export const easeSineOut = (x: number) => {
  return Math.sin((x * Math.PI) / 2)
}
export const easeSineInOut = (x: number) => {
  // return (Math.cos(Math.PI * x) - 1) / -2
  return (1 - Math.cos(x * Math.PI)) / 2
}

export const easeQuadIn = (x: number) => {
  return x * x
}
export const easeQuadOut = (x: number) => {
  return 1 - --x * x
}
export const easeQuadInOut = (x: number) => {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2
}

export const easeCubicIn = (x: number) => {
  return x * x * x
}
export const easeCubicOut = (x: number) => {
  return 1 + --x * x * x
}
export const easeCubicInOut = (x: number) => {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}

export const easeQuartIn = (x: number) => {
  return x * x * x * x
}
export const easeQuartOut = (x: number) => {
  return 1 - --x * x * x * x
}
export const easeQuartInOut = (x: number) => {
  return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2
}

export const easeQuintIn = (x: number) => {
  return x * x * x * x * x
}
export const easeQuintOut = (x: number) => {
  // return 1 - Math.pow(1 - x, 5);
  return 1 + --x * x * x * x * x
}
export const easeQuintInOut = (x: number) => {
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2
}

export const easeExpoIn = (x: number) => {
  return x === 0 ? 0 : Math.pow(2, 10 * x - 10)
}
export const easeExpoOut = (x: number) => {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
}
export const easeExpoInOut = (x: number) => {
  return x === 0 || x === 1
    ? x
    : x < 0.5
    ? Math.pow(2, 20 * x - 10) / 2
    : Math.pow(2, 10 - x * 20) / -2 + 1
}

export const easeCircIn = (x: number) => {
  return 1 - Math.sqrt(1 - x * x)
}
export const easeCircOut = (x: number) => {
  return Math.sqrt(1 - --x * x)
}
export const easeCircInOut = (x: number) => {
  // return (x *= 2) < 1 ? (Math.sqrt(1 - x * x) - 1) / -2 : (Math.sqrt(1 - (x -= 2) * x) + 1) / 2
  return ((x *= 2) < 1 ? 1 - Math.sqrt(1 - x * x) : Math.sqrt(1 - (x -= 2) * x) + 1) / 2
}

export const easeBackIn = (x: number) => {
  const s = 1.70158
  return x * x * ((s + 1) * x - s)
}
export const easeBackOut = (x: number) => {
  const s = 1.70158
  return 1 + --x * x * ((s + 1) * x + s)
}
export const easeBackInOut = (x: number) => {
  const s = 1.70158 * 1.525
  return ((x *= 2) < 1 ? x * x * ((s + 1) * x - s) : (x -= 2) * x * ((s + 1) * x + s) + 2) / 2
}

export const easeElasticIn = (x: number) => {
  return x === 0 || x === 1 ? x : Math.sin((13 * x * Math.PI) / 2) * Math.pow(2, 10 * (x - 1))
}
export const easeElasticOut = (x: number) => {
  return x === 0 || x === 1 ? x : Math.sin((-13 * (x + 1) * Math.PI) / 2) * Math.pow(2, -10 * x) + 1
}
export const easeElasticInOut = (x: number) => {
  return x === 0 || x === 1
    ? x
    : x < 0.5
    ? 0.5 * Math.sin(((+13 * Math.PI) / 2) * 2 * x) * Math.pow(2, 10 * (2 * x - 1))
    : 0.5 * Math.sin(((-13 * Math.PI) / 2) * (2 * x - 1 + 1)) * Math.pow(2, -10 * (2 * x - 1)) + 1
}

export const easeBounceIn = (x: number) => {
  return 1 - easeBounceOut(1 - x)
}
export const easeBounceOut = (x: number) => {
  const n1 = 7.5625
  const d1 = 2.75
  return x < 1 / d1
    ? n1 * x * x
    : x < 2 / d1
    ? n1 * (x -= 1.5 / d1) * x + 0.75
    : x < 2.5 / d1
    ? n1 * (x -= 2.25 / d1) * x + 0.9375
    : n1 * (x -= 2.625 / d1) * x + 0.984375
}
export const easeBounceInOut = (x: number) => {
  return (x < 0.5 ? 1 - easeBounceOut(1 - 2 * x) : 1 + easeBounceOut(2 * x - 1)) / 2
}
