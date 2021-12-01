import { Expect, Equal } from "@type-challenges/utils";
import { MinusOne } from "./minusone";

/**
 * @description `Array.flat`的类型版本,支持指定扁平化数组的层级
 * @tips 1.解题思路,达到只等层数,有两种方式,
 *            - 第一创建一个数组,`length=N`扁平一次,长度`-1`
 *            - 第二创建一个数组,`length=0`扁平一次,长度`+1`
 */
type FlattenDepth<
  T extends any[],
  N = 1,
  R extends "count"[] = []
> = T extends [infer First, ...infer Rest]
  ? First extends any[]
    ? R["length"] extends N
      ? [First, ...FlattenDepth<Rest, N, R>]
      : [
          ...FlattenDepth<First, N, ["count", ...R]>,
          ...FlattenDepth<Rest, N, R>
        ]
    : [First, ...FlattenDepth<Rest, N, R>]
  : T;

type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>; // [1, 2, 3, 4, [5]]. flattern 2 times
type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1

type cases = [
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 1>, [1, 2, 3, 4, [[5]]]>>
];
