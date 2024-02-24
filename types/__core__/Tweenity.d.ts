export declare const DEFAULTS: {
    ticker: (t: number) => void;
    paused: boolean;
    yoyo: boolean;
    repeat: boolean;
    delay: number;
    duration: number;
    easing: (x: number) => number;
};
export type TweenityValue = (readonly TweenityValue[] | []) | {
    [key: string]: TweenityValue;
} | (null | undefined | boolean | number | bigint | string | symbol | ((...a: any[]) => any));
export type TweenityOptions<T extends TweenityValue> = {
    yoyo?: boolean;
    repeat?: boolean | number;
    delay?: number;
    duration?: number;
    easing?: (n: number) => number;
    onUpdate?: (this: Tweenity<T>, value: T) => any;
};
type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
export declare class Tweenity<T extends TweenityValue> {
    private readonly _;
    readonly now: T;
    paused: boolean;
    constructor(now: T, options?: TweenityOptions<T>);
    resume(): void;
    pause(): void;
    stop(): void;
    set(now: DeepPartial<T>): void;
    to(to: DeepPartial<T>, options?: TweenityOptions<T>): void;
}
export {};
