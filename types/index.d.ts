import { _requestAnimationFrame, _cancelAnimationFrame } from './__core__/_raf';
export { _requestAnimationFrame as requestAnimationFrame, _cancelAnimationFrame as cancelAnimationFrame };
import type { TweenityValue, TweenityOptions } from './__core__/Tweenity';
export type { TweenityValue, TweenityOptions };
import { Tweenity, DEFAULTS } from './__core__/Tweenity';
export { Tweenity, DEFAULTS };
export declare const tweenity: <T extends TweenityValue>(n: T, options?: TweenityOptions<T>) => Tweenity<T>;
export * from './__core__/easing';
