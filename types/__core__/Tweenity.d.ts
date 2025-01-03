type ITask = {
    p: ITask;
    n: ITask;
    o: number;
    e: (n: number) => number;
    d: number;
    m: number;
    s: Tweenity<any>;
    t: any;
    i: ReturnType<typeof get_interpolator> | null;
};
declare const get_interpolator: (a: any, b: any) => (t: number) => any;
export declare const DEFAULTS: {
    ticker: (t: number) => void;
    paused: boolean;
    delay: number;
    duration: number;
    easing: (x: number) => number;
};
export type TweenityValue = (readonly unknown[] | []) | {
    [key: string]: TweenityValue;
} | (object | null | undefined | boolean | number | bigint | string | symbol | ((...a: any[]) => any));
export type TweenityOptions<T extends TweenityValue> = {
    delay?: number;
    duration?: number;
    easing?: (n: number) => number;
    onUpdate?: (this: Tweenity<T>, newValue: T, coef: number) => any;
};
type TweenityService<T extends TweenityValue = number> = {
    task: ITask | null;
    delay: number;
    duration: number;
    easing: (n: number) => number;
    onUpdate: (this: Tweenity<T>, newValue: T, coef: number) => any;
};
type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
export declare class Tweenity<T extends TweenityValue> {
    readonly _: TweenityService<T>;
    readonly now: T;
    paused: boolean;
    constructor(now: T, options?: TweenityOptions<T>);
    resume(): this;
    pause(): this;
    stop(): this;
    set(now: DeepPartial<T>, coef?: number): this;
    to(to: DeepPartial<T>, options?: TweenityOptions<T>): this;
}
export {};
