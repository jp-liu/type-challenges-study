import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 递归使用将对象类型`key`变更为`readonly`
 * @tip 1.这个类型，主要点在于如何判定对象的value是一个对象
 *      2.通过官方库`Record`创建对象类型基类{ [x: string]: unknown }
 */
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends Record<string, unknown>
    ? DeepReadonly<T[P]>
    : T[P];
};
type X = {
  x: {
    a: 1;
    b: "hi";
  };
  y: "hey";
};

type Expected = {
  readonly x: {
    readonly a: 1;
    readonly b: "hi";
  };
  readonly y: "hey";
};

type res = DeepReadonly<X>; // should be same as `Expected`

type cases = [Expect<Equal<DeepReadonly<X>, Expected>>];
