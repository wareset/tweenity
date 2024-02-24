export declare const __Array__: ArrayConstructor;
export declare const __Object__: ObjectConstructor;
export declare const object_is: (value1: any, value2: any) => boolean;
export declare const object_keys: {
    (o: object): string[];
    (o: {}): string[];
};
export declare const object_prototype: Object;
export declare const object_getPrototypeOf: (o: any) => any;
export declare const is_array: (arg: any) => arg is any[];
export declare const array_prototype: any[];
export declare const is_native_array: (a: any) => a is any[];
export declare const is_native_object: (a: any) => a is {
    [key: string]: any;
};
