import { Expect, Equal } from "@type-challenges/utils";
import { Reverse } from "./reverse";

/**
 * @description 将函数参数类型进行翻转
 * @tips 利用`Reverse`方法,翻转参数即可
 */
type FlipArguments<T> = T extends (...args: infer P) => infer R
  ? (...args: Reverse<P>) => R
  : T;

type Flipped = FlipArguments<
  (arg0: string, arg1: number, arg2: boolean) => void
>;
// (arg0: boolean, arg1: number, arg2: string) => void

type cases = [
  Expect<
    Equal<
      FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>,
      (arg0: boolean, arg1: number, arg2: string) => void
    >
  >
];
