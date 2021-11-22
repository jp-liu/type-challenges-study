import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 创建一个传入函数的副本类型,但是增加了`K`参数
 * @tips 通过`infer`推导出函数参数和返回值, 然后在函数参数中加入自定义参数返回
 */
type AppendArgument<Fn, A> = Fn extends (...args: [...infer P]) => infer R
  ? (...args: [...P, A]) => R
  : never;

type Fn = (a: number, b: string) => number;

// expected be (a: number, b: string, x: boolean) => number
type Result = AppendArgument<Fn, boolean>;

type cases = [
  Expect<
    Equal<
      AppendArgument<Fn, boolean>,
      (a: number, b: string, x: boolean) => number
    >
  >,
  Expect<
    Equal<
      AppendArgument<
        (x: { a: number; b: number }, y: string) => string,
        boolean
      >,
      (x: { a: number; b: number }, y: string, z: boolean) => string
    >
  >
];
